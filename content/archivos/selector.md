---
title: "Selector de Archivos"
date: "16 Jan 2023"
---
 Cuando estaba haciendo mi programa para mandar mensajes me di cuenta que al haber tantos navegadores de archivos no habia un estándar para invocar un selector de archivos y tener el **string** de la ubicación de este archivo que fue seleccionado, con esto en mente cree en rust un selecotr de archivos simple, este solo muestra los contenidos de una carpeta y al hacer click en algún archivo este regresa el string de su ubicación, este programa tiene un buscador y además de que puede ser ejecutado de forma en la que solo aparezacan archivos de determinado tipo
 
![](/pro_img/archivos.gif)

 Este programa no tiene nombre pero al ponerlo en tu **PATH** tan solo basta para pasarle los formatos como argumentos, en realidad este programa solo renderiza aquellos archivos que contengan en su terminacion el string que fue pasado como argumento por lo que si introduces **jpg** en lugar de **.jpg** puede que aparezacan archivos que no tengan esa extensión pero si ese string, pero si pasas como argumento **images, videos o documents** hay una selección de formatos preedefinidos, pero no creo que esto sea valido para todos los casos
 


