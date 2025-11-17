---
title: "Octoprint"
date: "2024-01-16"
---

Octoprint  es un programa que crea un servidor en el podemos manejar y monitorear impresoras 3d, actualmente lo estoy ejecutando en una raspberry pi, pensaba ejecutarlo en un dispositivo android, pero necesito rootearlo para poder tener permiso a la unica salida de datos, lo unico que no 
se como hacer es de alguna forma poder ejecutar comandos definidos, esto pues acomode un servomotor al apagador de la impresora para poder también poder prenderla y apagarla a la distancia, el apagador esta en la fuente de poder y el código que ejecuto es el siguiente

```py
from gpiozero import AngularServo
from gpiozero import Servo
from gpiozero.pins.pigpio import PiGPIOFactory
from time import sleep

factory = PiGPIOFactory()
servo =AngularServo(24, pin_factory=factory)

try:
        while True:
            servo.angle = int(input("servo pos"))
except KeyboardInterrupt:
        print("Program stopped")
```

Para que este funcione hay que activar el daemon pigpiod, pues si dejamos al servo ser controlado por software este era muy inestable
