---
title: "Contar Bits"
date: "25 Sep 2026"
tags: ["LeetCode", "Dynamic Programming", "Bit Manipulation", "C++", "Algorithms"]
---
## Contar Bits

Este problema consiste en, dado un entero `n`, regresar un arreglo `ans` de longitud `n + 1` tal que, para cada `i` (0 <= i <= n), `ans[i]` sea la cantidad de 1's en la representación binaria de `i`. No se deben usar funciones integradas como `__builtin_popcount`.

### Solución

Mi primera solución contaba los bits uno por uno:

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> v(n + 1);
        for (int i{0}; i < n + 1; i++) {
            v[i] = 0;
            int t = i;
            for (int j{0}; j < 32; j++) {
                v[i] += t & 1;
                t = t >> 1;
            }
        }
        return v;
    }
};
```

Recorre cada número del 0 al `n` y, para cada uno, revisa sus 32 bits contando los que estén encendidos. Funciona, pero siempre recorre 32 bits por número.

Una mejor solución aprovecha los resultados ya calculados: la cantidad de bits de un número es la de su mitad (`i / 2`) más el bit menos significativo (`i % 2`):

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> ans(n + 1);
        ans[0] = 0;
        for (int i = 1; i <= n; i++) {
            ans[i] = ans[i / 2] + i % 2;
        }
        return ans;
    }
};
```

Así se resuelve en O(n) reutilizando los valores ya calculados.
