---
title: "Invertir Vocales de un String"
date: "25 Sep 2026"
tags: ["LeetCode", "Two Pointers", "String", "C++", "Algorithms"]
---
## Invertir Vocales de un String

Este problema consiste en, dada una cadena `s`, invertir únicamente todas las vocales que contiene y regresar el resultado. Las vocales son `a`, `e`, `i`, `o`, `u`, tanto en minúscula como en mayúscula.

### Solución

```cpp
class Solution {
public:
    bool esVocal(char c) {
        return c == 'a' || c == 'e' || c == 'i' ||
               c == 'o' || c == 'u' ||
               c == 'A' || c == 'E' || c == 'I' ||
               c == 'O' || c == 'U';
    }

    string reverseVowels(string s) {
        int der = s.size() - 1;
        int izq = 0;
        while (der > izq) {
            while (izq < der && !esVocal(s[izq]))
                izq++;
            while (der > izq && !esVocal(s[der]))
                der--;
            swap(s[izq], s[der]);
            der--;
            izq++;
        }
        return s;
    }
};
```

Se usan dos punteros, uno al inicio (`izq`) y otro al final (`der`). El puntero izquierdo avanza mientras el carácter no sea vocal, y el derecho retrocede con la misma condición. Cuando ambos apuntan a una vocal, se intercambian y se mueven un paso hacia el centro. El proceso termina cuando los punteros se cruzan, dejando las vocales en orden invertido y las consonantes intactas.
