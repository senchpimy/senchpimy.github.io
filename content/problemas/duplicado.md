---
title: "duplicado"
date: "08 Jun 2023"
---

## Contains Duplicate


 Este problema consisten en regresar cierto si hay dos valores iguales un arreglo
 
### Solucion


```py

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

 Este programa vencio al 93% de las otras posibles respuestas en cuanto al consumo de memoria, pues no estamos en ninguno momento estamos alojando memoria para alguna variable, pues solamente estamos consultando los valores ya alojados, pero quedo atras ante el 95% de las respuestas en cuanto al tiempo de ejecucion, pues se tiene que ordenar todo el array primero. Pra intentar remediar esto busque que tipo de algoritmo usaba python por defecto y vi que era el **Tim Sort**, asi que intente hacer la prueba otra vez pero usando el algoritmo QuickSort, que ahi mismo implemente pues este es más rápido pero paso lo contrario, siempre que lo entregaba me marcaba que tardo demasiado tiempo en las ultimas pruebas que consistian en arrays muy largos, creo que en este caso el algoritmo que usa python fue escrito en C y por eso es que en est caso ese fue más rápido
 

