---
title: "Sqrt"
date: "05 Dec 2023"
---
## Sqrt

 Este problema consisten en encontrar el numero entero más cercano a la raiz de un numero dado.
 
### Solucion

El problema consiste en una busqueda binaria en el rango desde 0 hasta el numero dado

```go
func mySqrt(x int) int {
	st := 0
	max := x
	res := 0
	for st <= max {
		m := st + ((max - st) / 2)
		fmt.Println(m)
		sq := m * m
		if sq > x {
			max = m - 1
		} else if sq < x {
			st = m + 1
			res = m
		} else {
			return m
		}
	}
	return res
}
```
