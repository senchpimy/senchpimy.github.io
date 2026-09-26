---
title: "Anagrama"
date: "17 Jun 2024"
tags: ["LeetCode", "Hash Map", "String", "Algorithms"]
---
## Anagrama

Este problema consiste en dado una lista de palabras regresar una lista de listas de palabras que sean anagramas entre sí

### Solución
Este problema se soluciona primero iterando por cada palabra del array y ordenándola, luego esta se añade en un hashmap donde la llave es la palabra ordenada y el valor es un array que contiene esta palabra, array que se expandirá si 
al ordenar otra palabra de la lista original esta coincide con la llave.

Finalmente se itera por el hashmap y cada valor del hashmap se agrega a una nueva lista que se regresa.

Mi primera solución fue la siguiente

```ruby
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

Pero era muy lenta en comparación a otras soluciones, que al revisarlas noté que lo único que cambiaban era en los métodos que usaban, no en el algoritmo,
primero noté que usaban **<<** como forma de ingresar datos en una lista en lugar de **.push(x)** al cambiarlo fue un poco más lento, también noté que en el
último punto, en el momento de insertar los datos en una nueva lista, estos iteraban sobre las llaves y accedían a los valores en lugar de iterar entre los
valores directamente, así que lo cambié

Siendo la solución final la siguiente
```ruby
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

Esta solución está en el top 5% en velocidad y 50% en la memoria, lo que me hizo revisar las mejores soluciones en memoria y me encontré con la siguiente:

```ruby
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
