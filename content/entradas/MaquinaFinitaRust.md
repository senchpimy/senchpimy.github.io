---
title: "Máquina de Estados Determinista Finita"
date: "10 Sep 2024"
---

Una Máquina de estados finita consiste en un sistema el cual posee una serie de estados determinados y finitos, los cuales según la entrada que
entre al sistema, este tomara una decisión y cambiara de estado. EL cambio de estado se llama transición de estado.

## Ejemplo

Para este ejemplo máquina tendrá 3 estados, cerrado, abierto y bloqueado,

```mermaid
stateDiagram-v2
    cerrado: Estado Cerrado
    abierto: Estado Abierto
    bloqueado: Estado Bloqueado

    cerrado --> abierto: Contraseña Correcta
    cerrado --> bloqueado: 3 Contraseñas Incorrectas
```
En rust podriamos representar cada Estado como un Enum

```rs
enum State{
    Cerrado,
    Abierto,
    Bloqueado
}
```

Y la maquina como una estructura:

```rs
struct Maquina{
    estado:State,
    pin:String,
    intentos:u8
}
```

Y las funciones asociadas con esta estructura serían:

```rs
impl Maquina{
    fn new()->Self{
        Self{
            estado:State::Cerrado,
            pin:"123".to_string(),
            intentos:0
        }
    }
    fn ingresar_pin(&mut self, pin:String){
        match self.estado{
            State::Cerrado=>{
                if pin == self.pin && self.intentos<3{
                    self.estado=State::Abierto;
                }else{
                    self.intentos+=1;
                    if self.intentos>=3{
                        self.estado=State::Bloqueado;
                    }
                }
            },
            State::Abierto=>{
                self.estado=State::Cerrado;
            },
            State::Bloqueado=>{}
        }
    }
}

```
