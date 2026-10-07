---
title: "Convertir Número a Hexadecimal"
date: "25 Sep 2026"
tags: ["LeetCode", "Mathematics", "Bit Manipulation", "C++", "Algorithms"]
---
## Convertir Número a Hexadecimal

Este problema consiste en, dado un entero de 32 bits `num`, regresar su representación en hexadecimal como cadena. Para los números negativos se usa su representación en complemento a dos. La cadena no debe tener ceros a la izquierda y usa letras minúsculas; el cero se representa como `"0"`.

### Solución

```cpp
class Solution {
public:
    string toHex(int num) {
        string s;
        if (num == 0) {
            return "0";
        }
        unsigned int n = num;
        char hex[] = "0123456789abcdef";
        while (n > 0) {
            int val = n & 0b1111;
            char sele = hex[val];
            s += sele;
            n = n >> 4;
        }
        reverse(s.begin(), s.end());
        return s;
    }
};
```

El caso `0` se maneja aparte porque el ciclo no se ejecutaría. Al convertir `num` a `unsigned int` se obtiene automáticamente su representación en complemento a dos si era negativo, lo que permite procesarlo igual que un positivo. Después se toman los 4 bits menos significativos (`n & 0b1111`), se usa ese valor como índice en la cadena de dígitos hexadecimales y se desplaza `n` 4 bits a la derecha. Como los dígitos se generan de menor a mayor peso, al final se invierte la cadena.
