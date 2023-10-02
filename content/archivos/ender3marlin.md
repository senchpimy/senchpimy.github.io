---
title: "Marlin para la Ender 3"
date: "29 Oct 2022"
---


 Para poder usar y modificar el marlin para la ender 3 primero debemos de descargar el marlin desde la pgina como archivo zip y luego descomprimirlo o clonandolo de github con **git clone https://github.com/MarlinFirmware/Marlin.git**


 Despues de tener los archivos tenemos que abrir la carpeta que dice Marlin y ahi borramos los archivos **Configuration.h** y **Configuration\_adv.h**


 Estos archivos los tenemos que reemplazar por los archivos que encontraremos en <https://github.com/MarlinFirmware/Configurations>, en el cual en la parte de [Readme/Branches](https://github.com/MarlinFirmware/Configurations) seleccionaremos en **Browse** de la version de Marlin que tengamos, en el repositorio nos iremos a **config&gtexamples** en esta seccion estan todos los ejemplos de Marlin para diferentes impresoras y marcas, como yo tengo una ender 3 me ire a **Creality<Ender3**, aqui hay varias carpetas y cada una es el nombre de una placa para la ender 3 como yo estoy usasndo la placa CrealityV1, hare click en esa.
 

 Todos los archivos que hay en esta carpeta los tenemos que pasar a la carpeta de Marlin en donde borramos los archivos de configuracion, luego desde el IDE de arduino abrimos el archivo Marlin.ino asengurandonos de tener el puerto correcto y la placa correcta (Sanguino) y el procesador correcto y lo cargamos la placa en mi caso la Creality
 


