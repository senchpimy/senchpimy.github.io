---
title: "Valor Máximo Después de Separar"
date: "22 Dec 2023"
tags: ["LeetCode", "String", "Ruby", "Algorithms"]
---
## Valor Máximo Después de Separar

Este problema consiste en que dado un string de unos y ceros encontremos el valor máximo que se puede obtener después de separar el string en 2 y sumar la cantidad de 0's de un lado con la cantidad de 1's del otro.


### Solución

```ruby
# @param {String} s
# @return {Integer}
def max_score(s)
  s = s.split("")
  izq = 0
  der = 0
  s.each{|c|
  if c == "1"
    der=der+1
  end
  }
  max = der-1
s.pop()
 s.each{|c|
  if c == "0"
    izq=izq+1
  end
    if c == "1"
      der=der-1
  end
    if der+izq > max
      max = der+izq
    end
  } 
  return max

end
```

La solución consiste en buscar el valor total de los caracteres en un lado y después volver a iterar en el string actualizando las posibles soluciones y solo tenemos que encontrar el valor máximo
