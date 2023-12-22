+++
title = 'Valor Maximo Despues De Separar'
date = 2023-12-22T07:13:23-06:00
+++

## Valor Maximo Despues De Separar

Este problema consiste en que dado un string de unos y ceros encontremos el valor maximo que se puede obtener despues de separa el string en 2 y sumar la cantidad de 0's de un lado con la cantidad de 1's de el otro.


### Solucion

```rb
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

La solucion consiste en buscar el valor total de los caracteres en un lado y despues volver a iterar en el string actualizando las posibles soluciones y solo tenemos que encontrar el valor maximo
