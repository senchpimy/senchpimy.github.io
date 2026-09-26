---
title: "Arranging Coins"
date: "04 Jul 2026"
tags: ["LeetCode", "Mathematics","Rust", "Algorithms"]
katex: true
---
## Arranging Coins

Este problema consiste en dado un numero de monedas, encontrar cuantos escalones donde el escalo *i* tiene *i* monedas
se pueden armar con la cantidad de monedas dadas

### Solución

```rust
impl Solution {
    pub fn arrange_coins(n: i32) -> i32 {
        let mut tot = 0;
        let mut i = 1;
        loop {
            tot += i;
            if tot >n{
                break
            }
            i+=1
        }
        i-1
    }
}
```

Esta solucion es correcta, pero dura mucho tiempo y sobrepasa el limite de leetcode, otra solucion es la siguiente:

```rust
impl Solution {
    pub fn arrange_coins(n: i32) -> i32 {
        let n = n as i64;
        let (mut left, mut right) = (0, n);

        while left <= right {
            let mid = left + (right - left) / 2;
            let coins = mid * (mid + 1) / 2;

            if coins <= n {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        right as i32
    }
}
```

Esta solucion se aprovecha de que el limite de el valor mayor posible que podria ser una solucion es igual a n,
luego podemos hacer una busqueda binaria, evaluando si es posible armar una solucion con una cantidad de numeros,
si lo es aumentamos el valor y si no lo reducimos, resolviendolo en log(n) tiempo. Pero existe una solucion
O(1), y es la siguiente

```rust
impl Solution {
    pub fn arrange_coins(n: i32) -> i32 {
    (((8.0 * n as f64 + 1.0).sqrt() - 1.0) / 2.0).floor() as i32
    }
}
```

En donde sabiendo que:

$$
\frac{k(k+1)}{2} = n
$$

Donde *n* es el numero de monedas dadas

$$
k^2 + k - 2n = 0
$$

$$
k = \frac{-1 \pm \sqrt{1 + 8n}}{2}
$$

Como *k* representa el número de filas, tomamos la raíz positiva:

$$
k = \frac{-1 + \sqrt{1 + 8n}}{2}
$$

Finalmente, como necesitamos el mayor entero que no exceda la solución:

$$
\left\lfloor \frac{-1 + \sqrt{1 + 8n}}{2} \right\rfloor
$$
