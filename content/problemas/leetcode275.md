---
title: "H-Index II"
date: "11 Aug 2026"
tags: ["LeetCode", "Binary Search", "Array", "Rust", "Algorithms"]
---
## H-Index II

Este problema consiste en encontrar el índice H de un investigador, donde las citas ya vienen ordenadas de forma ascendente. El índice H es el número máximo `h` tal que el investigador tiene al menos `h` publicaciones con al menos `h` citas cada una.

### Solución

```rust
impl Solution {
    pub fn h_index(citations: Vec<i32>) -> i32 {
        let mut right = citations.len() as i32;
        let mut left = 0;
        while left < right{
            let mid = (right+left +1)/2;
            let value = citations[(citations.len()-mid as usize)];
            if value >= mid{
                left = mid;
            }else{
                right = mid-1;
            }
        }
        left
    }
}
```

La solución usa búsqueda binaria sobre la respuesta `h`. La clave es que al estar el array ordenado, basta con verificar la publicación en la posición `len - mid`: si tiene al menos `mid` citas, entonces todas las publicaciones a su derecha también las tienen, por lo que `mid` es válido y buscamos uno mayor (`left = mid`). Si no, reducimos el rango superior (`right = mid - 1`).
