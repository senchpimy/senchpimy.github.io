---
tags: ["LeetCode", "Array", "Two Pointers", "Python", "Algorithms"]
title : "Maximum Distance Between a Pair of Values"
date: "19 Apr 2026"
---

# Maximum Distance Between a Pair of Values

Este problema consiste en que, dadas dos listas ordenadas, la máxima diferencia entre dos índices,
cada uno de una lista, en los que el valor al que apunta la primera lista sea menor o igual
al que apunta la segunda lista. Esta fue mi solución:

### Solución

```py
class Solution(object):
    def maxDistance(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: int
        """
        ma = 0
        for idx, val in enumerate(nums1):
            for jdx, val2 in enumerate(nums2):
                v1 = nums1[idx]
                v2 = nums2[jdx]
                if v1 <= v2 and idx<=jdx:
                   ma = max(ma,jdx-idx)
        return ma
        
```
Pero la solución era n^2, y se detenía porque sobrepasaba el tiempo; entonces invertí los
índices para detener las iteraciones en las que, por las reglas, no iba a estar el
resultado ahí:

```py
class Solution(object):
    def maxDistance(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: int
        """
        ma = 0
        l1 = len(nums1)
        l2 = len(nums2)
        for jdx in range(l2):
            limite = min(l1, jdx + 1) 
            for idx in range(limite):
                v1 = nums1[idx]
                v2 = nums2[jdx]
                if v1 <= v2 and idx<=jdx:
                   ma = max(ma,jdx-idx)
        return ma

```

Pero también tardaba mucho. Investigando, la solución correcta era un algoritmo
de dos punteros:

```py
class Solution(object):
    def maxDistance(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: int
        """
        i = 0
        j = 0
        ma = 0
        p=len(nums1)
        q=len(nums2)
        
        while i < p and j < q:
            if nums1[i] <= nums2[j]:
                ma = max(ma, j - i)
                j += 1
            else:
                i += 1
                
        return ma
```
En donde empezamos con los primeros valores de la lista y, si los valores no cumplen la condición, aumentamos
el índice del segundo valor, lo que asegurará que el valor sea mayor y la condición se cumpla.
Cuando se cumple, aumentamos el índice de la primera lista, y si cualquiera llega al fin, sabemos que ya
no hay más soluciones posibles.
