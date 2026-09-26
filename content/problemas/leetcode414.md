---
title: "Third Maximum Number"
date: "03 Jul 2026"
tags: ["LeetCode", "Algorithms", "Python"]
---
## Third Maximum Number

Este problema consiste en contrar el tercer numero más grande 

### Solución


```rust
impl Solution {
    pub fn third_max(nums: Vec<i32>) -> i32 {
        if nums.len()<3{
            return *nums.iter().max().unwrap();
        }
        let mut first: Option<i32> = None;
        let mut second: Option<i32> = None;
        let mut third: Option<i32> = None;
        for var in nums{
            if first == Some(var) || second == Some(var) || third == Some(var) {
                continue;
            }
            if first.map_or(true, |x| var > x) {
                third = second;
                second = first;
                first = Some(var);
            }
            else if second.is_none() || var > second.unwrap(){
                third = second;
                second = Some(var);
            }
            else if third.is_none() || var > third.unwrap(){
                third = Some(var);
            }
        }

        if third.is_some(){
            third.unwrap()
        }else{
            first.unwrap()
        }
    }
}
```

Este problema consiste en tener tres variables con valores nulos, 
y se itera en la lista una sola vez, cuando se ecuentra un valor se pregunta si el valor existe 
y luego se encuentra en que poscicion deberia ir
