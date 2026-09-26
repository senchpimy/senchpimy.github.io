---
title: "Contiene Duplicado II"
date: "25 Sep 2026"
tags: ["LeetCode", "Array", "Hash Table", "C++", "Algorithms"]
---
## Contiene Duplicado II

Este problema consiste en, dado un arreglo de enteros `nums` y un entero `k`, regresar verdadero si existen dos índices distintos `i` y `j` en el arreglo tales que `nums[i] == nums[j]` y `abs(i - j) <= k`.

### Solución

```cpp
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        map<int, int> m;
        for (int i{0}; i < nums.size(); i++) {
            int ele = nums[i];
            if (m.contains(ele)) {
                if (abs(m[ele] - i) <= k)
                    return true;
            }
            m[ele] = i;
        }
        return false;
    }
};
```

Se guarda en un mapa cada valor junto con el último índice donde apareció. Al recorrer el arreglo, si el elemento ya está en el mapa se revisa la distancia entre su índice anterior y el actual; si es menor o igual a `k` se regresa verdadero. En cualquier caso se actualiza el índice del elemento para futuras comparaciones.
