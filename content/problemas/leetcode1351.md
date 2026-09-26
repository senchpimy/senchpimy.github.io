---
title: "Count Negative Numbers in a Sorted Matrix"
date: "06 Jul 2026"
tags: ["LeetCode", "Mathematics","Rust", "Algorithms"]
katex: true
---

## Count Negative Numbers in a Sorted Matrix

Este problema consiste en dada una  matriz encontrar cuántos números negativos tiene una matriz


### Solución

```rust
impl Solution {
    pub fn count_negatives(grid: Vec<Vec<i32>>) -> i32 {
        let mut total = 0;

        for row in grid {
            let mut left = 0;
            let mut right = row.len();

            while left < right {
                let mid = left + (right - left) / 2;

                if row[mid] < 0 {
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }

            total += row.len() - left;
        }

        total as i32
    }
}
```
Esta solución itera por cada fila hasta encontrar un número negativo, luego resta el índice a la longitud total de la fila para saber cuántos
elementos hay y finalmente lo suma a un total.
