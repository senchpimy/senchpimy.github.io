---
title: "Hugo"
date : "1 Oct 2023"
---


 Hugo es un programa que permite generar paginas web estaticas en base a plantillas, estas paginas son muy extensibles y es bastante facil crear un set de plantillas, aunque ya existem varias plantillas que se pueden usar para cualquier tipo de proposito, pues hugo no solo puede generar las paginas y luego guardarlas en el disco, si no tambien servirlas dinamicamente

Yo decidi reescribir mi pagina en markdown con ayuda de unos programas que hice para poder tener mayor flexibilidad y velocidad al agregar una nueva caracteristica, asi como escribir el estandar para la pagina una sola vez y que este funcione en globalmente sin tener que actualizarlo archivo por archivo.

 Las paginas primero siguen la plantilla definida en la carpeta **layout**, en la cual segun la jerarquia del archivo y su nombre se puede definir una plantilla u otra. Cada archivo tiene metadatos que se definen en el archivo y estas variables se pueden renderizar en la pagina html segun hayamos creado la plantilla.

 Luego en la carpeta **static** es donde se guardan todos los archivos que sean estaticos como imagenes, estilos y scripts.

 Y en la carpeta **content** es donde se guarda cada post y carpeta del sitio web.


 Las paginas que van a ser generadas se tienen que escribir como archivos markdown, esto estandariza como se veran los archivos, asi como los hace portables y viables a cambiar de formato con algun interprete si es que el html en algun momento es despreciado.

 Algo extra que gane por este cambio es que el codigo es añadido con resaltado de sintaxis de forma automatica, solo debo crear el bloque de codigo y especificar el lenguaje.
