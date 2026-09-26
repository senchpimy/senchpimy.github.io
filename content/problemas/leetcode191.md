---
title: "Number of 1 Bits"
date: "06 Jul 2026"
tags: ["LeetCode", "Mathematics","Rust", "Algorithms"]
katex: true
---
## Number of 1 Bits

Este problema consiste en dado un número encontrar cuántos '1' existen en la representación
binaria del número

### Solución

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

Cuando se divide el número entre dos, da un 1 si el número termina con un un 1 en su representación binaria,
después se recorre el número una vez.
