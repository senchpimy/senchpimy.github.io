---
title: "Stable Diffusion"
date: "20 Jul 2023"
---
**Stable Diffusion**, es un modelo de inteligencia artifical que sirve para generar imagenes, lo bueno de este modeloes que es **open source** y se puede ejecutar de forma local, entonces lo quise ejecutar en mi propia maquina, entonces vi que una de las formas más rapida de poder usar este 
 modelo es usando el programa **[stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)**, este programa funciona en casi todas las computadoras de forma automatica, solo hay que ejecutar el script de instalacion y asi deberia funcionar, pero en mi computadora
 y por el hardware que tengo tuve que hacer unos pasos extras.

 Al intentar ejecutar el script por primera vez, este no descaragba la version de **ROCm** necesaria para funcionar, luego de tiempo de investigar me di cuenta que mi tarjeta gráfica todavia no estaba soportada por este software, asi que deje de intentarlo por un tiempo hasta que vi la noticia
 que la nueva version ya funcionaba con la tarjeta que tenía, entonces intente seguir los pasos anteriores otra vez, pero seguia teniendo el mismo error, entonces intente unos forks de **stable-diffusion-webui**, y uno logro funcionar pero este usaba el cpu en lugar de la gpu, segui revisando 
 los reportes de problemas en el github de **stable-diffusion-webui** y vi que el soporte para mi tarjeta ya estaba agregado, pero aun asi los cambio que vi no estaban en la version que descargue, entonces vi que **stable-diffusion-webui** tenía varias **branches** y estaba descargando la 
 version estable, cuando los cambio para poder soportar la version nueva estaban en la rama de desarrollo (*dev*), entonces elimine el repositorio que habia descargado y use este comando para descargar la rama que necesitaba:

```sh
 git clone --branch dev https://github.com/AUTOMATIC1111/stable-diffusion-webui
``` 
 

 Con esto descargue la version correcta, la cual descargaba la version más nueva de **pytorch** y la version **5.5** de **ROCm** en lugar de la estable **5.4**, con esto elscript ya funciono y avanzo, pero justo en la ultima linea del script después de ejecutarlo me daba un error de 
 **segmentation fault**, que al buscar este error, era por que por algun motivo también detectaba la gráfica dentro de mi cpu y no funciona bien, por lo que hay que exportar la siguiente variables:
 
``` sh
 export ROCR_VISIBLE_DEVICES=0 
``` 
 

 Con esto el script deberia ignorar la gráfica en el cpu, pero por algun motivo a veces tengo el mismo *segfault*, por lo que para evitar esto primero hay que exportar esa variable sin ningun otro comando y luego en la carpeta de **stable-diffusion-webui** ya podemos ejecutar otra vez lo
 siguiente

 ```
 export ROCR_VISIBLE_DEVICES=0 && sh webui.sh
 ```
 

 Con esto el programa ya me funciono sin ningun problema
 
![](/pro_img/stablediffucion.png)




