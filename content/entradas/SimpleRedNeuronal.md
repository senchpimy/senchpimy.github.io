---
title: "Entrenando una Red Neuronal"
date: "11 Jul 2024"
katex: true
---

## Introducción

Esta entrada habla sobre el algoritmo **NEAT** que no solo hace que la red aprenda los pesos si no tambien su arquitectura

##  NeuroEvolution of Augmenting Topologies (NEAT)
En una red NEAT se usa *dags* (directed acyclic graphs) para representar las redes neuronales, un dags en un grafo en el cual no hay ciclos, este tipos de redes no estan totalmente conectadas, por lo que se usa ordenamiento topologico para determinar el orden en el que se llevaran a cabo las
operaciones, pues se ordenan los nodos de acuerdo a su antecesor de tal manera que el descendiente siempre valla despues de el precedente

![Ordenamiento Topologico](/ejemplo_ordenamiento_topologico.png)
![Grafo Ordenado](/grafo-ordenado.png)

La justificacion para este acercamiento surge de el analisis de como la estructura de una red neuronal afecta el comportamiento de esta y aunque una red neural totalmente conectada puede aproximar cualquier funcion, la topologia afecta en la rapidez y prescicion de esta

Luego las operaciones son las normales, siguiendo el orden definido a cada nodo de entrada se le asigna un valor segun el valor de entrada, se le suma un sesgo y luego se le es aplicado una funcion de activacion, luego a cada valor de cada nodo es multiplicado por el peso de su 
connecion con el siguiente nodo correspondiente y este valor es sumado a el valor de entrada de el siguiente nodo

## Entrenamiento

El objetivo de este entrenamiento es dad una poblacion de N elementos crear una poblaciónn de N+1 candidatos que funcionen mejor que la poblacion anterior, consiste en tres etapas:

### Evaluación
A cada agente/candidato hace la tarea que le hes asignada y se le asigna una evaluacion segun una funcion de *fitness* la cual evalua al agente en dicha tarea

### Selección

Se selecciona a x% de agentes de la población que hallan tenido la mejor puntuacion y se agregan a la siguiente poblacion sin ningun cambio

### Mutación
El siguiente porcentaje de la poblacion es escojido con una probabilidad segun su evaluacion, **ademas de sufrir alguna mutacion, ya sea una nueva conneccion, un nuevo nodo o una modficacion a los pesos**

## Evaluacion

En este ejemplo se tomo como funcion de aptitud (fitness) cuanto tiempo en segundos podian mantener en equilibrio un pendulo sobre una linea y cada agente tiene 100 segundos para intentar tener la mayor puntuacion, los valores de salida es la 
velocidad de el carro y los valores de entrada son la poscicion, la direccion en x, la direccion en y la velocidad angular

### Cambios a la funcion de aptitud

En la experimentacion se encontro que aunque se cumplia con el proposito de mantener el pendulo en equilibrio este oscilaba mucho, por lo que se penso en cambiar la funcion de aptitud a ahora tomar en cuenta la velocidad angular de el pendulo. En este caso se encontro que
se logro estabilizar el movimiento de el carro

## Fuentes
[How to train simple AIs]( https://www.youtube.com/watch?v=EvV5Qtp_fYg)
[How to train simple AIs to balance a double pendulum]( https://www.youtube.com/watch?v=9gQQAO4I1Ck)

>@article{stanley:ec02,
title={Evolving Neural Networks Through Augmenting Topologies},
author={Kenneth O. Stanley and Risto Miikkulainen},
volume={10},
journal={Evolutionary Computation},
number={2},
pages={99-127},
url="http://nn.cs.utexas.edu/?stanley:ec02",
year={2002}
}
