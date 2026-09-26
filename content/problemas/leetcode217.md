---
title: "Duplicado"
date: "08 Jun 2023"
tags: ["LeetCode", "Array", "Python", "Algorithms"]
---
## Contains Duplicate


 Este problema consiste en regresar cierto si hay dos valores iguales un arreglo
 
### Solución


```python

class Solution(object):
 def containsDuplicate(self, nums):
 """
 :type nums: List[int]
 :rtype: bool
 """
 nums.sort()
 for i in range(len(nums)-1):
 if nums[i]==nums[i+1]:return True
 return False
```
 

 Este programa consiste en primero ordenar la lista, luego verificar si alguno de los elementos en la lista es igual al que le sigue.

 Este programa venció al 93% de las otras posibles respuestas en cuanto al consumo de memoria, pues no estamos en ningún momento estamos alojando memoria para alguna variable, pues solamente estamos consultando los valores ya alojados, pero quedó atrás ante el 95% de las respuestas en cuanto al tiempo de ejecución, pues se tiene que ordenar todo el array primero. Para intentar remediar esto busqué qué tipo de algoritmo usaba python por defecto y vi que era el **Tim Sort**, así que intenté hacer la prueba otra vez pero usando el algoritmo QuickSort, que ahí mismo implementé pues este es más rápido pero pasó lo contrario, siempre que lo entregaba me marcaba que tardó demasiado tiempo en las últimas pruebas que consistían en arrays muy largos, creo que en este caso el algoritmo que usa python fue escrito en C y por eso es que en este caso ese fue más rápido
 

