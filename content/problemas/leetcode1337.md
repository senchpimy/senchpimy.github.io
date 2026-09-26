---
title: "The K Weakest Rows in a Matrix"
date: "06 Jul 2026"
tags: ["LeetCode", "Mathematics","Rust", "Algorithms"]
katex: true
---
## The K Weakest Rows in a Matrix

Este problema consiste en dada una matriz de valores que solo son 1 y 0, regresar los indices indices de
**k** filas con menos 1. Las filas estan ordenadas de tal forma que los ceros estas siempre solo al final del
array si es que hay ceros.

### Solución

```rust
impl Solution {
    pub fn k_weakest_rows(mat: Vec<Vec<i32>>, k: i32) -> Vec<i32> {
        let mut res = Vec::new();
        let mut tot = Vec::new();
        let mut i = 0;
        for row in mat{
            let sol = row.iter().sum::<i32>();
            tot.push((i,sol));
            i+=1;
        }
        for j in 0..k{
            let mut idx = tot.len()-1;
            while idx>j as usize{
                if tot[idx].1<tot[idx-1].1{
                    tot.swap(idx,idx-1);
                }
                idx-=1;
            }
            res.push(tot[j as usize].0);
        }
        res
    }
}
```
Esta solucion crea un vector de pares conteniendo el indice en la lista original y la cantidad de 1 en esa fila,
luego usando bubble sort aprovechando la propiedad de que si lo modificamos de cierta forma para que solo ordene **k** elementos
en lugar de todo el array y regresar esos elementos. Esta solucion tiene una optimizacion, en lugar de sumar cuantos
elementos hay, aprovechar que todos los ceros estan a la izquierda y encontrar el indice, esta busqueda es log(n) en lugar de O(n)


```rust
impl Solution {
    pub fn k_weakest_rows(mat: Vec<Vec<i32>>, k: i32) -> Vec<i32> {
        let mut rows = mat
    .iter()
    .enumerate()
    .map(|(i, row)| (row.partition_point(|&x| x == 1), i as i32))
    .collect::<Vec<_>>();

    rows.sort_unstable();

    rows.into_iter()
    .take(k as usize)
    .map(|(_, i)| i)
    .collect()
    }
}
```
