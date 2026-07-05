---
title: "Missing Number"
date: "04 Jul 2026"
tags: ["LeetCode", "Math","Rust", "Algorithms"]
katex: true
---
## Missing Number

Este problema consiste en dado un array de numeros de longitud n, que contiene elmentos entre el rango (0,n), encontrar que numero
falta

### Solucion


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
Esta solucion suma todos los numeros del arreglo, y conociendo la formula para sumar todos los elementos uno por uno hasta n
es la siguiente:

$$
\sum_{i=0}^{N} i = \frac{N(N+1)}{2}
$$

Entonces podemos restarle la suma obtenida a la suma conseguida y obtendriamos el resultado

En este ejemplo encontre que el loop

```rust
let mut sum = 0;
for i in nums{
  sum+=i;
}
```

es más rapido que la linea 

```
let mut sum = nums.iter().sum::<i32>();
```

que pense que seria igual o más rapida, supongo que en leetcode no se ejecuta con la opcion *--release*, considero que 
es más lento pues cuando se ejecuta **.iter**, se itera sobre las referencias a los elementos, y se tiene el paso extra
de derefenciar la variable
