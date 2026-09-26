---
title: "Missing Number"
date: "04 Jul 2026"
tags: ["LeetCode", "Mathematics","Rust", "Algorithms"]
katex: true
---
## Missing Number

Este problema consiste en dado un array de números de longitud n, que contiene elementos entre el rango (0,n), encontrar qué número
falta

### Solución


```rust
impl Solution {
    pub fn missing_number(nums: Vec<i32>) -> i32 {
        let mut sum = 0;
        let len = nums.len() as f32;
        for i in nums{
            sum+=i;
        }

        let total = ((len +1.0)/2.0) * len ;
        return (total as i32)-sum;
    }
}
```
Esta solución suma todos los números del arreglo, y conociendo la fórmula para sumar todos los elementos uno por uno hasta n
es la siguiente:

$$
\sum_{i=0}^{N} i = \frac{N(N+1)}{2}
$$

Entonces podemos restarle la suma obtenida a la suma conseguida y obtendríamos el resultado

En este ejemplo encontré que el loop

```rust
let mut sum = 0;
for i in nums{
  sum+=i;
}
```

es más rápido que la línea 

```
let mut sum = nums.iter().sum::<i32>();
```

que pensé que sería igual o más rápida, supongo que en leetcode no se ejecuta con la opción *--release*, considero que 
es más lento pues cuando se ejecuta **.iter**, se itera sobre las referencias a los elementos, y se tiene el paso extra
de dereferenciar la variable
