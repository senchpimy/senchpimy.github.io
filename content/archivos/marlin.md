---
title: "Marlin"
date: "28 Oct 2023"
---

 Marlin es el firmware más usado para las impresoras 3D y al hacerle modificaciones fisicas a la mia debia por lo tanto hacerle modificaciones a el firmware de la impresora. Aqui esta como lo hice.
 

 Primero tuve que programar la placa controladora por defecto que traía mi Ender 3 en este caso era la placa Creality V1.1.4, para esto tuve que quemarle el bootloader de arduino a la placa, para esto tuve que hacer click en **Archivos&gtEjemplos&gtArduinoISP&gtArduinoISP** y en **programador** seleccioné **AVRISP mkII** y el puerto correspondiente que me marcaba el Arduino IDE, subí el programa a un Arduino UNO comun, luego tuve que agregar la placa se Sanguino de a las información de Arduino para que este la pueda detectar, para esto tuve que hacer click en **Archivo&gtPreferencias** y saldrá un aventana, en esta ventana debemos buscar el campo de texto que dice **Additional Boards Manager URLs** y agregar el siguiente enlace <https://raw.githubusercontent.com/Lauszus/Sanguino/master/package_lauszus_sanguino_index.json>, luego le damos en **OK**, luego hacemos click en **Herramientas&gtPlaca&gtAdministrador de Placas** y en el campo de texto de busqueda buscamos Sanguino y en la unica que nos sale (Si nos salen varias es la de **Sanguino by Kristian Sloth Lauszus**) le damos en instalar, esperamos a que se descargue y lo cerramos.
 

 Luego sin desconectar el arduino de la computadora conectamos los pines para usar el protocolo MISO-MOSI de el arduino con los de la placa de la siguiente manera:
 

![](/pro_img/ender-3-arduino-firmware-pinout.webp)


 Donde se conecta cada uno con su color correspondiente en el otro, en la parte de herramientas ahora cambiamos la parte que dice **Placa** a la que dice **Sanguino**, el **Programador** a **Arduino como ISP** y el **Proceasdor** a **ATmega 1284P (16 MHz)** en la misma parte de herramientas hasta anajo daremos click en **Quemar bootloader** y si todo salio bien nos saldrá que el bootloader a sido grabado sin errores.
 

 Luego debemos desconectar el Arduino de la computadora y conectar la placa directamente para poder cargar el Marlin, pero primero debemos de descargar unas librerias que nos faltan para poder compilar el Marlin, con una instalación fresca de Octubre del 2022, las unicas librerias que faltaron fueron **U8glib** Y **U8glib-HAL** los cuales para instalarlos solo debemos hacer click en **Archivos&gtAdministar Librerias** y solo debemos buscar estos nombres por separado en el buscador de la ventana que sale e instalar estas librerias.
 

 Cuando estas ya se hayan descargado ya podremos cargar nuestra configuracion de Marlin a nuestra placa.
 

### Continua como ENDER3 configuracion Marlin en [Archivos](..)



