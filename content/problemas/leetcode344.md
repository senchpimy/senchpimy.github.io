---
title: "Invertir String"
date: "25 Sep 2026"
tags: ["LeetCode", "Two Pointers", "String", "C++", "Algorithms"]
---
## Invertir String

Este problema consiste en invertir una cadena que se recibe como un arreglo de caracteres `s`. Se debe modificar el arreglo **in-place** y usando `O(1)` de memoria extra.

### Solución

```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        for (int i{0}; i < s.size() / 2; i++) {
            char t = s[i];
            char v = s[s.size() - 1 - i];
            s[i] = v;
            s[s.size() - 1 - i] = t;
        }
    }
};
```

Se recorre solo la primera mitad del arreglo y, en cada posición `i`, se intercambia `s[i]` con su simétrica `s[size - 1 - i]`. Al llegar a la mitad ya se intercambiaron todos los pares, por lo que la cadena queda invertida sin usar memoria adicional.
