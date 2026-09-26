---
title: "Sandía"
date: "25 Sep 2026"
tags: ["Codeforces", "Math", "Brute Force", "C++", "Algorithms"]
---
## Sandía

Este problema consiste en, dado el peso `w` de una sandía, determinar si se puede partir en dos partes de modo que cada una pese un número par de kilos. Ambas partes deben pesar más de cero.

### Solución

```cpp
#include <iostream>
using namespace std;
int main (int argc, char *argv[]) {
  int w;
  cin >> w;
    if (w > 2 && w % 2 == 0)
        cout << "YES";
    else
        cout << "NO";
  return 0;
}
```

Para partir el peso en dos números pares, `w` debe ser par. Además, cada parte debe ser positiva, por lo que el peso debe ser mayor que 2. Así, la respuesta es `YES` solo cuando `w > 2` y `w` es par; en cualquier otro caso es `NO`.
