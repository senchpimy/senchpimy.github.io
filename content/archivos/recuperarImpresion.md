---
title: "recuperarImpresion"
date: "02 Aug 2023"
---

 Cuando estaba imprimiendo algo que ya llevaba varios dias de avanzado y esta tuvo un error al 70% de la pieza, no queria volver a imprimir todo otra vez, asi que tuve que buscar como poder recuperar una impresion.
 Este metodo funciona editando el Gcode de la pieza, puede haber otros metodos como imprimir por separado la pieza faltante
   

  

 Lo primero y lo más importante que hay que hacer es no mover la pieza, intentar si es posible tener la cama caliente para evitar que la pieza de despegue de esta, y si esta en una cama con removible, no moverla ni un poco, pues esto puede causar movimientos en la figura final que no solo 
 se notara el cambio de capa, sino tambien puede hacer que la pieza tenga un punto de quiebre en esa capa.
   

  

 Primero hay que tener la capa en la cual la maquina se quedo (si lograste ver la altura en la cual se quedo no hay porblema colo hay que tener este numero presente) y hay bastantes formas de hacerlo, podemos contar las capas que ya llevaba, pero cuando son muchas este no resulta practico, pero tambien podemos encontrar algun punto como una esquina o un borde de una capa anterior que ya este terminada
 y desde ahi poder contar cuantas capas extra a la capa que se quedo atorada faltan.
   

  

 Tambien podriamos medir con una regla y a veces puede ser lo mas exacto que necesitamos pero tambien con la impresora podriamos mover el eje Z hasta que, el extrusor frio apenas este tocando la pieza, esto hay que hacerlo con mucho cuidado de que por mover alguno de los ejes, el extrusor termine empujando
 la pieza o la termine despegando de la cama, lo cual seria casi imposible de recuperar.
   

  

 Ya con la altura en la que se quedo la capa esta hay que localizarla en en archivo Gcode del cual empezo a imprimirse, y retomar desde ahi, algunos generadores de Gcode ya incluyen por defecto comentarios sobre cual cuapa es la que se esta imprimiendo, pero otros como **cura** no lo tienen
 por defecto asi que en este hay que encontrar la capa por la altura y esto se hace buscando el string que este furmulado de la siguiente forma:
   

  

**Z{altura}**
  

  

 De tal forma que si la altura en la que se quedo fue en 3.5 cm el hay que buscar por la linea que contenga un:
   

  

**Z50**
  

  

 Y ya que la encontramos porcedemos a borrar todas las lineas que este anteriores a esas, excepto las que verifican la tempreatura y las que lo mueven al comienzo
 


