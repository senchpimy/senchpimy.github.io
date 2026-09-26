---
title: "Sqrt"
date: "05 Dec 2023"
tags: ["LeetCode", "Mathematics", "Binary Search", "Go", "Algorithms"]
---
## Sqrt

 Este problema consiste en encontrar el número entero más cercano a la raíz de un número dado.
 
### Solución

El problema consiste en una búsqueda binaria en el rango desde 0 hasta el número dado

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
