---
title: "Ordenar Colores"
date: "19 Jul 2024"
---

## Ordenar colores

Este problema consisten en dado un array con los numeros: 0, 1, 2. Ordenar el array sin crear uno nuevo tal que todos los ceros queden al principio, los unos enmedio y los 2 al final

### Solucion

```rb
# @param {Integer[]} nums
# @return {Void} Do not return anything, modify nums in-place instead.
def sort_colors(nums)
l = nums.length - 1
f = 0
i = 0
while i<= l
    if nums[i]==2
        nums[l], nums[i] = nums[i], nums[l]
        l-=1
    elsif nums[i]==0
        nums[f], nums[i] = nums[i], nums[f]
        f+=1
        i+=1
    else
     i+=1
    end 
end 
    
end
```
Este programa funciona con tres apuntadores, uno que iterara por todo el array, uno para indicar el principio de el array, el cual avanzara cada que se el primero encuentre un cero, pues intercambiaran lugares y significara que desde 0 hasta su posición -1 
todos los valores son 0, y el último, el cual cumple la misma función que el segundo pero de manera inversa, para el final de el array. 
