---
title: "Mano Robot"
date: "28 Jul 2023"
---


 Construi una mano que hasta cierto nivel sigue los movientos de otra mano en base a una camara, para esto escribi el siguiente programa:
```py
import cv2
import os
import numpy as np
import mediapipe as mp

webcam=cv2.VideoCapture(0)
mp_hand= mp.solutions.hands
hands = mp_hand.Hands()

mp_drawing_utils = mp.solutions.drawing_utils

def distancia(
 punto1,#:mp.framework.formats.landmark_pb2.NormalizedLandmark
 punto2#:mp.framework.formats.landmark_pb2.NormalizedLandmark
 )->float:
 x=(punto1.x-punto2.x)
 y=(punto1.y-punto2.y)
 return np.sqrt(x\*\*2+y\*\*2)\*1000

def regla_de_tres(referencia:float, mapear:float)->int:
 #if mapear>referencia:return 180
 v = referencia/350
 p = v\*mapear
 if int(p)>180:return 180
 return int(p) 

while webcam.isOpened():
 succes, img = webcam.read()
 if not succes:break
 result = hands.process(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
 if result.multi_hand_landmarks:
 for hand in result.multi_hand_landmarks:
 mitad = distancia(hand.landmark[mp_hand.HandLandmark.WRIST],hand.landmark[mp_hand.HandLandmark.MIDDLE_FINGER_MCP])
 medio = distancia(hand.landmark[mp_hand.HandLandmark.MIDDLE_FINGER_TIP],hand.landmark[mp_hand.HandLandmark.MIDDLE_FINGER_MCP])
 pulgar = distancia(hand.landmark[mp_hand.HandLandmark.THUMB_TIP],hand.landmark[mp_hand.HandLandmark.THUMB_MCP])
 indice = distancia(hand.landmark[mp_hand.HandLandmark.INDEX_FINGER_MCP],hand.landmark[mp_hand.HandLandmark.INDEX_FINGER_TIP])
 ring = distancia(hand.landmark[mp_hand.HandLandmark.RING_FINGER_MCP],hand.landmark[mp_hand.HandLandmark.RING_FINGER_TIP])
 pinky = distancia(hand.landmark[mp_hand.HandLandmark.PINKY_MCP],hand.landmark[mp_hand.HandLandmark.PINKY_TIP])
 print(regla_de_tres(mitad,medio))
 print(regla_de_tres(mitad,indice\*1.12)) # Relacion 0.9:1 con el medio
 print(regla_de_tres(mitad,ring\*1.26)) # Relacion 0.8:1 con el medio
 print(regla_de_tres(mitad,pinky\*1.58)) # Relacion 0.6:1 con el medio
 #print(regla_de_tres(mitad,pulgar\*1.25)) # Relacion 0.8:1 con el medio
 mp_drawing_utils.draw_landmarks(img,hand, mp_hand.HAND_CONNECTIONS)

 cv2.imshow("image",img)
 cv2.waitKey(1)
webcam.release()
cv2.destroyAllWindows()
```
 
 Este programa usa **mediapipe** para poder obtener las imagenes de una camara y **opencv** para detectar ciertos puntos de la mano
 
![](/pro_img/manos_ejemplos.png)
![](/pro_img/puntos_mano.png)

  

 Para poder explicar el por que de las distancias que tome y como lo hice primero hay que ver la mano.
   

  

 Este es un [modelo](https://www.thingiverse.com/thing:17773) ya diseñado, este enlace contiene lo necesario para armar la mano hasta cierto nivel, pero yo encontré más conveniente solo imprimir la mano de ese modelo y luego imprimir el antebrazo desde [este modelo de aquí](https://www.thingiverse.com/thing:1927150)
 también hay que imprimir los modelos que soportan a los servo motores y guian los hilos de los dedos de las mano y estos se encuentran en [este modelo](https://www.thingiverse.com/thing:65274) asi como las poleas de los servos
   

  

 Como se puede ver, no hay mucho control en el modelo más que hacía delante y hacía atras, por lo que el programa solo toma en cuenta la distancia desde la punta del dedo hasta la base de este, luego toma como referencia la distancia de la base del dedo medio hasta la muñeca para saber que tanto
 se movio cada dedo, esto para tener una aproximacion y siempre se mueva lo mismo sin importar que tan lejos este la mano de la calamara y el tamaño de la mano.

 Con estos datos saca una regla de tres para poder mapear el punto maximo a 180 y el mínimo a 0 que son que tanto se puede mover un servomotor.
   

  

 El programa del arduino es igual de simple, este lee los primeros 4 caracteres, siendo el primero el dedo que se va a mover y los otros 3 la cantidad, ejemplo: **T180** (mover el pulgar *Thumb* a la poscicion 180)
 
 ```ino

 #include 
Servo thumb;
Servo index;
Servo middle;
Servo ring;
Servo pinky;


byte test[5];
int c;
int d;
int u;
int result;
void setup() {
 Serial.begin(9600);
 thumb.attach(4);
 index.attach(5);
 middle.attach(6);
 ring.attach(7);
 pinky.attach(8);
}

void loop() {
 if (Serial.available()){
 Serial.readBytes(test,5);
 c = test[1] - 48;
 d = test[2] - 48;
 u = test[3] - 48;
 result = (c\*100)+(d\*10)+u;
 //Serial.println(result);
 
 char dedo = test[0];
 switch (dedo){
 case 'T': // Thumb
 thumb.write(result);
 break;
 case 'I': // Index
 index.write(result);
 break;
 case 'M': // Middle
 middle.write(result);
 break;
 case 'R': // ring
 ring.write(result);
 break;
 case 'P': // Pinky
 pinky.write(result);
 break;
 default:
 Serial.println("Not found");
 break;
 }
 }

}
 ```
 
 Ahora que ya tenemos las dos partes funcionando debemos unirlas, para esto se uraria python y la librería **Pyserial**, y para hacerlo más modular con para hacerlos con objetos para tener la posibilidad de tener diferentes manos cree este objeto
 
 ```py
import serial

class hand():
 def __init__(self):
 self.ard = serial.Serial('/dev/ttyACM0',9600)
 #ard = serial.Serial('COM3', 9600)
 def thumb(self, num:int):
 nu = str(num)
 st = f"T{nu.zfill(3)}\n"
 self.ard.write(st.encode('UTF-8'))
 def index(self, num:int):
 nu = str(num)
 st = f"I{nu.zfill(3)}\n"
 self.ard.write(st.encode('UTF-8'))
 def middle(self, num:int):
 nu = str(num)
 st = f"M{nu.zfill(3)}\n"
 self.ard.write(st.encode('UTF-8'))
 def ring(self, num:int):
 nu = str(num)
 st = f"R{nu.zfill(3)}\n"
 self.ard.write(st.encode('UTF-8'))
 def pinky(self, num:int):
 nu = str(num)
 st = f"P{nu.zfill(3)}\n"
 self.ard.write(st.encode('UTF-8'))
 def close(self):
 self.ard.close()
 
 ```
 Que segun el dedo que se quiere mover, este enviara el comando necesario al arduino.

 y finalmente con el esto el código de python quedaría como:

```py
 import cv2
import numpy as np
import mediapipe as mp
import hand

webcam=cv2.VideoCapture(0)
mp_hand= mp.solutions.hands
hands = mp_hand.Hands()

mp_drawing_utils = mp.solutions.drawing_utils

def distancia(
 punto1,#:mp.framework.formats.landmark_pb2.NormalizedLandmark
 punto2#:mp.framework.formats.landmark_pb2.NormalizedLandmark
 )->float:
 x=(punto1.x-punto2.x)
 y=(punto1.y-punto2.y)
 return np.sqrt(x\*\*2+y\*\*2)\*1000

def regla_de_tres(referencia:float, mapear:float)->int:
 #if mapear>referencia:return 180
 v = referencia/350
 p = v\*mapear
 if int(p)>180:return 180
 return int(p) 

mano = hand.hand()

while webcam.isOpened():
 succes, img = webcam.read()
 if not succes:break
 result = hands.process(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
 if result.multi_hand_landmarks:
 for hand in result.multi_hand_landmarks:
 mitad = distancia(hand.landmark[mp_hand.HandLandmark.WRIST],hand.landmark[mp_hand.HandLandmark.MIDDLE_FINGER_MCP])
 medio = distancia(hand.landmark[mp_hand.HandLandmark.MIDDLE_FINGER_TIP],hand.landmark[mp_hand.HandLandmark.MIDDLE_FINGER_MCP])
 pulgar = distancia(hand.landmark[mp_hand.HandLandmark.THUMB_TIP],hand.landmark[mp_hand.HandLandmark.THUMB_MCP])
 indice = distancia(hand.landmark[mp_hand.HandLandmark.INDEX_FINGER_MCP],hand.landmark[mp_hand.HandLandmark.INDEX_FINGER_TIP])
 ring = distancia(hand.landmark[mp_hand.HandLandmark.RING_FINGER_MCP],hand.landmark[mp_hand.HandLandmark.RING_FINGER_TIP])
 pinky = distancia(hand.landmark[mp_hand.HandLandmark.PINKY_MCP],hand.landmark[mp_hand.HandLandmark.PINKY_TIP])
 mano.pinky(regla_de_tres(mitad,pinky\*1.58))
 mano.ring(regla_de_tres(mitad,ring\*1.26))
 mano.index(regla_de_tres(mitad,indice\*1.12))
 mano.thumb(regla_de_tres(mitad,pulgar\*1.25))
 mano.middle(regla_de_tres(mitad,medio))
 #print(regla_de_tres(mitad,medio))
 #print(regla_de_tres(mitad,indice\*1.12)) # Relacion 0.9:1 con el medio
 #print(regla_de_tres(mitad,ring\*1.26)) # Relacion 0.8:1 con el medio
 #print(regla_de_tres(mitad,pinky\*1.58)) # Relacion 0.6:1 con el medio
 #print(regla_de_tres(mitad,pulgar\*1.25)) # Relacion 0.8:1 con el medio
 mp_drawing_utils.draw_landmarks(img,hand, mp_hand.HAND_CONNECTIONS)

 cv2.imshow("image",img)
 cv2.waitKey(1)
webcam.release()
cv2.destroyAllWindows()
 
``` 



