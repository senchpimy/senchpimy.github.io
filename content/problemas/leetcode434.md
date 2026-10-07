---
title: "Número de Segmentos en un String"
date: "25 Sep 2026"
tags: ["LeetCode", "String", "C++", "Algorithms"]
---
## Número de Segmentos en un String

Este problema consiste en, dada una cadena `s`, regresar la cantidad de segmentos que contiene. Un segmento es una secuencia contigua de caracteres que no son espacios.

### Solución

```cpp
class Solution {
public:
    int countSegments(string s) {
        int t{0};
        bool active = false;
        for (char v : s) {
            if (v != ' ') {
                active = true;
                continue;
            } else if (active) {
                t += 1;
                active = false;
            }
        }
        if (active) {
            t++;
        }
        return t;
    }
};
```

Se recorre la cadena con una bandera `active` que indica si se está dentro de un segmento. Al encontrar un carácter que no es espacio se activa la bandera. Cuando se encuentra un espacio después de un segmento activo, se cuenta ese segmento y se desactiva la bandera. Al terminar el recorrido, si la bandera sigue activa significa que hay un último segmento al final de la cadena, que también se cuenta.
