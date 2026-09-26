---
title: "Fair Candy Swap"
date: "11 Aug 2026"
tags: ["LeetCode", "Array", "Hash Set", "Rust", "Algorithms"]
---
## Fair Candy Swap

Este problema consiste en que Alice y Bob tienen cajas de dulces; deben intercambiar exactamente una caja cada uno para que ambos terminen con la misma cantidad total de dulces.

### Solución

Mi primera solución fue fuerza bruta, probando cada combinación de cajas:

```rust
impl Solution {
    pub fn fair_candy_swap(alice_sizes: Vec<i32>, bob_sizes: Vec<i32>) -> Vec<i32> {
        let alice_tot:i32 = alice_sizes.iter().sum();
        let bob_tot:i32 = bob_sizes.iter().sum();
        let mut alice:i32 = 0;
        let mut bob:i32 = 0;

            'res: for i in alice_sizes {
                    for j in &bob_sizes {
                        if alice_tot - i + *j == bob_tot + i - *j {
                            bob = *j;
                            alice = i;
                            break 'res;
                        }
                    }
            }
        
        vec![alice, bob]
    }
}
```

Pero es O(n * m) y no es eficiente. La solución óptima usa la diferencia entre los totales: si `diff = (sumaBob - sumaAlice) / 2`, entonces para cada `x` de Alice buscamos `x + diff` en Bob usando un HashSet:

```rust
use std::collections::HashSet;

impl Solution {
    pub fn fair_candy_swap(alice_sizes: Vec<i32>, bob_sizes: Vec<i32>) -> Vec<i32> {
        let diff = (bob_sizes.iter().sum::<i32>() - alice_sizes.iter().sum::<i32>()) / 2;
        
        let set_b: HashSet<i32> = bob_sizes.into_iter().collect();
        
        alice_sizes.into_iter()
            .find(|&a| set_b.contains(&(a + diff)))
            .map(|a| vec![a, a + diff])
            .unwrap()
    }
}
```

La clave está en la relación matemática: si Alice da `x` y recibe `y`, entonces `sumA - x + y = sumB + x - y`, lo que simplifica a `y = x + (sumB - sumA) / 2`. Con el HashSet la búsqueda se reduce a O(n + m).
