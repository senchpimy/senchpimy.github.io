---
title: "Search Index"
date: "21 Jun 2024"
---

## Search Index

Este problema consisten en implementar busqueda binaria

### Solucion

```rb
# @param {Integer[]} nums
# @param {Integer} target
# @return {Integer}
def search_insert(nums, target)
    izq = 0 
    der = nums.length
    while izq <= der
        mid = (izq+der)/2
        if nums[mid]==nil || mid == nil
            break
        end
        if nums[mid]<target
            izq+=1
        elsif nums[mid]>target
            der -=1
        else
            return mid
        end
    end
    izq
end
```
Solo que por algún motivo tenía que verificar que los dos valores no fueran nulos aunque cuando imprimia los valores en ningún momento estos eran nulos, y el input nunca era nulo, pero si quitaba esas 3 líneas el programa no funcionaba.

Esta es la solucion al problema 31 pero también funciona para el problema 704 aunque no es la optima
```rb
# @param {Integer[]} nums
# @param {Integer} target
# @return {Integer}
def search_insert(nums, target)
    izq = 0 
    der = nums.length
    while izq <= der
        mid = (izq+der)/2
        if nums[mid]==nil || mid == nil
            break
        end
        if nums[mid]<target
            izq+=1
        elsif nums[mid]>target
            der -=1
        else
            return mid
        end
    end
    -1
end
```
