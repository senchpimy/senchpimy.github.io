---
title: "Single Number"
date: "03 Jul 2026"
tags: ["LeetCode", "Mathematics", "Bit Manipulation", "Algorithms"]
---

## Single Number

 Este problema consisten en dada una lista que tiene un par de todos los elementos de la lista
meno suno, encontrar cual es ese numero que no tiene par
 
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

La solucion consiste en que si se le aplica la operacion "XOR" a todos los numeros, sin importar el orden, los que si tienen un par terminaran
cancelando sus valores entre si, dejando unicamente el valor que no tiene par.
