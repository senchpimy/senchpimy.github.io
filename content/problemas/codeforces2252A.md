---
title: "Pelea contra el Jefe"
date: "25 Sep 2026"
tags: ["Codeforces", "Data Structures", "Greedy", "C++", "Algorithms"]
---
## Pelea contra el Jefe

Este problema consiste en derrotar a un jefe con una secuencia de `n` cartas, donde la `i`-ésima carta hace `a_i` de daño y podemos jugarlas en el orden que queramos.

El jefe tiene un escudo adaptativo: si en algún momento jugamos dos cartas seguidas que hacen exactamente el mismo daño, el escudo se activa de forma permanente. La carta que activa el escudo todavía hace su daño normal, pero todas las cartas posteriores hacen 0 de daño. Se debe encontrar la mayor cantidad de vida que puede tener el jefe de modo que aun así lo derrotemos jugando las cartas de forma óptima, es decir, la suma de daño máxima que podemos lograr.

### Solución

```cpp
#include <iostream>
#include <map>
#include <vector>

using namespace std;

void solve() {
  int n;
  cin >> n;
  vector<int> a(n);
  map<int, int> freq;
  int suma_total = 0;

  for (int i = 0; i < n; i++) {
    cin >> a[i];
    suma_total += a[i];
    freq[a[i]]++;
  }

  int X = 0;
  int max_frecuencia = 0;
  for (auto const &[val, count] : freq) {
    if (count > max_frecuencia) {
      max_frecuencia = count;
      X = val;
    }
  }

  int F = max_frecuencia;
  int S = n - F;

  if (F > S + 2) {
    int cartas_desperdiciadas = F - (S + 2);
    cout << suma_total - (cartas_desperdiciadas * X) << '\n';
  } else {
    cout << suma_total << '\n';
  }
}

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);

  int t;
  cin >> t;
  while (t--) {
    solve();
  }
  return 0;
}
```

Se cuentan las frecuencias de cada carta y la suma total. Sea `F` la frecuencia máxima, `X` el valor de la carta más repetida y `S = n - F` el resto de las cartas. El valor repetido puede contarse hasta `S + 2` veces: las demás cartas lo separan y una más activa el escudo pero todavía cuenta. Si `F <= S + 2` se pueden contar todas las cartas y el daño es la suma total; si no, se descartan `F - (S + 2)` cartas de valor `X`, que son las que dejarían de hacer daño.
