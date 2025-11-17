---
title: "Producto De Un Array"
date: "16 Jun 2023"
---
## Producto de lista excepto mismo

 Este problema consisten hacer un vector el cual cada elemento debe ser el resultado de la 
 multiplicacion de todos los elementos de un vector excepto el del indice el cual va a ocupar

 Primero se me ocurrio hacer la multiplicacion de todos los elementos por cada iteracion y saltar cuando ocurra el indice, después asignar el elemento
 al indice indicado, pero esto es bastante lento pues tendria una complejidad de tiempo cuadrada y se repiten muchisimas operaciones

 Esta solucion hace dos vectores que tienen el resltado de todas las multiplicaciones de cada elemento, en la primera es con cada elemento a la derecha 
 y la segunda es cada elemento a la izquierda

 Y al final se multiplican el elemento de cada indice de la izquierda con la derecha.
 
### Solucion


```py
 class Solution(object):
     def productExceptSelf(self, nums):
     izq=[1]
     total=len(nums)
     der=[1 for _ in range(total)]
     for i in range(1,total):
         izq.append(izq[i-1]*nums[i-1])
         der[total-(i+1)]=(der[total-(i)]*nums[total-(i)])
     res=[]
     for i in range(total):
        res.append(izq[i]*der[i])
     return res
```
 

