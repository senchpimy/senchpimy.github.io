---
title: "Producto De Un Array"
date: "16 Jun 2023"
tags: ["LeetCode", "Array", "Algorithms"]
---
## Producto de lista excepto mismo

 Este problema consiste en hacer un vector el cual cada elemento debe ser el resultado de la 
 multiplicación de todos los elementos de un vector excepto el del índice el cual va a ocupar

 Primero se me ocurrió hacer la multiplicación de todos los elementos por cada iteración y saltar cuando ocurra el índice, después asignar el elemento
 al índice indicado, pero esto es bastante lento pues tendría una complejidad de tiempo cuadrada y se repiten muchísimas operaciones

 Esta solución hace dos vectores que tienen el resultado de todas las multiplicaciones de cada elemento, en la primera es con cada elemento a la derecha 
 y la segunda es cada elemento a la izquierda

 Y al final se multiplican el elemento de cada índice de la izquierda con la derecha.
 
### Solución


```python
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
 

