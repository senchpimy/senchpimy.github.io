---
title: "Number of 1 Bits"
date: "06 Jul 2026"
tags: ["LeetCode", "Math","Rust", "Algorithms"]
katex: true
---
## Number of 1 Bits

Este problema consiste en dado un numero encontrar cuantos '1' existen en la representacion
binaria del numero

### Solucion

```rust
impl Solution {
    pub fn hamming_weight(mut n: i32) -> i32 {
        let mut tot=0;
        while n!=0 {
            tot += n%2;
            n = n>>1;
        }
        tot
    }
}
```

Cuando se divide el numero entre dos, da un 1 si el numero termina con un un 1 en su representacion binaria,
despues se recorre el numero una vez.
