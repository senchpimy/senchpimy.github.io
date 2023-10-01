---
title: "Numero Valido"
date: "29 Jun 2023"
---

## Numero Valido



 Este problema consisten en regresar todos los numeros en un texto que cumpla con una serie de caracteristicas que lo verifican como un numero de telefono valido, ejemplos podiran ser los siguientes
   

  

**987-123-4567**
  

**(123) 456-7890**

### Solucion


```sh
 grep -e "^[0-9]\{3\}\-[0-9]\{3\}\-[0-9]\{4\}$" -e "^([0-9]\{3\}) [0-9]\{3\}\-[0-9]\{4\}$" file.txt
```
 

 En este vez usamos expresiones regulares para poder buscar las ocurrencias, con grep buscamos estas equivalencias, con los simbolos **^** y **$**
 decimos que seleccionamos todos los caracteres en una linea, con el texto **[0-9]** decimos que el caracter en esa poscicion puede ser un valor desde el 0 hasta el 9
 y con **{3}** hace que encuentre 3 caracteres de concuerden con el caracter anterior, y como el caracter anterior es un numero entre 0 y 9, luego repetimos este patron 
 y agregamos los caracteres **-** y **()** para que concuerden con los numeros validos
 


