---
title: "Servidor Archivos"
date: "17 Jan 2023"
---


 Creando otros proyectos me vi en la necesidad de poder crear un servidor al cual con una simple request POST sobre https con el debido json poder recibir cualquier archivo que requiera, para esto cree este programa el cual hace justamente esto

 Solo hay que configurar un archivo .json, el cual contiene los archivos los cuales pueden ser requeridos, pero considero que lo deberia cambiar, ya que para conseguir un archivo es necesario saber la ubicacion de el archivo en la maquina que lo hostea, lo cual puede causar problemas.

 La seguridad de la contraseña también piensa que puede ser cambiada ya que esta información es enviada como un .json simple, lo cual si el usuario final no se encarga de configurar el servidor como http, o configurar la contraseña por defecto encriptada, esta podría ser interceptada



