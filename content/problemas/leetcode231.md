---
title: "Potencia de Dos"
date: "25 Sep 2026"
tags: ["LeetCode", "Mathematics", "Bit Manipulation", "C++", "Algorithms"]
---
## Potencia de Dos

Este problema consiste en, dado un entero `n`, regresar verdadero si es una potencia de dos y falso en caso contrario. Un entero es potencia de dos si existe un entero `x` tal que `n == 2^x`.

### Solución

Mi primera solución genera las potencias de dos una por una y las compara con `n`:

```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        if (n <= 0)
            return false;
        int j = 1;
        for (int i{0}; i < 31; i++) {
            if (j == n)
                return true;
            j = j << 1;
        }
        return false;
    }
};
```

Se descartan los valores no positivos. Después se parte de `1` y se va desplazando a la izquierda (multiplicando por 2) hasta 31 veces, comparando en cada paso con `n`. Como un entero de 32 bits con signo solo puede representar potencias de dos hasta `2^30`, 31 iteraciones son suficientes.

Una mejor solución usa una propiedad de los bits: una potencia de dos tiene exactamente un bit encendido, por lo que al restarle 1 se invierten su bit y todos los ceros a su derecha; si se aplica un AND entre `n` y `n - 1` el resultado es 0.

```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
};
```

La condición `n > 0` descarta el 0 y los negativos, y `(n & (n - 1)) == 0` verifica que solo haya un bit encendido. Se resuelve en tiempo constante.
