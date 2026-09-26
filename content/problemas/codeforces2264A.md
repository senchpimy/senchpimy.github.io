---
title: "Rumb Necesita una Mano"
date: "25 Sep 2026"
tags: ["Codeforces", "Implementation", "Sortings", "Two Pointers", "C++", "Algorithms"]
---
## Rumb Necesita una Mano

Este problema consiste en, dada una permutación `p` de longitud `n`, determinar si es posible ordenarla de forma creciente realizando exactamente una operación: elegir un conjunto de índices (no necesariamente consecutivos) y revertir los elementos que se encuentran en esas posiciones.

Por ejemplo, con `p = [1, 6, 3, 4, 5, 2]` se pueden elegir los índices 2, 4 y 6; los elementos en rojo se invierten y la permutación queda ordenada.

### Solución

```cpp
#include "iostream"
#include <vector>
using namespace std;

int main (int argc, char *argv[]) {
  int n;
  cin>> n;
  for (size_t i = 0; i < n ; i++) {
    int k;
    cin>>k;

    vector<int> l(k);

    for (size_t i = 0; i < k; i++) {
      cin>>l[i];
    }
    std::vector<int> v;
    for (size_t i = 0; i < k; i++) {
      if (l[i]!=i+1){
        v.push_back(i+1);
      }
    }

    bool possible = true;
    int len = v.size();
    int err = 1;
    for (size_t i = 0; i < k; i++) {
      if (l[i]!=i+1){
        if (v[len-err]!=l[i]){
          cout<<"NO\n";
          possible = false;
          break;
        }
        err+=1;
      }
    }
    if (possible)
    cout<<"YES\n";

  }

  return 0;
}
```

Para que una sola reversión ordene la permutación, los índices elegidos deben ser exactamente las posiciones donde el valor no coincide con su índice (`p[i] != i`). Además, al revertir, la posición `i_j` recibe el valor que estaba en la posición reflejada `i_{m-j+1}`, por lo que el valor en cada posición desordenada debe ser igual a la posición desordenada simétrica.

La solución primero guarda en `v` todas las posiciones (1-indexadas) donde `l[i] != i + 1`. Después recorre el arreglo y, en cada posición desordenada, compara su valor con la posición correspondiente leída desde el final de `v` (con el contador `err` avanzando). Si todos coinciden, la permutación se puede ordenar con una sola operación y se imprime `YES`; en caso contrario se imprime `NO`.
