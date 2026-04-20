---
tags: ["LeetCode", "Array", "Greedy", "Python", "Algorithms"]
title : "Assign Cookies"
date: "19 Apr 2026"
---

# Assign Cookies

Este problema consiste en que, dadas dos listas desordenadas,
encontrar el número de veces en las que se puede satisfacer
que el valor de un elemento de la primera tenga otro elemento
igual o mayor en la segunda.

### Solución

```py
class Solution(object):
    def findContentChildren(self, g, s):
        """
        :type g: List[int]
        :type s: List[int]
        :rtype: int
        """
        total = 0
        g.sort()
        s.sort()
        lg = len(g)
        ls = len(s)
        idx_g = 0
        idx_s = 0
        while idx_g < lg and idx_s < ls:
            if g[idx_g]<=s[idx_s]:
                total += 1
                idx_g +=1
                idx_s += 1
            else:
                idx_s += 1
        return total
```

En esta solución ordenamos las listas para evitar
recorrer la lista por cada elemento o guardar los índices en la memoria.
Luego avanzamos por cada elemento con requerimiento en la primera lista;
si se cumple, avanzamos todos los índices, ya que ese requerimiento ya está cumplido
y ese elemento ya no se puede volver a usar, y aumentamos la variable de
elementos encontrados.
