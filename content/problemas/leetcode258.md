---
title: "Sumar Dígitos"
date: "25 Sep 2026"
tags: ["LeetCode", "Mathematics", "C++", "Algorithms"]
---
## Sumar Dígitos

Este problema consiste en, dado un entero `num`, sumar todos sus dígitos repetidamente hasta obtener un solo dígito y regresarlo.

### Solución

```cpp
class Solution {
public:
    int addDigits(int num) {
        while (num >= 10) {
            int sum = 0;
            while (num > 0) {
                sum += num % 10;
                num /= 10;
            }
            num = sum;
        }
        return num;
    }
};
```

Mientras el número tenga más de un dígito se suman todos sus dígitos y el resultado se convierte en el nuevo número, repitiendo el proceso hasta obtener un solo dígito.

Una mejor solución usa la raíz digital, que equivale a `1 + (num - 1) % 9`:

```cpp
class Solution {
public:
    int addDigits(int num) {
        if (num == 0) {
            return 0;
        }

        return 1 + (num - 1) % 9;
    }
};
```

Esta fórmula obtiene el resultado en tiempo constante sin iterar.
