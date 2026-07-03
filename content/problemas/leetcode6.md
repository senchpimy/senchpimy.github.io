---
title: "Zigzag Conversion"
date: "03 Jul 2026"
tags: ["LeetCode", "Strings", "Rust", "Algorithms", "Arrays"]
---
## Problema

Este problema consiste en dado un string de caracteres, y un numero de filas, regresar el mismo string
pero acomodado como en zigzag, es decir:

```txt
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
```

Donde primero se coloca la primera fila, luego la segunda en el string, y asi.

### Solucion

```rs
impl Solution {
    pub fn convert(s: String, num_rows: i32) -> String {
        let num_rows = num_rows as usize;
        if num_rows == 1{
            return s;
        }

        let mut res = String::new();
        let number = (num_rows-1)*2;
        let st:Vec<char> = s.chars().collect();
        let len = st.len();
        for i in 0..num_rows{
            for j in (i..len).step_by(number){
                res.push(st[j]);
                if (i > 0 && i<num_rows -1 && j + number - 2 * i < len){
                    res.push(st[j+number-2*i]);
                }
            }
        }
        return res;
    }
}
```

Este problema se soluciona en dos partes, en la primera y ultima fila
los caracteres siguen el mismo patron, la primera fila siempre son los caracteres
que se encuentran en el indice encontrado con la indicacion index + (num_rows - 1 ) * 2,
esto casi resuelve todo el problema, solo se debe de considerar cuando se encuentra en una 
fila intermedia, pues estos se encuentran entre dos caracteres verticales. Si el índice del carácter vertical es `j`, entonces el carácter diagonal se encuentra en:

```txt
j + (num_rows - 1) * 2 - 2 * fila
```

donde `fila` es la fila actual que se está recorriendo.

Por ejemplo, para `numRows = 4`, la segunda fila tiene el patrón:

```txt
A   L S   I G
```

Los caracteres `A`, `L` e `I` corresponden a los índices verticales, mientras que `S` y `G` son los caracteres diagonales calculados con la fórmula anterior.

Finalmente, basta con recorrer cada fila, agregando siempre el carácter vertical y, únicamente para las filas intermedias, agregar también el carácter diagonal si este no se sale de los límites del string. De esta manera se obtiene una solución con complejidad `O(n)`, ya que cada carácter es agregado exactamente una vez al resultado.

