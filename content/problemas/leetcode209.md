---
title: "Minimum Size Subarray Sum"
date: "07 Jul 2026"
tags: ["LeetCode", "Mathematics","Rust", "Algorithms"]
katex: true
---

## Minimum Size Subarray Sum

Dado un array de números y un número objetivo, encontrar el mínimo subarray continuo que sumen un valor igual o superior al objetivo

### Solución

```rust
impl Solution {
    pub fn min_sub_array_len(target: i32, nums: Vec<i32>) -> i32 {
        let mut left = 0;
        let mut sum = 0;
        let mut min = usize::MAX;

        for right in 0..nums.len() {
            sum += nums[right];

            while sum >= target {
                min = min.min(right - left + 1);
                sum -= nums[left];
                left += 1;
            }
        }

        if min == usize::MAX {
            0
        } else {
            min as i32
        }
    }
}
```

Esta solución es una *sliding window* que busca una suma y solo guarda el número menor que encuentre, cuando encuentra un número válido se recorre por la izquierda para ver si ese número se puede reducir.
