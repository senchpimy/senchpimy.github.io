---
title: "Ender3 como CNC"
date: "09 Nov 2022"
---

Este proyecto es una modificación a mi impresora una ender 3 para que esta sea capaz de funcionar como una CNC, lo que hice fue imprimir [este adaptador (Version 4 para la ender 3)](https://www.thingiverse.com/thing:3369444) pues es una modificación que me permitirá hacer que a la ender 3 se le puedan montar varias herramientas de forma rápida sin tener la preocupación que lo que se vaya a montar no quede centrado.

 Como la quiero hacer una CNC necesito un adaptador para el motor que tengo que seria el **GS-775M**, encontré un diseño de ese motor en internet y en base a ese puede hacer [este diseño](motor_cnc.stl), se imprime con soportes y yo recomiendo una relleno +20% con +2 paredes, el diseño funciona muy bien y si puede soportar el motor sin tener vibraciones.
 

![](/pro_img/adaptador_motor.png)
![](/pro_img/adaptador_motor_con_motor.png)

Lo malo de este diseño es que no tuve en cuenta la distancia de la broca a la placa, lo estoy ocupando para hacer circuitos impresos, y para esto tuve que incorporar una extensión en cura la cual me permite agregar una separación entre el extrusor y la cama directamente en el **G-code** *\*en mi caso (pues coloco una tabla de madera para proteger la cama de la ender 3 de la broca) de mas de 2 cm\**
Tambien diseñé una adaptador para diferentes tipos de plumas o lápices para este adaptador basado en [este modelo](https://www.thingiverse.com/thing:4721453), para que funcione solo necesitas descargar la tuerca desde la página original y [mi adaptación](pluma_cnc.stl)

![](/pro_img/adaptador_pluma.png)




