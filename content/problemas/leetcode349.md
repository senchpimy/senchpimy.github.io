---
title: "Intersection of Two Arrays"
date: "06 Jul 2026"
tags: ["LeetCode", "Mathematics","Rust", "Algorithms"]
katex: true
---
## Intersection of Two Arrays

Este problema consiste en dado dos arrays, encontrar los elementos únicos que existen en ambos arrays


### Solución

```rust
use std::collections::HashSet;
impl Solution {
    pub fn intersection(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        let mut res:Vec<i32> = Vec::new();
        let mut set = HashSet::new();
        for i in nums1{
            set.insert(i);
        } 

        for  j in nums2{
            if set.contains(&j){
                set.remove(&j);
                res.push(j);
            }
        }
        res
    }
}
```
Esta solución consiste en agregar todos los elementos de una lista a un Hashset, y luego cuando se itera sobre la lista
agregar solo los elementos que están en el Hashset y eliminarlos del HashSet después de agregarlos para evitar repeticiones
