---
title: "Gripper"
date: "19 Jun 2024"
---

Este es un proyecto que realice con piezas que me sobraban.

Es un coche con llantas omnidireccionales que se mueve con un joystick y un brazo mecanico controlado con 5 servos mg90 que se controla desde una pagina web, esta pagina web se conecta con comunicacion serial con otro ESP32 el cual se conecta con el esp32 que esta en el coche,
se comunican mediante el protocolo esp32Now.

La pagina web tiene un singleton que muestra el brazo y renderiza su poscicion actual en la misma pagina web, actualmente solo funciona en navegadores basados en chromium pues es este el unico que tiene una API serial. La pagina manda al esp32 un json con cada poscicion de los
servos, luego este lo guarda en una estructura que lo puede mandar mediante esp32Now a el esp32 que controla el coche, el que lo recibe en uno de sus cpus, en el otro esta leyendo un joystick que controla unas llantas

