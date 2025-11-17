---
title: "Anagrama"
date: "08 Jun 2023"
---

## Anagrama

Este problema consisten en dado un array en donde cada elemento representa la temperatura en un dia, regresar otro array que contenga cuantos dias faltan para que se tenga una temperatura mayor

### Solucion

My primera solución O(n^2) fue la siguiente
```rb
# @param {Integer[]} temperatures
# @return {Integer[]}
def daily_temperatures(temp)
    tot = []
    len = temp.length-1
    temp.each_with_index do |val,index|
        n = 0
        l = nil
        index.upto(len) do |i|
            break if temp[i]>val
            n+=1
            l = i
        end
        n = 0 if l == len
        tot<<n
    end
    tot 
end
```

Pero era muy tardada, entonces la solución es la siguiente

```rb
# @param {Integer[]} temperatures
# @return {Integer[]}
def daily_temperatures(temp)
    len = temp.length-1
    #tot = Array.new(len+1, 0)
    index_s = []
    temp.each_with_index do |val, i |
        while !index_s.empty? && val>temp[index_s.last]
            index = index_s.pop
            temp[index] = (i-index)
        end
        index_s<<i
    end
    index_s.each { |index| temp[index] = 0 }
    temp
end
```

Esta solución solo crea nueva memoria para un stack el cual guarda la información del indice el cual todavía no se encuentra un dia con una temperatura mayor, automáticamente
el array se va a ordenar de forma descendiente y cuando se encuentra un valor que es mayor se hace la resta de los indices y se agrega al array de temperaturas para evitar crear un nuevo array
