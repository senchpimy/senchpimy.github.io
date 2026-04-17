---
title: "Pascal's Triangle"
date: "17 Apr 2026"
tags: ["LeetCode", "Array", "Dynamic Programming", "Python"]
---

## Triángulo de Pascal

Este problema consiste en regresar una lista de elementos
que contenga una pirámide de Pascal, es decir, que siga la siguiente sucesión:

```
[1]
[1,1]
[1,2,1]
[1,3,3,1]
```

Esta fue mi solución: tomar la base y empezar a construirla desde su definición,
es decir, la suma de los dos anteriores y se agrega un 1 al final.

```py
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        base = [1,1]
        res = [[1]]
        for i in range(numRows-1):
            res.append(base)
            new = []
            prev = 0
            for i in base:
                new.append(prev+i)
                prev = i
            #res.append(new)
            base = new
            new.append(1)
            print(base)
        return res
        
```
