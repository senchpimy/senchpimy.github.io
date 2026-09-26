---
title: "Número de Columna de Excel"
date: "25 Sep 2026"
tags: ["LeetCode", "Mathematics", "C++", "Algorithms"]
---
## Número de Columna de Excel

Este problema consiste en, dada una cadena `columnTitle` que representa el título de una columna de una hoja de cálculo, regresar su número de columna correspondiente.

Por ejemplo:

```
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28
...
```

### Solución

```cpp
class Solution {
public:
    int titleToNumber(string columnTitle) {
        int res = 0;
        for (int i = 0; i < columnTitle.length(); i++) {
            res = res * 26;
            char c = columnTitle[i];
            int num = (int) c;
            res = res + (num - 64);
        }
        return res;
    }
};
```

La solución recorre cada carácter de la cadena y acumula el resultado como si fuera una conversión a base 26. En cada paso multiplica el resultado anterior por 26 y le suma el valor de la letra actual, que se obtiene al restarle 64 a su código ASCII (la letra `A` es 65, por lo que aporta 1).
