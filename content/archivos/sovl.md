---
title: "sovl"
date: "26 Oct 2022"
---

 Sovl es una aplicación que funciona como frontend para mpc y pamixer, este programa lee un archivo de configuración que esta **"~/.config/sovl/"** y se llama **config.ini**, este archivo debe comfigurarse como un archivo .toml, y debe contener la configuración de la aplicación, esta configuración debe tener la configuración de las ventanas, botones y deslizadores, esta configuración debe incluir el tamaño, posición, función y estilo de cada uno de los elementos, cuando se ejecuta el programa este lee la configuración y se modifica en base a esto, por lo que cada vez que se quieran ver los cambios se necesita terminar y volver a ejecutar la aplicación, un ejemplo de esta configuración es el siguiente:
 
```toml
 [Button]
 x=0
 y=80
 Height=20
 width=20
 Image= /home/plof/.config/sovl/play.png
 func= play_pause
 
 [Button0]
 x=30
 y=80
 Height=20
 width=20
 Image= /home/plof/.config/sovl/next.png
 func= next
 
 [Button1]
 Image= /home/plof/.config/sovl/prev.png
 x=60
 y=80
 func= prev
 Height=20
 width=20
 
 [Button2]
 Height=30
 width=30
 Image= /home/plof/.config/sovl/random.png
 x=90
 func= random
 
 [Button3]
 Image= /home/plof/.config/sovl/repeat.png
 x=150
 func= repeat
 Height= 60
 width= 30
 
 [Window]
 X=300
 Y=300
 Height=200
 Width=300
 Image= /home/plof/Pictures/josukeHirashigatachud.png
 Icon= /home/plof/.config/sovl/icon.jpg
 
 [Slider]
 y= 280
 x= 10
 Height=175
 Width=10
```
 

 Proximamente me gustaría agregar soporte para estilos de winmap, y agregar un deslizador que cambie eltiempo de la cancio.
 
### 27/10/2022
 
 Ya agregue el deslizador que cambia el tiempo de la cancion, me gusataria después reescribir el programa en **c++** para hacerlo más rápido
 
### 9/1/2023
 
 Ya esta el control de la cancion, botones redondos que funcionan y poder cambiar el color de el slider, hay que mejorar las imágenes en los botones
 

![](/pro_img/sovl.png)



