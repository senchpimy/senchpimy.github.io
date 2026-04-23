---
tags: ["LeetCode", "Array", "Python", "Algorithms"]
title : 'Elemento Mayoritario'
date : "2026-04-20"
---

# Elemento Mayoritario

Dado un array de números de tamaño n, encontrar el elemento que aparece
más de *n/2* veces.


 ## Solución

 Existen dos soluciones: la primera consiste en que si
 su cantidad aparece más que la mayoría, entonces es imposible que
 su componente no quede en el centro si se ordenan los números;
 entonces se pueden ordenar y regresar el componente de en medio.

 ```py
 from collections import defaultdict
class Solution(object):
    def majorityElement(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        l = len(nums)
        nums.sort()
        return nums[l//2]
 ```

Existe otra solución, en la que se busca el número mayor llevando
una cuenta de cuántas veces ha aparecido ese elemento en relación
con los otros elementos, sumando cuando aparece cierto elemento
y restando cuando aparece otro elemento diferente al seleccionado;
si el contador llega a 0, entonces se cambia de valor seleccionado.
Como siempre existe un valor que existe más de n/2 veces, entonces
el mayor siempre va a estar seleccionado al final.
