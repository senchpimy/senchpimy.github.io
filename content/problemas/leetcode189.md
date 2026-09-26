---
title: "Rotar Array"
date: "11 Aug 2026"
tags: ["LeetCode", "Array", "Mathematics", "Rust", "Algorithms"]
---
## Rotate Array

Este problema consiste en rotar un array hacia la derecha `k` posiciones, modificándolo in-place.

### Solución

Mi primer intento fue un enfoque de reemplazo cíclico: mover cada elemento a su posición final `(i + k) % n` encadenando los saltos, manejando los ciclos con el máximo común divisor:

```rust
pub fn gcd(mut n: i32, mut m: i32) -> i32 {
    if n == 0 {
       return 1;
    }
    while m != 0 {
        if m < n {
            std::mem::swap(&mut m, &mut n);
        }
        m %= n;
    }
    n
}
impl Solution {
    pub fn rotate(nums: &mut Vec<i32>, k: i32) {
          let k = k as usize;
    let len = nums.len();
    let mut aside = nums[0];
    let mut offset = 0;
    for x in 0..len {
        let y = offset + (k * x);
        std::mem::swap(&mut nums[(y + k) % len], &mut aside);
        let cycle_len = len / gcd(k as i32, len as i32) as usize;
        if gcd(k as i32, len as i32) > 1 && x > 0 && (x + 1) % cycle_len == 0 {
            offset += 1;
            aside = nums[offset];
        }
    }
    }
}
```

Funciona, pero es complicado de razonar: hay que calcular el `gcd` para saber cuántos ciclos independientes hay y saltar de ciclo cuando se cierra uno.

La solución más limpia usa la técnica de los tres reversos:

```rust
impl Solution {
    pub fn rotate(nums: &mut Vec<i32>, k: i32) {
        let n = nums.len();
        let k = (k as usize) % n;

        nums.reverse();        // reverse whole array
        nums[..k].reverse();   // reverse first k
        nums[k..].reverse();   // reverse last n-k
    }
}
```

La idea es: primero revertir todo el array, luego revertir los primeros `k` elementos y finalmente revertir el resto. Con esos tres reversos el array queda rotado a la derecha `k` posiciones. Se usa `k % n` para evitar rotaciones redundantes cuando `k` es mayor o igual al tamaño del array.
