---
title: "Raspberry Pi Setup"
date: "31 Jul 2022"
---

 Continuando con mi configuracion de mi Raspberry pi decidi ademas de la pantalla colocarle un ventilador y un boton de apagado encendido.

 La configuracion y funcionamiento de el script de la pantalla ya fue explicado en [este enlace](oled.html).

 Para el boton intente utilizar [este script](https://github.com/Howchoo/pi-power-button) debido a que tiene la funcionalidad de apagar y prender la raspberry pi desde el mismo boton, este no fue implementado debido a que interferia con la comunicacion I2C de la pantalla por lo que escribi mi porpio programa, con antirebote y con un delay para que la Raspberry no se apague con movientos o con presiones accidentales, este es el codigo (Python) 

```py
 #Aqui no estan incluidas las librerias
 pin=27
 i=0
 GPIO.setup(pin,GPIO.IN,pull\_up\_down=GPIO.PUD\_UP)
 while True:
    time.sleep(0.5)
 if GPIO.input(pin)==False:
     i=i+1
 else:
     i=0
 if (i>6):
     subprocess.run("poweroff",shell=True)
```


Este es un codigo simple que solo toma el pin 27 GPIO (BCM MODE) de la raspberry y lee una entrada simple LOW, el proceso se ejecuta cada 0.5 segundos y si el pin 27 se encuentra en LOW, entonces se suma 1 a la variable que "cuenta" el tiempo que estuvo presionado, al esta llegar a 6 se ejecuta un apagado del dispositivo de forma segura, en caso contrario el contador se reinicia


 Para el ventilador tuve problemas pues mi ventilador de 3 pines en la mayoria del tiempo fallaba el control pwm y no lo seguia, la programacion funciona (en teoria) pero en mi caso personal las fallas del ventilador no me permitian hacer nas pruebas y mejorar mi codigo.


```py
 GPIO.setup(11,GPIO.OUT)
 pwm=GPIO.PWM(11,100)
 pwm.start(0)
 while True:
     temp=str(subprocess.check_output('/usr/bin/vcgencmd measure\_temp',shell=True))
     temp=float(temp[7:-5])
     val_pwm=int((temp - 45) * (100 - 0) // (70 - 45) + 0)
 if (temp>50):
    pwm.ChangeDutyCycle(val_pwm)
 else:
     pwm.ChangeDutyCycle(0)
```



Este script toma la temperatura de la cpu desde un comando ya incorporado y la utiliza para activar, dasctivar o variar la velocidad de un ventilador, subiendo las revoluciones si tiene una tempreatura elevada o bajandolas o apagandose si esta a una temperatura aceptable 


Para poder ejecutar todo al mismo tiempo sin tener que hacer muchos malabares el programa principal (con el programa de la pantalla incluido), es un script que ejecuta estos 3 diferentes programas como procesos hijos, el del boton y el del ventilador nunca terminan de ejecutarse pero el de la pantalla si, esto fue una de las raxones por lo cual lo hice de esta forma, el rpograma final quedaria asi: 


```py
import RPi.GPIO as GPIO
import subprocess
import time
import board
import busio
import digitalio
from PIL import Image, ImageDraw, ImageFont
import adafruit_ssd1306
from multiprocessing import Process

def Oled_screen():
 oled_reset = digitalio.DigitalInOut(board.D4)
 
 # Display Parameters
 WIDTH = 128
 HEIGHT = 64
 BORDER = 5
 
 # Use for I2C.
 i2c = board.I2C()
 oled = adafruit_ssd1306.SSD1306_I2C(WIDTH, HEIGHT, i2c, addr=0x3C, reset=oled_reset)
 
 image= Image.open('lain.ppm').convert('1')
 oled.image(image)
 oled.show()
 time.sleep(4)
 oled.fill(0)
 oled.show()
 
 # Clear display.
 oled.fill(0)
 oled.show()
 
 # Create blank image for drawing.
 # Make sure to create image with mode '1' for 1-bit color.
 image = Image.new("1", (oled.width, oled.height))
 
 # Get drawing object to draw on image.
 draw = ImageDraw.Draw(image)
 
 # Draw a white background
 draw.rectangle((0, 0, oled.width, oled.height), outline=255, fill=255)
 
 font = ImageFont.truetype('PixelOperator.ttf', 16)
 #font = ImageFont.load_default()
 start=time.time()
 while True:
 
 # Draw a black filled box to clear the image.
 draw.rectangle((0, 0, oled.width, oled.height), outline=0, fill=0)
 
 # Shell scripts for system monitoring from here : https://unix.stackexchange.com/questions/119126/command-to-display-memory-usage-disk-usage-and-cpu-load
 cmd = "hostname -I | cut -d\' \' -f1"
 IP = subprocess.check_output(cmd, shell = True )
 cmd = "top -bn1 | grep load | awk '{printf \"CPU: %.2f\", $(NF-2)}'"
 CPU = subprocess.check_output(cmd, shell = True )
 cmd = "free -m | awk 'NR==2{printf \"Mem: %s/%sMB %.2f%%\", $3,$2,$3\*100/$2 }'"
 MemUsage = subprocess.check_output(cmd, shell = True )
 cmd = "df -h | awk '$NF==\"/\"{printf \"Disk: %d/%dGB %s\", $3,$2,$5}'"
 Disk = subprocess.check_output(cmd, shell = True )
 cmd = "vcgencmd measure_temp |cut -f 2 -d '='"
 temp = subprocess.check_output(cmd, shell = True )
 
 # Pi Stats Display
 draw.text((0, 0), "IP: " + str(IP,'utf-8'), font=font, fill=255)
 draw.text((0, 16), str(CPU,'utf-8') + "%", font=font, fill=255)
 draw.text((80, 16), str(temp,'utf-8') , font=font, fill=255)
 draw.text((0, 32), str(MemUsage,'utf-8'), font=font, fill=255)
 draw.text((0, 48), str(Disk,'utf-8'), font=font, fill=255)
 
 #Display Image 
 oled.image(image)
 oled.show()
 time.sleep(.1)
 if ((time.time()-start)/60>2):
 oled.fill(0)
 oled.show()
 break


def Fan_control():
 GPIO.setup(11,GPIO.OUT)
 pwm=GPIO.PWM(11,100)
 pwm.start(0)
 while True:
 temp=str(subprocess.check_output('/usr/bin/vcgencmd measure_temp',shell=True))
 temp=float(temp[7:-5])
 val_pwm=int((temp - 45) \* (100 - 0) // (70 - 45) + 0)
 if (temp>50):
 pwm.ChangeDutyCycle(val_pwm)
 else:
 pwm.ChangeDutyCycle(0)


def Power_button():
 pin=27
 i=0
 GPIO.setup(pin,GPIO.IN,pull_up_down=GPIO.PUD_UP)
 while True:
 time.sleep(0.5)
 if GPIO.input(pin)==False:
 i=i+1
 else:
 i=0
 if (i>6):
 subprocess.run("poweroff",shell=True)
 

Oled=Process(target=Oled_screen)
Fan=Process(target=Fan_control)
butonn=Process(target=Power_button)
Oled.start()
Fan.start()
butonn.start()
```
