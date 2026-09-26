---
title: "Mayor Impar"
date: "15 Dec 2023"
tags: ["LeetCode", "String", "Rust", "Algorithms"]
---
## Largest Odd Number in String

Este problema consiste en encontrar el numero mayor impar en una cadena de texto 
### Solución


```rust
impl Solution {
    pub fn largest_odd_number(r: String) -> String {
            let mut len = r.len();
    for c in r.chars().rev() {
        let val = c as u32 - 48;
        if val % 2 != 0 {
            return r[0..len].to_string();
        }
        len -= 1;
    }
    String::new()
    }
}
```

La solución consiste en que si encontramos el primer numero impar del final hacía delante, entonces el mayor numero impar es la combinacion de
ese junto todos los que están al comienzo
