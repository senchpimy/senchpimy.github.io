---
title: "Más uno"
date: "19 Jun 2024"
---

## Más uno
El problema consiste que dado una lista que consiste en enteros y se supone que está lista representa un entero en total, y el problema consiste en sumarle uno a este gran numero

## Solucion

Vamos a iterar la lista de forma inversa y le vamos a sumar 1 a el primer valor que sea diferente a 9 y regresamos la lista, en caso de que sea 9 lo convertimos en 0 y seguimos buscando uno que sea diferente a 9


```rb
# @param {Integer[]} digits
# @return {Integer[]}
def plus_one(digits)
  len = digits.length()-1
  while len>=0
    if digits[len]==9
        digits[len]=0
        len=len-1
    else
      digits[len]=digits[len]+1
      return digits
    end
  end
    digits.unshift(1)
  return digits
end
```
