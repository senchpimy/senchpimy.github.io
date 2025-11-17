---
title: "C en Rust"
date: "05 Dec 2023"
---

Este es un pequeño resumen de como usar código de C existente en proyectos de Rust.

## build.rs

Este es un pequeño programa que se encargara de compilar el código de C para despues añadirlo a el código de Rust.

En este caso especificamos el código y la compilacion

**build.rs**
```rs
extern crate cc; //Importamos la libreria que nos ayda a compilar

fn main() {
    cc::Build::new()
        .file("src/contar.c") // Especificamos el archivo
        .compile("libcontar.a"); // especificamos la salida
}
```

Y añadimos la dependencia de el script bajo esta seccion en el archivo Cargo.toml
**Cargo.toml**

```toml
[build-dependencies]
cc = { version = "1.0", features = ["parallel"] }

```
Y asi ya podemos acceder a las funciones que tenemos en nuestros archivos, pero hay que declararla primero 

```rs
extern "C" {
    fn funcion(arg: type) -> type;
}
```

Donde para acceder a los tipos de c se tiene que usar la siguiente importacion:
```rs
use std::ffi::{tipo};
```
Y los tipos estan llamados:

- c_int
- c_char
- c_void
- c_long
- ...

Algo que note fue que para pasar un *String* de rust a una funcion que necesecite un *char se requiere de la siquiente funcion
Donde si la funcion usa un **char \* ** en Rust se tiene que declarar como **\*const c_char** 
```rs
#[no_mangle]
pub extern "C" fn create_string(val: Option<&str>) -> *const c_char {
    match val {
        Some(val) => {
            let c_string = CString::new(val).expect("CString::new failed");
            c_string.into_raw() // Move ownership to C
        }
        None => CString::new("No value")
            .expect("CString::new failed")
            .into_raw(),
    }
}
```

Si se tienen funciones que requieren structuras especificas estas se tienen que declarar tanto en C como en Rust

*Rust*
```rs
#[repr(C)]
pub struct Raices {
    pub positivas: i32,
    pub negativas: i32,
}
```

*C*
```c
typedef struct {
  int positivas;
  int negativas;
}Raices;
```

Y finalmente para ejecutar las funciones se requiere usar la funcion *unsafe*

```rs
unsafe{funcion()}
```

