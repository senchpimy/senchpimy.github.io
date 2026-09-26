---
title: "Invertir Bits"
date: "25 Sep 2026"
tags: ["LeetCode", "Bit Manipulation", "C++", "Algorithms"]
---
## Invertir Bits

Este problema consiste en invertir los bits de un entero de 32 bits con signo.

### Solución

```cpp
class Solution {
public:
    int reverseBits(int n) {
        int res{0};
        for (int i{0}; i < 32; i++) {
            int par = n % 2;
            n /= 2;
            res = res << 1;
            res += par;
        }
        return res;
    }
};
```

Se recorren exactamente 32 bits. En cada paso se toma el bit menos significativo de `n` (su paridad), se desplaza `n` a la derecha para descartarlo y se desplaza el resultado a la izquierda para hacer espacio, agregando el bit al final. Al terminar las 32 iteraciones el resultado tiene el orden invertido.
