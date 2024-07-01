---
title: "Tres Impares Seguidos"
date: "1 Jul 2024"
---

## Anagrama

Este problema consisten en regresar cierto si dada una lista se encuentras tres impares seguidos

### Solucion

```py
class Solution:
    def threeConsecutiveOdds(self, arr: List[int]) -> bool:
        l = len(arr)
        for i in range(l-2):
            if arr[i]%2!=0 and arr[i+1]%2!=0 and arr[i+2]%2!=0:
                return True
        return False
```
Pero me di cuenta que se podria ser más rapido si se suman en lugar de hacer las comparaciones:

```py
class Solution:
    def threeConsecutiveOdds(self, arr: List[int]) -> bool:
        l = len(arr)
        for i in range(l-2):
            if arr[i]%2 +arr[i+1]%2+ arr[i+2]%2==3:
                return True
        return False
        

```
