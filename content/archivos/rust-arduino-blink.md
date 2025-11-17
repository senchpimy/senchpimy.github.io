---
title: "Rust en Arduino"
date: "07 Jan 2023"
---

 Rust es un lenguaje de bajo nivel que me gustaría aprender, aquí hay un ejemplo de el equivalente al programa blink, para el **arduino uno** usando Rust.


 Primero hay que instalar los programas necesarios para linkear y compilar para el arduino, en arch son las siguientes:
 
 pacman -S arduino-avr-core
 pacman -S avr-gcc
 
 Luego hay que crear un nuevo proyecto de rust usando cargo.
   

  

 En este proyecto hay que usar una versión diferente de el compilador por lo que en la carpeta hay que ejecutar **rustup override set nightly**, luego ya podemos modificar al archivo Cargo.toml con los siguientes campos:
```toml

[dependencies]
panic-halt = "0.2.0"

[dependencies.arduino-hal]
git = "https://github.com/Rahix/avr-hal"
rev = "4c9c44c"
features = ["arduino-uno"]

[profile.dev]
panic = "abort"
lto = true
opt-level = "s"

[profile.release]
panic = "abort"
codegen-units = 1
debug = true
lto = true
opt-level = "s"
 
```
 Entonces el archivo Cargo.toml finalmente quedaría como:
 
 
```toml
[package]
name = "arduino-rust-1"
versión = "0.1.0"
edition = "2021"

[dependencies]
panic-halt = "0.2.0"

[dependencies.arduino-hal]
git = "https://github.com/Rahix/avr-hal"
rev = "4c9c44c"
features = ["arduino-uno"]

[profile.dev]
panic = "abort"
lto = true
opt-level = "s"

[profile.release]
panic = "abort"
codegen-units = 1
debug = true
lto = true
opt-level = "s"
```

 
 En la misma carpeta raiz hay que crear un archivo av-atmega328p.json y le ponemos lo siguiente:
 
```json
{
 "llvm-target": "avr-unknown-unknown",
 "cpu": "atmega328p",
 "target-endian": "little",
 "target-pointer-width": "16",
 "target-c-int-width": "16",
 "os": "unknown",
 "target-env": "",
 "target-vendor": "unknown",
 "arch": "avr",
 "data-layout": "e-P1-p:16:8-i8:8-i16:8-i32:8-i64:8-f32:8-f64:8-n8-a:8",

 "executables": true,

 "linker": "avr-gcc",
 "linker-flavor": "gcc",
 "pre-link-args": {
 "gcc": ["-Os", "-mmcu=atmega328p"]
 },
 "exe-suffix": ".elf",
 "post-link-args": {
 "gcc": ["-Wl,--gc-sections"]
 },

 "singlethread": false,
 "no-builtins": false,

 "no-default-libraries": false,

 "eh-frame-header": false
 }
```
 
 Luego hay que crear la carpeta ".cargo" y en esta el archivo "config.toml", el cual contendra lo siguiente:
 
```toml
 [build]
 target = "avr-atmega328p.json"
 
 [unstable]
 build-std = ["core"]
 
 Y para la configuración esto sería todo, luego el código para probar si funciona es el siguente:
 
 #![no_std]
 #![no_main]
 
 use panic_halt as _;
 
 #[arduino_hal::entry]
 fn main() -> ! {
 let dp = arduino_hal::Peripherals::take().unwrap();
 let pins = arduino_hal::pins!(dp);
 
 // Digital pin 13 is also connected to an onboard LED marked "L"
 let mut led = pins.d13.into_output();
 let mut trig = pins.d10.into_output();
 let mut ecco = pins.d9;
 led.set_high();
 //led.set_low();
 
 loop {
 led.toggle();
 arduino_hal::delay_ms(100);
 led.toggle();
 arduino_hal::delay_ms(100);
 led.toggle();
 arduino_hal::delay_ms(100);
 led.toggle();
 arduino_hal::delay_ms(800);
 }
 }
```
 
 Y al ejecutar **cargo build** deberíamos tener una compilación exxitosa que dos dará como resultado un archivo **.elf** en la carpeta **target/avr-atmega328p/debug/**, de ser asi Entonces ejecutamos **cargo build --release**, que tardara un poco más en compilar pero el compilador hace más optimizaciones al código, y el resultado de este estará en la carpeta **target/avr-atmega328p/relase/**, este archivo lo copiamos a la raiz de el proyecto y ejecutamos el siguiente scrpit de bash con el arduino conctado.
 
```sh
 #! /usr/bin/zsh
 echo $1
 cargo build
 sudo avrdude -q -C/etc/avrdude.conf -patmega328p -carduino -P/dev/ttyACM0 -D "-Uflash:w:$1:e"
```
 
 Y entonces todo debería funcionar correctamente y el led incluido en el arduino conectado en el pin 13 debería parpadear.

 Esto es possible gracias a la librería [avr-hal](https://github.com/Rahix/avr-hal), en su github esta ese ejemplo de uso asi como algo de documentacion y varios ejemplos de diferentes proyectos usando rust en diferentes microcontroladores y placas arduino

