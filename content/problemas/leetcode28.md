---
title: "Índice de la primera Ocurrencia"
date: 2024-06-10
tags: ["LeetCode", "String", "Ruby", "Algorithms"]
---
## Índice de la Primera Ocurrencia

Este problema consiste en, dados dos strings, regresar el índice de la primera ocurrencia de un string dentro de otro.

### Solución

```rb
# @param {String} haystack
# @param {String} needle
# @return {Integer}
def str_str(haystack, needle)
    if needle==""
        return 0
    end
    limit = haystack.length + 1 - needle.length 
    (0..limit).each do |i|
        (0..needle.length).each do |j|
            if haystack[i+j] != needle[j]
                break
            end
            if j == (needle.length - 1)
                return i
            end
        end

    end
    return -1
end
```
Este programa primero calcula hasta dónde sería posible encontrar el string a encontrar por su longitud dentro del string en el cual buscar. Luego lo recorre e intenta comparar cada uno de los caracteres; si se han logrado comparar todos los caracteres del
segundo string, entonces se ha encontrado el segundo string y se regresa el índice.

Esta solución funciona pero, en comparación a las demás respuestas enviadas, es muy lenta y ocupa mucha memoria, así que usando la función ya integrada en el lenguaje para hacer esto se obtiene el siguiente código:

```rb
# @param {String} haystack
# @param {String} needle
# @return {Integer}
def str_str(haystack, needle)
    return haystack.index(needle) != nil ? haystack.index(needle):-1
end
```
Que usa la función `index` para encontrar el índice, y si no se encuentra entonces se regresa -1. Pero aun así no cambió mucho el uso de memoria ni de velocidad, entonces pensé que tal vez no se optimizaba el llamado a la función y esta terminaba llamándose 2 veces, así que solo guardé el resultado
y lo intenté de nuevo:

```rb
# @param {String} haystack
# @param {String} needle
# @return {Integer}
def str_str(haystack, needle)
result = haystack.index(needle)
return result != nil ? result:-1
end
```

Solo con hacer este cambio, la velocidad y uso de memoria pasaron de estar en el top ~60% con los dos ejemplos anteriores hasta estar en el top ~20% en velocidad y ~5% en memoria.
