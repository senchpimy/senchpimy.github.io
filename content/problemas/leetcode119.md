---
title: "Triángulo de Pascal II"
date: "25 Sep 2026"
tags: ["LeetCode", "Array", "Dynamic Programming", "C++", "Algorithms"]
---
## Triángulo de Pascal II

Este problema consiste en, dado un entero `rowIndex`, regresar la fila `rowIndex` (indexada desde 0) del triángulo de Pascal. Cada número del triángulo es la suma de los dos números que están directamente encima de él.

### Solución

```cpp
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        if (rowIndex == 0) {
            vector<int> v{1};
            return v;
        }

        if (rowIndex == 1) {
            vector<int> v{1, 1};
            return v;
        }

        vector<int> prev{1, 1};
        vector<int> curr(rowIndex + 1);
        for (int i{2}; i <= rowIndex; i++) {
            curr[0] = 1;
            curr[i] = 1;
            for (int j{1}; j < i; j++) {
                curr[j] = prev[j - 1] + prev[j];
            }
            prev = curr;
        }
        return curr;
    }
};
```

La solución maneja los dos primeros casos directamente (`[1]` y `[1,1]`). Después construye cada fila a partir de la anterior: los extremos siempre son 1 y cada posición intermedia es la suma de las dos posiciones correspondientes de la fila previa. Al terminar la iteración se regresa la última fila calculada.
