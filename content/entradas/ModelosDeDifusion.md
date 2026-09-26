---
title: "Explicando Modelos de Difusion"
date: "10 Jul 2024"
katex: true
tags: ["Machine Learning", "Neural Networks", "Generative AI", "Diffusion Models"]
---
## Introducción

En esta entrada voy a explicar el la investigación **Interpreting and Improving Diffusion Models from an Optimization Perspective** así como el articulo **Diffusion models from scratch, from a new theoretical perspective** en el cual da un ejemplo de aplicación de estos modelos de difusion

## Conceptos

**Variedad (Manifold):** Es un concepto matematico que describe un espacio que localmente se parece a un espacio euclidiano 
de una cierta dimension aunque globalmente puede tener una estructura más complicada. En otras palabras, aunque un manifold puede ser 
complejo y curvado en su totalidad, cualquier pequeña porción de él se parece a un espacio plano y ordinario.

**Hipotesis de la Variedad (manifold hypothesis):** Consiste en que los datos de altas dimensiones a menudo se encuentran en un **manifold**, 
esto significa que aunque los datos estén en muchas dimensiones estos pueden describirse en un manifold de dimensiones menores, es decir una 
imagen de 28x28 píxeles tienen 784 dimensiones, sin embargo las variaciones que describen la imagen de un digito por ejemplo pueden estar en dimensiones mucho menores

> Qué quiere decir, en plata, la hipótesis de la variedad? Imaginemos todas las posibles fotos de gatitos de tamaño 1000x1000. Las fotos viven en un espacio de alta dimensión: R3e6
, i.e., el producto cartesiano de tres millones de rectas reales (tres canales de color para un millón de píxeles).
La hipótesis de la variedad postula que existe un espacio R^N, donde N es mucho menor que 3e6 (y posiblemente, algo así como 50) y una función f de R^N en R3e6 tal que los f(x) y solo los f(x) son fotos de gatitos.



## Modelo de Difussion

Los modelos de difusion son presentados como el reverso de un proceso estocastico que corrompe (agraga ruido aleatorio) a datos. El reverso de este proceso anterior también se puede interpretar como la maximizacion de datos alterados con ruido usando gradientes aprendidos.



La introduccion del paper comienza diciendo como denoising (eliminacion del ruido) es similar a proyectar, pues ambos procesos intentan ajustar los datos a una forma más pura o representativa. Luego dice que si añadimos ruido a uno datos de alta dimension sería igual que
si le hicieramos una perturbacion ortogonal a un espacio manifold, ya que el ruido añade componentes en todas las direcciones, no solo dentro del manifold. Por lo que si eliminamos el ruido que se ha añadido de manera ortogonal sería como si proyectaramos los datos de vuelta al manifold original.
Así que aprender a eliminar el ruido sería similar a aprender a proyectar los datos. En el paper se estudia como un modelo deliminacion de ruido funciona como un algortimo que minimiza la distancia euclidanea entre los datos con ruido y los datos originales.

Los pasos para hacer un modelo de diffusion son los siguientes:

### Paso 1
Obtenemos Donde $$K$$ son los ejemplos de entreno, entonces tendríamos que: $$x_0 \sim K$$ El nivel de ruido se define como $$\sigma \sim [\sigma_{min}, \sigma_{max}]$$  Y el ruido es $$ \epsilon \sim N(0,1) $$

### Paso 2
Genereamos datos con ruido como:  $$ x_0 = x_0 + \sigma\epsilon$$

### Paso 3
Predecimos epsilon (dirección del ruido) con base en x0 minimizando el error cuadratico

Siendo la función de perdidad definida de la siguiente manera

$$\mathcal{L}(\theta) = \mathbb{E} \| \epsilon_{\theta}(x_0 + \sigma_t \epsilon, \sigma_t) - \epsilon \|^2$$

Y en código quedaría como :

```py
def generate_train_sample(x0: torch.FloatTensor, schedule: Schedule):
    sigma = schedule.sample_batch(x0)
    eps = torch.randn_like(x0)
    return sigma, eps

def training_loop(loader  : DataLoader,
                  model   : nn.Module,
                  schedule: Schedule,
                  epochs  : int = 10000):
    optimizer = torch.optim.Adam(model.parameters())
    for _ in range(epochs):
        for x0 in loader:
            optimizer.zero_grad()
            sigma, eps = generate_train_sample(x0, schedule)
            eps_hat = model(x0 + sigma * eps, sigma)
            loss = nn.MSELoss()(eps_hat, eps)
            optimizer.backward(loss)
            optimizer.step()
```

#### Programa de Ruido

El articulo procede a explicar como $$\sigma$$ en la practica no se obtiene de un intervalo $$[\sigma_{min}, \sigma_{max}]$$, si no se obtiene de $$N$$ diferentes valores llamados *programa de $$\sigma$$* el cuál esta definido como $$\{\sigma_t\}_{t=1}^N$$ y $$\sigma$$ es obtenido de la lista de $$N$$
posibles valores de $$\sigma_t$$. Para lograr esto se define la clase programa

```py
class Schedule:
    def __init__(self, sigmas: torch.FloatTensor):
        self.sigmas = sigmas
    def __getitem__(self, i) -> torch.FloatTensor:
        return self.sigmas[i]
    def __len__(self) -> int:
        return len(self.sigmas)
    def sample_batch(self, x0:torch.FloatTensor) -> torch.FloatTensor:
        return self[torch.randint(len(self), (x0.shape[0],))].to(x0)
```

### Ejemplo




## Fuentes
[Diffusion]( https://www.chenyang.co/diffusion.html )


> @article{permenter2023interpreting,
  title={Interpreting and improving diffusion models using the euclidean distance function},
  author={Permenter, Frank and Yuan, Chenyang},
  journal={arXiv preprint arXiv:2306.04848},
  year={2023}
}
