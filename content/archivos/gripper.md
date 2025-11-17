---
title: "Gripper"
date: "19 Jun 2024"
---

Este es un proyecto que realicé con piezas que me sobraban.

Es un coche con llantas omnidireccionales que se mueve con un joystick y un brazo mecánico controlado con 5 servos mg90 que se controla desde una página web, esta página web se conecta con comunicación seríal con otro ESP32 el cual se conecta con el esp32 que esta en el coche,
se comunican mediante el protocolo esp32Now.

La página web tiene un singleton que muestra el brazo y renderiza su posición actual en la misma página web, actualmente solo funciona en navegadores basados en chromium pues es este el único que tiene una API seríal. La página manda al esp32 un json con cada posición de los
servos, luego este lo guarda en una estructura que lo puede mandar mediante esp32Now a el esp32 que controla el coche, el que lo recibe en uno de sus cpus, en el otro esta leyendo un joystick que controla unas llantas

