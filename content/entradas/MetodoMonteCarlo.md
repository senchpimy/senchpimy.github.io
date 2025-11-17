---
title: "Metodo Montecarlo"
date: "18 Jul 2024"
katex: true
---

## Metodo Montecarlo

Es un algoritmo no determinista (con una misma entrada puede tener salidas diferentes) usado para aproximar expresiones matematicas complejas.

Este metodo puede ser aplicado a cualquier problema estocastico (depende de procesos aleatorios) o determinista (sistema en el que el azar no está involucrado en el desarrollo de los futuros estados del sistema). A diferencia de los métodos numericos que se basan en
evaluaciones en N puntos en un espacio de M dimenciones para producir una solucion aproximada, el metodo de montecarlo tiene un error absoluto que decrece como:
$$ \frac{1}{\sqrt{N}}$$

Segun el **teorema de limite central**

### Teorema de limite central

Indica que si S es la suma de n variables aleatorias (*una función que asigna un valor al resultado de un experimento aleatorio*), entonces la función de distribucion (*Una función que asigna un valor que representa que tan probable es que suceda*) se aproxima a una
distribucion normal

### Ejemplo Python
Este programa calcula pi con el metodo de montecarlo, suponiendo que el circulo tiene un radio de 1, se generan puntos aleatorios
y luego se calcula la distancia con el centro, si es menor o igual a uno entonces el punto está dentro de el circulo,
como el area de el circulo en el primer cuadrante de un plano cartesiano es igual a $$\frac{\pi}{4}$$ entonces para obtener pi 
se caulculan cuantos puntos aleatorios están dentro de las dimenciones de el circulo y se divide por la cantidad de puntos que se lanzaron, después se multiplica por cuatro y se obtiene un aproximado de pi

```py
import random
import math as m

n = 0
tot = 90000000
for i in range(tot):
    x  = random.random() 
    y  = random.random() 
    dis = m.sqrt(x**2 + y**2)
    if dis<=1:
        n+=1

pi4 = n/tot
print(pi4*4)
```
