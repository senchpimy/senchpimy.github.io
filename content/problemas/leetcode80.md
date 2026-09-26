---
title: "Eliminar Duplicados II"
date: "11 Aug 2026"
tags: ["LeetCode", "Two Pointers", "Array", "Rust", "Algorithms"]
---
## Remove Duplicates from Sorted Array II

Este problema consiste en que, dado un array ordenado, se debe eliminar los duplicados de forma que cada elemento aparezca como máximo dos veces, modificando el array in-place y devolviendo la nueva longitud.

### Solución

```rust
use std::cmp;
impl Solution {
    pub fn remove_duplicates(nums: &mut Vec<i32>) -> i32 {
        let mut left = 0;
        let mut right = 0;
        while right < nums.len(){
            let mut count = 1;
            while right +1 < nums.len() && nums[right]==nums[right+1]{
                right +=1;
                count +=1;
            }
            let min = cmp::min(2,count);
            for i in 0..min{
                nums[left] = nums[right];
                left +=1;
            }
            right +=1;
        }

        nums.truncate(left);
        left as i32
    }
}
```

Se usan dos punteros: `right` recorre el array agrupando elementos iguales y contando cuántos hay, mientras que `left` marca la posición donde se escribe el resultado. Por cada grupo se copian como máximo 2 elementos a la posición de `left`, y al final se trunca el vector a esa longitud.
