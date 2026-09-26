---
title: "Prefijo más largo"
date: "08 Jun 2024"
tags: ["LeetCode", "String", "Ruby", "Algorithms"]
---
## Prefijo

Este problema consiste en dado un array de strings regresar el prefijo (los primeros caracteres) como string más largo que todos los strings de
el array tengan en común

### Solución

```ruby
# @param {String[]} strs
# @return {String}
def longest_common_prefix(strs)
  array = strs.shift
  prefix = ""
  array.split("").each_with_index do |char,index|
    strs.each do |str|
      if char != str[index]
        return prefix
      end
    end
  prefix += char
  end
  return prefix
end
```
Este programa toma el primer del array, luego por cada elemento restante del array va a comparar sus caracteres iniciales, y cuando detecta
que son diferentes entonces significa que se encontró el largo máximo del prefijo y se regresa el prefijo
