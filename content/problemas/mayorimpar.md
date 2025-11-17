+++
title = 'Mayor Impar'
date = 2023-12-15T15:10:29-06:00
+++

## Largest Odd Number In String

Este problema consiste en encontrar el numero mayor impar en una cadena de texto 
### Solucion


```rs
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

La solución consiste en que si encontramos el primer numero impar de el final hacía delante, entonces el mayor numero impar es la combinacion de
ese junto todos los que están al comienzo
