---
title: "DWM Status"
date: "09 Nov 2022"
---

 Dwm no tiene mucha configuración por defecto por lo mismo de ser muy mínimo, por lo que para poder hacerlo como AwesomeWM hay que hacer muchas maromas para poder tenerlo funcional.
   

  

 Por defecto y sin ningún cambio Dwm tiene en la esquina superior derecha un texto en el cual se lee **dwm-xx** donde xx es la versión de dwm, para poder cambiar este texto con el comando **xsetroot -name "XXX"** donde XXX es el texto que va a salir en está esquina, y con esto podemos hacer que salida de un comando sea el texto de que aparecerá en esa parte por ejemplo **xsetroot -name "$(date)"** pondra en esa esquina la salida de el comando date que es la fecha, con esto en cuenta el programa [dwmblocks](https://github.com/torrinfail/dwmblocks) nos da una implementación de poder colocar la salida de cualquier comando en está parte de la pantalla, si compilamos el programa con **sudo make clean install** y lo ejecutamos como **dwmblocks** podremos ver que en la esquina tendremos la fecha y cuanta memoria está disponible y cuánta a ha sido utilizada y que estos valores cambian cada cierto tiempo, estos son los ejemplos que vienen en el archivo blocks.def.h, 

```c
 static const Block blocks[] = {
 /\*Icon\*/ /\*Command\*/ /\*Update Interval\*/ /\*Update Signal\*/
 {"Mem:", "free -h | awk '/^Mem/ { print $3\"/\"$2 }' | sed s/i//g", 30, 0},

 {"", "date '+%b %d (%a) %I:%M%p'", 5, 0},
};
``` 
  

 Podemos ver que lo único que hay en está lista son dos comandos **de shell** que son ejecutados, los comentarios son muy explicativos en esto, hay un icono, este es opcional y este saldrá enfrente de la salida de su respectivo comando, luego sigue el comando que se va a ejecutar y finalmente está el intervalo que es cada cuanto este comando se volvera a ejecutar y el valor que presenta se reiniciará.
 

![](https://dwm.suckless.org/patches/status2d/status2d.png)


 Pero esto solo nos podrá mostrar letras, si queremos hacerlo algo más lindo como la imagen de arriba en donde podremos ver diferentes figuras necesitaríamos dwm tenga el patch de [status2d](https://dwm.suckless.org/patches/status2d/), este patch nos permite que con una cierta secuencia de caracteres podremos generar rectángulos, líneas y efectos sobre las letras de cualquier color hexadecimal, ya con este patch instalado podremos hacer estos efectos:
 
 **^c#XXXXXX^**
 
 Con el texto de arriba dwm aplicara el color hexadecimal **XXXXXX** a todo lo que este después de ese texto ya sea un gráfico o letras
 
 **^r3,3,14,14^**
 
 El texto de arriba generará un cuadrado de 14x14 pixeles comenzando desde la coordenada 3,3
 
 **^f20^**
 
 Este texto creará un espacio de 20 pixeles entre el último gráfico dibujado y en donde empezara a dibujar, de no colocar esto las letras o los siguientes graficos que se quieran dibujar.
 
**^b#XXXXXX^**
 
 Y el siguiente código pondra el fondo de el color **XXXXXX**.
 por lo que el siguiente código
```sh
 xsetroot -name "^c#55cdfc^^r3,3,14,14^^f20^"
``` 
 
 Mostrara lo siguiente en la pantalla:
 
![](/pro_img/dwmstatus.png)

 Con esto podemos hacer gráficas tomando valores del 1-100 y mapearlos del 0-32 que es el máximo que tengo configurado como el tamaño, podremos mostrar el uso de cada core de el cpu y el uso total de la memoria ram, además de la fecha y yo agregue que cancion está reproduciendo mpd, finalmente me quedó asi:
 
![](/pro_img/dwmstatus2.png)

 Para recapitular, usando unos patches de dwm, un programa llamado dwmblocks y unos scripts en python se puede lograr este efecto, también se puede mostrar la bateria y hacer cada uno de estos unos botones que reaccionen a los clicks, pero esto último me causa crasheos en dwm y actualmente no lo he podido implementar, todo lo necesario para reproducir esto se encuentra [aquí](https://github.com/senchpimy/dwmstatus)



