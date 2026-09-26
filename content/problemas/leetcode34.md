---
title: "Buscar Primera y Última Posición"
date: "11 Aug 2026"
tags: ["LeetCode", "Binary Search", "Array", "Rust", "Algorithms"]
---
## Find First and Last Position of Element in Sorted Array

Este problema consiste en que, dado un array ordenado y un valor objetivo, encontrar la primera y última posición donde aparece ese valor. Si no existe, devolver `[-1, -1]`. El requisito es que sea O(log n).

### Solución

Mi primer intento fue búsqueda binaria clásica para encontrar el target, y luego expandir linealmente a izquierda y derecha:

```rust
impl Solution {
    pub fn search_range(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut left =0;
        let len = nums.len();
        let mut right = len;
        let mut start = -1;
        let mut end = -1;
        'res: while left < right{
            let mut mid = (left +right)/2;
            if nums[mid] == target{
                while mid > 0 && nums[mid - 1] == target {
                    mid -= 1;
                }
                start = mid as i32;

                while mid + 1 < len && nums[mid + 1] == target {
                    mid += 1;
                }
                end = mid as i32;
                break 'res;
            }else if nums[mid]>target{
                right = mid;
            }else{
                left = mid +1;
            }
        }
        vec![start,end]
        
    }
}
```

Pero esta solución falla porque el escaneo lineal (`while` para expandir a izquierda y derecha) puede recorrer todo el array si el target se repite muchas veces, degradando el rendimiento a O(n) en el peor caso, y el problema exige estrictamente O(log n).

La solución correcta usa dos búsquedas binarias independientes: una para encontrar la primera aparición (`lower_bound`) y otra para la última (`upper_bound`):

```rust
impl Solution {
    pub fn search_range(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let n = nums.len();

        let mut left = 0;
        let mut right = n;

        while left < right {
            let mid = left + (right - left) / 2;

            if nums[mid] < target {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        let start = left;

        if start == n || nums[start] != target {
            return vec![-1, -1];
        }

        left = start;
        right = n;

        while left < right {
            let mid = left + (right - left) / 2;

            if nums[mid] <= target {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        let end = left - 1;

        vec![start as i32, end as i32]
    }
}
```

La diferencia clave está en cómo se contrae el rango en cada búsqueda:

- **Primera búsqueda (start):** si `nums[mid] < target`, descartamos la izquierda (`left = mid + 1`). Si `nums[mid] >= target`, nos quedamos con la izquierda (`right = mid`). Esto empuja el rango hacia el primer elemento `>= target`, que es justo la primera aparición.

- **Segunda búsqueda (end):** si `nums[mid] <= target`, descartamos la izquierda (`left = mid + 1`). Si `nums[mid] > target`, nos quedamos con la izquierda (`right = mid`). Esto empuja el rango hacia el primer elemento `> target`, por lo que la última aparición queda en `left - 1`.

Ambas búsquedas son O(log n). Además, al usar `left + (right - left) / 2` en lugar de `(left + right) / 2` evitamos overflow de enteros, aunque en Rust con índices `usize` no suele ser problema práctico, es buena costumbre.
