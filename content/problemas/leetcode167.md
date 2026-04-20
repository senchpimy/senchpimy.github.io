---
tags: ["LeetCode", "Array", "Two Pointers", "Python", "Algorithms"]
title : "Two Sum II - Input Array Is Sorted"
date: "19 Apr 2026"
---

# Two Sum II - Input Array Is Sorted

Este problema consiste en, dada una lista ordenada,
encontrar dos valores que sumados den el objetivo y regresar 
los índices.

### Solución

```py
class Solution(object):
    def twoSum(self, numbers, target):
        """
        :type numbers: List[int]
        :type target: int
        :rtype: List[int]
        """
        idx = 0
        l = len(numbers)
        jdx = l-1

        while idx < l:
            v1 = numbers[idx]
            v2 = numbers[jdx]
            dif = target - (v1+v2)
            if dif == 0:
                return [idx+1, jdx+1]
            elif dif < 0:
                jdx -=1
            elif dif > 0:
                idx += 1
```

Este problema es de dos punteros: uno al principio
y uno al final. Si a la suma de ambos elementos
le falta, aumentamos el primero, pues sabemos que la suma va a
aumentar; si es mayor, reducimos el segundo porque sabemos que la suma se va a reducir.
