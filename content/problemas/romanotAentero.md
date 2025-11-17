---
title: "Romano A Entero"
date: "30 Nov 2023"
---

## Romano A Entero

Este problema consisten en regresar el valor entero de un numero dad su representacion como numero romano

### Solucion

```go
func romanToInt(s string) int {
	total := 0
	s += " "
	m := make(map[byte]int)
	m['I'] = 1
	m['V'] = 5
	m['X'] = 10
	m['L'] = 50
	m['C'] = 100
	m['D'] = 500
	m['M'] = 1000
	for i := 0; i < len(s)-1; i++ {
		char := s[i]
		n_char := s[i+1]

		if m[n_char] > m[char] {
			total += (m[n_char] - m[char])
			i++
			continue
		}
		total += m[char]
		
	}
	return total
}
```

Este problema se resuelve primero mapeando cada posible caracter a su respectivo valor, luego se itera por todo el array y solo se busca la posible condicion de que el numero este restando y para cubrir esta condicion
hay que preguntar si el siguiente caracter es mayor.

Mi primer intento fue el siguiente código:

```go
func romanToInt(s string) int {
	total := 0
	s += " "
	m := make(map[byte]int)
	m['I'] = 1
	m['V'] = 5
	m['X'] = 10
	m['L'] = 50
	m['C'] = 100
	m['D'] = 500
	m['M'] = 1000
	for i := 0; i < len(s)-1; i++ {
		char := s[i]
		n_char := s[i+1]

		if m[n_char] > m[char] {
			total += (m[n_char] - m[char])
			i++
		} else {
			total += m[char]
		}
	}
	return total
}
```

Y es exactamente el mismo código, pero esta solucion salio como muy lenta, entonces vi la siguiente solucion, la cual se supone era 87% más rapida:

```go
func romanToInt(s string) int {
	total := 0
	m := make(map[byte]int)
	m['I'] = 1
	m['V'] = 5
	m['X'] = 10
	m['L'] = 50
	m['C'] = 100
	m['D'] = 500
	m['M'] = 1000

	for i := 0; i < len(s); i++ {
		currentValue := m[s[i]]

		if i < len(s)-1 {
			nextValue := m[s[i+1]]
			if currentValue < nextValue {
				total += (nextValue - currentValue)
				i++
				continue
			}
		}

		total += currentValue
	}

	return total
}
```

Y note que la unica diferencia era que este no usaba un else, si no un continue para evitar ejecutar la otra parte de el código, al cambiar esto en mi primera versión también logre tener una respuesta más rapida que el 87%
