---
title: "Adivinar Número Mayor o Menor"
date: "25 Sep 2026"
tags: ["LeetCode", "Binary Search", "C++", "Algorithms"]
---
## Adivinar Número Mayor o Menor

Este problema consiste en adivinar un número que se eligió entre `1` y `n`. Cada vez que se hace un intento, una API predefinida `int guess(int num)` regresa:

- `-1` si el número elegido es menor que el intento,
- `1` si es mayor,
- `0` si se adivinó.

### Solución

```cpp
class Solution {
public:
    int guessNumber(int n) {
        int max = n;
        int low = 0;
        while (true) {
            int mid = low + ((max - low) / 2);
            int ans = guess(mid);
            if (ans == 0) {
                return mid;
            } else if (ans == 1) {
                low = mid + 1;
            } else {
                max = mid - 1;
            }
        }
    }
};
```

Es una búsqueda binaria clásica: se mantiene el rango `[low, max]` donde puede estar el número y, en cada iteración, se consulta el punto medio. Si la API regresa que el número es mayor, se descarta la mitad inferior; si es menor, la mitad superior; y si es igual, se regresó el número. El punto medio se calcula como `low + (max - low) / 2` para evitar desbordamientos con enteros grandes.
