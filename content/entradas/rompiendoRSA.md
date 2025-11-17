---
title: "Rompiendo RSA"
date: "04 Jul 2024"
---

## RSA

RSA es un algoritmo de encriptacion que consiste en la factorizacion de dos numeros primos, actualmentes estos numeros son de el orden de los 10^300.

## Rompiendo RSA

Siendo valores publicos e y n, y siendo un valor privado d, n = p*q. El proceso para romper RSA consiste en encontrar algunos de los dos valor p o q.

Para RSA se requiere también calcular la funcion de euler de n que se define como (p-1)*(q-1)

Y por el algoritmo de RSA también sabemos que:

e*d = 1 mod(euler(n))

Entonces con esa ecuacion podemos calcular d.

Entonces si n es publico y para calcular d se requiere euler(n) entonces se podría calcular con fuerza bruta.

Otra forma seria factorizar n, si sabemos que p y q son primos entonces debemos de encontrar todos lor primos menores a n, que cuando n es pequeño es una tarea trivial. O si los valores P y Q son primos que son numeros que están cercanos es facil encontrar la factorizacion,
con el algoritmo de fermat se puede realizar.

El algoritmo de fermat consiste en que N = a^2 - b^2 = (a+b)*(a-b), en donde (a+b) = p y (a-b) = q

Se puede obtener la siguiente equcacion:

b^2=a^2 - N

Esta ecuacion es más facil de hacer por fuerza bruta pues al intentar obtener un valor de a se tiene que hacer de tal forma que el resultado de a^2-N sea un numero que tenga una raiz cuadrada. Ejemplo de implementacion:

```py
n = 3747883... #Valor publico
a = sqrt(n)+1
while True:
    b2 = a**2 - n
    if is_square(b2):
        b = sqrt(b2)
        break
    a +=1
```
