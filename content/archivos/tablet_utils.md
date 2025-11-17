---
title: "Funcionalidades Extra de Tablet"
date: "18 Sep 2024"
---

## Introducción

Compré una computadora la cual tiene la capacidad de doblarse como tablet y leer la entrada de dispositivos touch y en este caso también de una pluma
pero en mi caso me gusta la experiencia de un administrador de ventanas, y aunque gnome por defecto tengo una buena experiencia con las diferentes
funcionalidades de el hardware me gusta más un sistema ligero, por lo que quise crear un programa con el cual pueda agregar diferentes funcionalidades
usando esta pluma.

## Leyendo la entrada

Primero se necesita leer los datos que se reciben desde el kernel, por algún motivo fue algo confuso al principio, pues al parecer sin 
ningún motivo aparente la entrada de la pluma puede estar en cualquiera de estas dos ubicaciones, no se por que pero cambia cada vez que se reinicia
la computadora.

- /dev/input/event12
- /dev/input/event13

Por lo que estoy leyendo ambos al mismo tiempo.


```rs
fn rundaemon() {
    let event_size = mem::size_of::<input::StylusInputRaw>();

    // Crear un closure para leer y procesar eventos
    let read_and_process = |event_device: &'static str| {
        thread::spawn(move || {
            // Abrir el dispositivo
            let mut f = File::open(event_device)
                .expect(&format!("Failed to open input device: {}", event_device));
            let mut buffer = vec![0u8; event_size];
            let mut state = interaction::State::new();

            println!("Started Reading from {}", event_device);
            loop {
                // Intentar leer del dispositivo
                if f.read_exact(&mut buffer).is_ok() {
                    let r = input::parse_stylus_input(&buffer, event_size);
                    if let Some(raw) = r {
                        let data = input::StylusInput::from_raw(raw);
                        if let Some(data) = data {
                            state.process(data);
                            state.handle_live();
                        }
                    }
                } else {
                    eprintln!("Incomplete event on {}", event_device);
                }
            }
        })
    };

    // Iniciar los hilos para ambos dispositivos
    let handle1 = read_and_process("/dev/input/event12");
    let handle2 = read_and_process("/dev/input/event13");

    // Esperar a que ambos hilos terminen (nunca sucederá en este caso)
    handle1.join().unwrap();
    handle2.join().unwrap();
}
```

Luego tengo que leer cada evento, en linux los eventos miden 24 bytes, su definicion
en el kernel de linux es la siguiente:

```c
struct input_event {
#if (__BITS_PER_LONG != 32 || !defined(__USE_TIME_BITS64)) && !defined(__KERNEL__)
	struct timeval time;
#define input_event_sec time.tv_sec
#define input_event_usec time.tv_usec
#else
	__kernel_ulong_t __sec;
#if defined(__sparc__) && defined(__arch64__)
	unsigned int __usec;
	unsigned int __pad;
#else
	__kernel_ulong_t __usec;
#endif
#define input_event_sec  __sec
#define input_event_usec __usec
#endif
	__u16 type;
	__u16 code;
	__s32 value;
};
```

Lo que se podía reducir a solo la siguiente


```c
struct input_event {
    struct timeval time; /* tiempo del evento */
    __u16 type;          /* tipo del evento */
    __u16 code;          /* código del evento */
    __s32 value;         /* valor del evento */
};
```

Por lo que tengo que leer cada 24 bytes y ordenarlos de tal forma en la que
pueda tener acceso a cada valor para poder trabajar con cada uno de estos:

```rs
#[derive(Debug)]
pub struct StylusInputRaw {
    tv_sec: i64,
    tv_usec: i64,
    type_: u16,
    code: u16,
    val: i32,
}

pub fn parse_stylus_input(raw_data: &Vec<u8>, size: usize) -> Option<StylusInputRaw> {
    if raw_data.len() != size {
        return None; // Ensure the input data has the correct length
    }

    Some(StylusInputRaw {
        tv_sec: i64::from_ne_bytes(raw_data[0..8].try_into().unwrap()),
        tv_usec: i64::from_ne_bytes(raw_data[8..16].try_into().unwrap()),
        type_: u16::from_ne_bytes(raw_data[16..18].try_into().unwrap()),
        code: u16::from_ne_bytes(raw_data[18..20].try_into().unwrap()),
        val: i32::from_ne_bytes(raw_data[20..24].try_into().unwrap()),
    })
}

```
Y luego lo puedo guardar en una serie de estructuras y enums que me gusto como
quedo gracias al sistema de tipos de rust


```rs
type Pressed = bool;

#[derive(Debug, PartialEq)]
pub enum StylusAction {
    Tilt(StylusCoord),
    Btn1(Pressed),
    Btn2(Pressed),
}

#[derive(Debug, PartialEq)]
pub enum StylusCoord {
    X(i32),
    Y(i32),
}

#[derive(Debug, PartialEq)]
pub enum StylusData {
    Coord(StylusCoord),
    Action(StylusAction),
    Pression, // I dont about this one tho
    Terminator,
}

#[derive(Debug)]
pub struct StylusInput {
    pub date: DateTime<Utc>,
    pub data: StylusData,
}

impl StylusInput {
    pub fn from_raw(raw: StylusInputRaw) -> Option<Self> {
        let timestamp = raw.tv_sec;
        let nanos = (raw.tv_usec * 1_000) as u32;
        let date = DateTime::from_timestamp(timestamp, nanos).unwrap();
        let data = match raw.type_ {
            0 => Some(StylusData::Terminator),
            1 => match raw.code {
                320 => Some(StylusData::Action(StylusAction::Btn1(raw.val >= 1))),
                331 => Some(StylusData::Action(StylusAction::Btn2(raw.val >= 1))),
                26 => {
                    println!("Tilt X");
                    Some(StylusData::Action(StylusAction::Tilt(StylusCoord::X(
                        raw.val,
                    ))))
                }
                27 => {
                    println!("Tilt Y");
                    Some(StylusData::Action(StylusAction::Tilt(StylusCoord::Y(
                        raw.val,
                    ))))
                }
                330 => {
                    //I dont know but I sometimes get this code
                    None
                }
                _ => None,
            },
            3 => match raw.code {
                0 => Some(StylusData::Coord(StylusCoord::X(raw.val))),
                1 => Some(StylusData::Coord(StylusCoord::Y(raw.val))),
                _ => None,
            },
            4 => Some(StylusData::Pression),
            _ => None,
        };
        data.map(|data| Self { date, data })
    }
}
```

Finalmente puedo definir ciertas interacciones y actuar de acuerdo a la 
que recibi
