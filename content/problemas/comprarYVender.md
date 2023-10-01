---
title: "Comprar Y Vender"
date: "19 Jun 2023"
---

## Mejor Momento para comprar y vender



 Este problema consiste en regresar el encontrar la diferencia maxima entre un minimo y un maximo despues del nminimo.

 Yo primero lo intente por fureza bruta, intentando cada posibilidad hasta obtener el mayor haciendo de mi solucion O(N^2), haciendolo bastante lento
 
### Solucion


```py

 def solucion(self, nums):
     max=0
     for i in range(len(nums)):
       for j in nums[i:]:
         if j-nums[i]>max:
             max=j-nums[i]
    return max
 

```
