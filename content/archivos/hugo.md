---
title: "Hugo"
#date : "1 October 2023"
---


 Hugo es un programa que permite generar páginas web estáticas en base a plantillas, estas páginas son muy extensibles y es bastante fácil crear un set de plantillas, aunque ya existem varias plantillas que se pueden usar para cualquier tipo de proposito, pues hugo no solo puede generar las páginas y luego guardarlas en el disco, si no también servirlas dinamicamente

Yo decidí reescribir mi página en markdown con ayuda de unos programas que hice para poder tener mayor flexibilidad y velocidad al agregar una nueva característica, asi como escribir el estandar para la página una sola vez y que este funcione en globalmente sin tener que actualizarlo archivo por archivo.

 Las páginas primero siguen la plantilla definida en la carpeta **layout**, en la cual segun la jerarquia del archivo y su nombre se puede definir una plantilla u otra. Cada archivo tiene metadatos que se definen en el archivo y estas variables se pueden renderizar en la página html segun hayamos creado la plantilla.

 Luego en la carpeta **static** es donde se guardan todos los archivos que sean estaticos como imagenes, estilos y scripts.

 Y en la carpeta **content** es donde se guarda cada post y carpeta del sitio web.


 Las páginas que van a ser generadas se tienen que escribir como archivos markdown, esto estandariza como se veran los archivos, asi como los hace portables y viables a cambiar de formato con algún interprete si es que el html en algún momento es despreciado.

 Algo extra que gane por este cambio es que el código es añadido con resaltado de sintaxis de forma automatica, solo debo crear el bloque de código y especificar el lenguaje.
