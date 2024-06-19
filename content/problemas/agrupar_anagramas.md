---
title: "Anagrama"
date: "17 Jun 2024"
---

## Anagrama

Este problema consisten en dado una lista de palabras regresar una lista de listas de palabras que sean anagramas entre si

### Solucion
Este problema se soluciona primero iterando por cada palabra de el array y ordenandola, luego esta se añade en un hashmap donde la llave es la palabra ordenada y el valor es un array que contiene esta palabra, array que se expandira si 
al ordenar otra palabra de la lista original esta coincide con la llave.

Finalmente se itera por el hashmap y cada valor de el hashmap se agrega a una nueva lista que se regresa.

Mi primera solucion fue la siguiente

```rb
# @param {String[]} strs
# @return {String[][]}
def group_anagrams(strs)
   m = Hash.new
    strs.each do |str|
        sorted = str.chars.sort.join
        if m.has_key?(sorted)
            m[sorted].push(str)
        else
            m[sorted] = [str]
        end
    end
    result = []
    m.each_value do |value|
        result.append(value)
    end
    return result
end
```

Pero era muy lenta en comparacion a otras soluciones, que al revisarlas note que lo unico que cambiaban era en los metodos que usaban, no en el algoritmo,
primero note que usaban **<<** como forma de ingresar datos en una lista en lugar de **.push(x)** al cambiarlo fue un poco mas lento, tambien note que en el
ultimo punto, en el momento de insertar los datos en una nueva lista, estos iteraban sobre las llaves y accedian a los valores en lugar de iterar entre los
valores directamente, asi que lo cambie

Siendo la solucion final la siguiente
```rb
# @param {String[]} strs
# @return {String[][]}
def group_anagrams(strs)
   m = Hash.new
    strs.each do |str|
        sorted = str.chars.sort.join
        if m.has_key?(sorted)
            m[sorted]<<str
        else
            m[sorted] = [str]
        end
    end
    result = []
    m.keys.each do |k|
        result<<m[k]
    end
    return result
end
```

Esta solucion esta en el top 5% en velocidad y 50% en la memoria, lo que mie hizo revisar las mejores soluciones en memoria y me encontre con la siguiente:

```rb
# @param {String[]} strs
# @return {String[][]}
def group_anagrams(strs)
    hash = Hash.new { |h, k| h[k] = [] }

    strs.each do |str|
        hash[str.chars.sort.hash] << str
    end

    hash.values
end
```
