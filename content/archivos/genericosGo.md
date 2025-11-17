---
title: "Genéricos En Go"
date: "23 Jul 2024"
---

Los genericos se pueden declarar y usar funciones y tipos para que trabajen con cualquier set de tipos.

## Ejemplo

Un ejemplo del uso de valores no genericos es el siguiente:

```go
// SumInts adds together the values of m.
func SumInts(m map[string]int64) int64 {
    var s int64
    for _, v := range m {
        s += v
    }
    return s
}

// SumFloats adds together the values of m.
func SumFloats(m map[string]float64) float64 {
    var s float64
    for _, v := range m {
        s += v
    }
    return s
}
func main() {
    // Initialize a map for the integer values
    ints := map[string]int64{
        "first":  34,
        "second": 12,
    }

    // Initialize a map for the float values
    floats := map[string]float64{
        "first":  35.98,
        "second": 26.99,
    }

    fmt.Printf("Non-Generic Sums: %v and %v\n",
        SumInts(ints),
        SumFloats(floats))
}
```
En donde para cada tipo de dato hay una función diferente

## Sintaxis

Para crear genericos se tiene que especificar que tipos de datos son soportados, para esto se crearon las funciones con parámetros de tipos para que funcionen con parámetros de diferentes tipos, y finalmente la función
se llama con argumentos de tipo y argumentos normales.

Cuando se define un tipo, cada parametro debe tener un *type constraint* (restricciones de tipo) cada type constraint limita que tipos pueden usar dicha función,
al momento de la compilación se verifica que el tipo que pasa coincida con los límites que le fueron puestos


```go
func SumIntsOrFloats[K comparable, V int64 | float64](m map[K]V) V {
    var s V
    for _, v := range m {
        s += v
    }
    return s
}
```

En este caso se define que *K* debe tener la interfaz comparable y que  *V* sea o int o float, Y en los argumentos de la función se define de que tipo debe ser cada parametro

Al final el código quedaría asi:

```go
    SumIntsOrFloats[string, int64](ints),
    SumIntsOrFloats[string, float64](floats))
```
