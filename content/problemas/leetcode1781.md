---
title: "Suma de la Belleza de los Substrings"
date: "17 Apr 2026"
tags: ["LeetCode", "String", "Hash Table", "Python"]
katex: true
---

## Suma de la Belleza de los Substrings

Este problema consiste en sumar la *belleza* de todos los substrings;
la *belleza* es el resultado de la diferencia entre el carácter más frecuente
y el menos frecuente.

## Solución

Mi primera solución fue la siguiente:

```py
from collections import defaultdict
class Solution:
    def beautySum(self, s: str) -> int:
        l = len(s)
        n = 0
        for i in range(3,l+1):
            for j in range(l-i+1):
                sub = s[0+j:j+i]
                d = defaultdict(lambda: 0)
                for c in sub:
                    d[c]+=1
                # encontrar al más frecuente y al menos frecuente
                # y encontrar la diferencia
                max_v = max(d.values())
                min_v = min(d.values()) 
                dif = max_v-min_v
                n += dif
        return n
```

Este código busca todos los substrings mayores de 3, ya que menor o igual a 2
darían un valor de 0. Cuando ya tiene los substrings, los guarda en un diccionario
contando cuántas veces aparece cada uno y al final obtiene el mayor y el menor elemento.

Esta solución es correcta pero muy lenta, ya que vuelve a reconstruir el substring y el 
diccionario en cada iteración, cuando se puede reutilizar esta información en la siguiente
iteración. Esta solución tiene una complejidad de:

$$
O(n^3)
$$

La siguiente iteración aprovecha esta información y tiene una complejidad de:


$$
O(n^2)
$$

```py
from collections import defaultdict

class Solution:
    def beautySum(self, s: str) -> int:
        n = len(s)
        res = 0
        
        for i in range(n):
            freq = defaultdict(int)
            
            for j in range(i, n):
                freq[s[j]] += 1
                
                max_v = max(freq.values())
                min_v = min(freq.values())
                
                res += max_v - min_v
        
        return res
```

La primera iteración tardó ~16 segundos y la segunda ~1.2 segundos.
