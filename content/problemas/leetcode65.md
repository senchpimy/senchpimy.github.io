---
title: "Número Válido"
date: "29 Jun 2023"
tags: ["LeetCode", "String", "Regex", "Algorithms"]
---
## Número Válido



 Este problema consiste en regresar todos los números en un texto que cumpla con una serie de características que lo verifican como un número de teléfono válido, ejemplos podrían ser los siguientes
   

  

**987-123-4567**
  

**(123) 456-7890**

### Solución


```bash
 grep -e "^[0-9]\{3\}\-[0-9]\{3\}\-[0-9]\{4\}$" -e "^([0-9]\{3\}) [0-9]\{3\}\-[0-9]\{4\}$" file.txt
```
 

 En este vez usamos expresiones regulares para poder buscar las ocurrencias, con grep buscamos estas equivalencias, con los símbolos **^** y **$**
 decimos que seleccionamos todos los caracteres en una línea, con el texto **[0-9]** decimos que el carácter en esa posición puede ser un valor desde el 0 hasta el 9
 y con **{3}** hace que encuentre 3 caracteres de concuerden con el carácter anterior, y como el carácter anterior es un número entre 0 y 9, luego repetimos este patrón 
 y agregamos los caracteres **-** y **()** para que concuerden con los números válidos
 


