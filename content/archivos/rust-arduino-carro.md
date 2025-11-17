---
title: "rust-arduino-carro"
date: "04 Feb 2023"
---

 Después de hacer el arduino blink, pense en hacer algo más complicado usando rust y arduino, plo que pense en hacer en un robot con un sensor ultrasonico de distancia que pueda detectar cualquier objeto y que se mueva si es que la distancia hacía el objeto es inferior a una variable. Use un arduino uno, un sensor ultrasonico HC-SR04, una placa personal usando el chip l298n-d que funciona como puente H, dos motores y dos pilas de 9v
   

  

 Las conecciones fueron las siguientes:
 * **TRIGGER:** Pin D9
* **ECCHO:** Pin D10
* **MOTOR1A:**Pin D4
* **MOTOR1B:** Pin D5
* **MOTOR2A:** Pin D6
* **MOTOR2B:** Pin D7


 Para probar las conecciones y que el concepto funcionaba use el siguiente código:
 
```ino

 int triggerPin = 9;
 int echoPin = 10;
 unsigned long duration;
 int distance;
 
 int motorA1=4;
 int motorA2=5;
 int motorB1=6;
 int motorB2=7;
 
 void setup()
 {
 pinMode(triggerPin, OUTPUT);
 pinMode (echoPin, INPUT);
 
 pinMode (motorA1, OUTPUT);
 pinMode (motorA2, OUTPUT);
 pinMode (motorB1, OUTPUT);
 pinMode (motorB2, OUTPUT);
 Serial.begin(9600);
 }
 
 void loop()
 {
 go(); 
 digitalWrite(triggerPin, LOW);
 delayMicroseconds(2);
 //clearing the trigger
 digitalWrite(triggerPin, HIGH);
 delayMicroseconds(10);
 digitalWrite(triggerPin, LOW);
 
 // capturing the time duration for sound wave to travel in microseconds
 duration = pulseIn(echoPin, HIGH);
 distance = 0.01723 \* duration;
 Serial.print(distance);
 Serial.println("cm");
 if (distance&lt10) {turn();};
 
 }
 
 void go(){
 digitalWrite(motorA1, HIGH);
 digitalWrite(motorB1, HIGH);
 }
 
 void turn(){
 digitalWrite(motorA1, LOW);
 digitalWrite(motorB1, HIGH);
 delay(500);
 }
```
 
 Y al ver que este programa si funcionaba, lo pase a rust.
```rust

 #![no_std]
#![no_main]

use panic_halt as _;

const WAIT_BETWEEN_ACTIONS: u16 = 1000u16;
const MINIMAL_DISTANCE: u16 = 10u16;
const TRIGGER_UP_TIME: u16 = 10u16;

#[arduino_hal::entry]
fn main() -> ! {
 let dp = arduino_hal::Peripherals::take().unwrap();
 let pins = arduino_hal::pins!(dp);

 let timer = dp.TC1;
 timer.tccr1b.write(|w| w.cs1().prescale_64());

 let left_forw = pins.d4.into_output().downgrade();
 let left_back = pins.d5.into_output().downgrade();
 let right_forw = pins.d6.into_output().downgrade();
 let right_back = pins.d7.into_output().downgrade();
 let echo = pins.d13;
 let mut trig = pins.d12.into_output();
 let mut wheels = [left_forw, left_back, right_forw, right_back];
 let mut distancia;

 loop{
 go_forward(&mut wheels);
 
 let mut delay = arduino_hal::Delay::new();
 //timer.tcnt1.write(|w| w.bits(0) );
 trig.set_high();
 delay.delay_us(TRIGGER_UP_TIME);
 trig.set_low();
 
 while echo.is_low() {
 go_forward(&mut wheels);
 if timer.tcnt1.read().bits() >= 65000 {
 go_forward(&mut wheels);
 }
 }
 
 //timer.tcnt1.write(|w| w.bits(0) );
 
 if echo.is_high() {
 let value = (timer.tcnt1.read().bits() \* 4) / 58;
 distancia = u16::from(value);

 if distancia < MINIMAL_DISTANCE {
 stop(&mut wheels);
 turn_left(&mut wheels);
 arduino_hal::delay_ms(WAIT_BETWEEN_ACTIONS);
 }
 }
 
 }
}

use arduino_hal::prelude::\*;
const TURNING_TIME: u16 = 700u16;

/// The mutable wheels array is destructured for easier manipulation.
pub fn go_forward(
 wheels: &mut [arduino_hal::port::Pin; 4],
) {
 // Be careful here with the order of unpacking. In my case, pin 4 is connected to left forward, 5 to left backwards, etc
 let [left_forw, left_back, right_forw, right_back] = wheels;
 left_forw.set_high();
 right_forw.set_high();

 left_back.set_low();
 right_back.set_low();
}

pub fn go_backward(
 wheels: &mut [arduino_hal::hal::port::Pin; 4],
) {
 let [left_forw, left_back, right_forw, right_back] = wheels;

 left_forw.set_low();
 right_forw.set_low();

 left_back.set_high();
 right_back.set_high();
}

pub fn turn_right(
 wheels: &mut [arduino_hal::hal::port::Pin; 4],
) {
 stop(wheels);
 let [left_forw, _, _, _] = wheels;

 let mut delay = arduino_hal::Delay::new();
 left_forw.set_high();
 delay.delay_ms(TURNING_TIME);
}
pub fn turn_left(
 wheels: &mut [arduino_hal::hal::port::Pin; 4],
) {
 stop(wheels);
 let [_, _, right_forw, _] = wheels;

 let mut delay = arduino_hal::Delay::new();
 right_forw.set_high();
 delay.delay_ms(TURNING_TIME);
}

pub fn stop(wheels: &mut [arduino_hal::hal::port::Pin; 4]) {
 let [left_forw, left_back, right_forw, right_back] = wheels;

 left_forw.set_low();
 left_back.set_low();
 right_forw.set_low();
 right_back.set_low();
}
 
```



