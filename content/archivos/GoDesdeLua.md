---
title: "Go desde Lua"
date: "27 oct 2024"
---

## Llamando código de Go desde Lua

Primero hay que tener un código/funciones de go como las siguiente:

```go
func add(x int, y int) int{
    return x+y
}
```

luego hay que importar la librería necesaria para convertirlo a código de C y tambien indicar que dicha funcion va a ser exportada

```go
import "C"

//export Add
func add(x int, y int) int{
    return x+y
}
```

Tambien hay que agregar el paquete y una funcion main vacia, ademas de  indicar que la funcion es publica convirtiendo la primera letra a mayuscula


```go
package main
import "C"

//export Add
func add(x int, y int) int{
    return x+y
}

func main() {}
```

Compilamos el archivo con el siguiente comando

```bash
go build -o awesome.so -buildmode=c-shared awesome.go
```
Esto nos generara un archivo llamado **awesome.so**
Luego en Lua se hace lo siguiente:

```lua
local ffi = require("ffi")
local awesome = ffi.load("./awesome.so")

```
Y finalmente hay que añadir las definiciones, el siguiente ejemplo crea una definicion en un .h para indicar su equivalencia en C

```lua
local ffi = require("ffi")
local awesome = ffi.load("./awesome.so")

ffi.cdef([[
typedef long long GoInt64;
typedef unsigned long long GoUint64;
typedef GoInt64 GoInt;
typedef GoUint64 GoUint;
typedef double GoFloat64;

typedef struct { const char *p; GoInt n; } GoString;
typedef struct { void *data; GoInt len; GoInt cap; } GoSlice;

extern GoInt Add(GoInt p0, GoInt p1);
extern GoFloat64 Cosine(GoFloat64 p0);
extern void Sort(GoSlice p0);
extern GoInt Log(GoString p0);
]]);
```

En nuesttro caso quedaria como:


```lua
local ffi = require("ffi")
local awesome = ffi.load("./awesome.so")

ffi.cdef([[
typedef long long GoInt64;
typedef GoInt64 GoInt;

extern GoInt Add(GoInt p0, GoInt p1);
]]);
```

Y se podría ejecutar lo siguiente sin ningun problema:
```lua
awesome.Add(1,+1) --2
```
