---
title: "Indice de la primera Ocurrencia"
date: 2024-06-10
---

## Indice de la Primera Ocurrencia

Este problema consisten en dados dos strings regresar el indice de la primera ocurrencia de un string dentro de otro

### Solucion

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
Este programa primero calcula hasta dode sería posible encontrar el string encontrar por su longitud dentro de el string en cual buscar, luego lo recorre e intenta comparar cada uno de los caracteres, si se han logrado comparar todos los caracteres de el
segundo string entonces se ha encontrado el segundo string y se regresa el indice

Esta solucion funciona pero en comparación a las demás respuestas enviadas es muy lenta y ocupa mucha memoria asi que usando la función ya integrada en el lenguaje para hacer esto se obtiene el siguiente código

```rb
# @param {String} haystack
# @param {String} needle
# @return {Integer}
def str_str(haystack, needle)
    return haystack.index(needle) != nil ? haystack.index(needle):-1
end
```
Que usa la función indice para encontrar el indice y si no se encuentra el indice entonces se regresa -1, pero aun asi no cambio mucho el uso de memoria ni de velociada entonces pensé que tal vez no se optimizaba el llamado a la funciion y está terminaba llamandose 2 veces, asi que solo guarde el resultado
y lo intente de nuevo:

```rb
# @param {String} haystack
# @param {String} needle
# @return {Integer}
def str_str(haystack, needle)
result = haystack.index(needle)
return result != nil ? result:-1
end
```

Solo con hacer este cambio la velocidad y uso de memoria pasaron de estar en el top ~60% con los dos ejemplos anteriores hasta estar en el top ~20% en velocidad y \~5% en memoria 
