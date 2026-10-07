---
title: "Teemo Atacando"
date: "25 Sep 2026"
tags: ["LeetCode", "Array", "Simulation", "C++", "Algorithms"]
---
## Teemo Atacando

Este problema consiste en calcular el tiempo total que un enemigo permanece envenenado. Se tiene un arreglo `timeSeries`, ordenado de forma no decreciente, con los segundos en que se ataca, y un `duration` que indica cuántos segundos dura el veneno de cada ataque. Si un nuevo ataque llega antes de que termine el veneno anterior, el tiempo se solapa y solo se cuenta una vez.

### Solución

```cpp
class Solution {
public:
    int findPoisonedDuration(vector<int>& timeSeries, int duration) {
        int t{0};
        for (int i{0}; i < timeSeries.size() - 1; i++) {
            int dist = timeSeries[i] + duration;
            if (dist > timeSeries[i+1]) {
                t += timeSeries[i+1] - timeSeries[i];
            } else {
                t += duration;
            }
        }
        return t + duration;
    }
};
```

Se recorre cada ataque junto con el siguiente. Si el veneno del ataque actual (`timeSeries[i] + duration`) llega más allá del siguiente ataque, solo se suma la distancia entre ambos ataques, porque el resto se solapa; en caso contrario, el veneno se consume completo y se suma toda la `duration`. Al final se agrega la duración del último ataque, que siempre cuenta completa por no tener un ataque posterior.
