---
title: "Reloj Calendario"
date : "2024-03-31"
---

## Introduccion

Quise usar un reloj inteligente, pero queria que tambien mostrara mis pendientes y un calendario y encontre varios como el Amazon Echo Show
pero no se veia como queria, seria muy aburrido solo comprarlo y no funcionaria como querria

## Pantalla
Compre una pantalla touch de aliexpres y un raspberry pi zero 2w

![](/archivos/pantallaDespertador.png)

## Obteniendo los datos

Para obtener los datos aproveche que uso obsidian y que uso **syncthing**, obsidian con el plugin de **fullcalendar** puedo crear eventos en el calendario
desde mi celular y como se sincronizan automaticamente con mi servidor de syncthing que usa mi raspberry Pi que uso como servidor, puedo obtener cualquier nuevo evento
que agregue, luego con un servidor de python hice un programa que lea todos los pendientes, y convierte en yaml en json de tal forma que los pueda representar en
mi despertador.

## Creado el Programa

Hay varias opciones para crear una interfaz grafica de la forma en la que queria, pero quise probar con JS pero sin tener un navegador abierto por 
las limitaciones de la raspberry asi que utilice **tauri** que me deja crear programas usando JS para el frontend y rust para el backend.


![](/archivos/pantallaDespertador2.png)

El programa te deja interactuar y modificar de donde se va a obtener la informacion desde la misma interfaz asi como alguas interacciones que 
aprovechan el touch de la pantalla

## Compilando

Como la raspberry usa otra aquitectura (armv7) tuve que usar un contenedor de docker para poder crosscompilar el binario para la raspberry pi

## Mostrando el programa

Ya que tenemos el programa terminado y la pantalla lista necesitamos saber como podemos cominar los dos.

Mi primera opcion fue usar TinyWl que es un administrador de ventanas de Wayland que es muy simple y por lo tanto usa minimos recursos
tuve que compilarlo desde la raspberry pi pues linkeaba las librerias de mi computadora (arch) y al momento de ejecutarlo (debian) no
encotraba las librerias, despues tuve que compilarlo desde un commit del 2020 pues **wlroots** la libreria que usa tinywl se encuentra
en la version 0.11 en debian.

Pero esto fue inutil ya que este Tinywl no tenia soporte para la pantalla touch, es decir no detectaba el touch.

Entonces tuve que cambiar a usar Xorg y use una version modificada de dwm para que solo muestre este unico programa y compilarlo para esta
aquitectura

## Final

Ahora es muy simple, pero esta abierto a que se le pueda añadir más fucionalidad
