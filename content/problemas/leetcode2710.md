---
title: "Remove Trailing Zeros From a String"
date: 2024-06-10
tags: ["LeetCode", "String", "Python", "Algorithms"]
---

Este problema consiste en remover todos los 0 al final de un string.
Mi solución fue la siguiente:

```py
class Solution:
    def removeTrailingZeros(self, num: str) -> str:
        for i,val in enumerate(num[::-1]):
            if val !="0":
                l = len(num)
                return num[0:l-i]
```

En la que empezamos desde atrás y, hasta que encontremos un número, nos detenemos y regresamos
el string hasta esa posición. Se supone que la mejor solución sería la siguiente:

```py
class Solution:
    def removeTrailingZeros(self, num: str) -> str:
        return num.rstrip('0')
```
