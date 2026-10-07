---
title: "Número Feo"
date: "25 Sep 2026"
tags: ["LeetCode", "Mathematics", "C++", "Algorithms"]
---
## Número Feo

Este problema consiste en determinar si un número entero `n` es "feo". Un número feo es un entero positivo cuyos factores primos están limitados a `2`, `3` y `5`.

### Solución

```cpp
class Solution {
public:
    bool isUgly(int n) {
        if (n <= 0)
            return false;

        for (int p : {2, 3, 5}) {
            while (n % p == 0)
                n /= p;
        }

        return n == 1;
    }
};
```

Primero se descartan los valores no positivos, que por definición no son feos. Después, para cada uno de los primos `2`, `3` y `5`, se divide `n` entre ese primo tantas veces como sea posible, eliminando así todos esos factores. Si al final el número quedó reducido a `1`, significa que solo tenía factores `2`, `3` y `5`, por lo que es feo; en caso contrario, le sobra algún otro factor primo.
