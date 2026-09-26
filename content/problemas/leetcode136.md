---
title: "Single Number"
date: "03 Jul 2026"
tags: ["LeetCode", "Mathematics", "Bit Manipulation", "Algorithms"]
---

## Single Number

 Este problema consiste en dada una lista que tiene un par de todos los elementos de la lista
menos uno, encontrar cuál es ese número que no tiene par
 
### Solución

```rust
impl Solution {
    pub fn single_number(nums: Vec<i32>) -> i32 {
        let mut res = 0;

        for i in nums{
            res = res ^ i;
        }
        return res;
    }
}
```

La solución consiste en que si se le aplica la operación "XOR" a todos los números, sin importar el orden, los que sí tienen un par terminarán
cancelando sus valores entre sí, dejando únicamente el valor que no tiene par.
