---
title: "Search Index"
date: "21 Jun 2024"
tags: ["LeetCode", "Binary Search", "Ruby", "Algorithms"]
---
## Search Index

Este problema consiste en implementar búsqueda binaria.

### Solución

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
Solo que por algún motivo tenía que verificar que los dos valores no fueran nulos aunque, cuando imprimía los valores, en ningún momento estos eran nulos, y el input nunca era nulo; pero si quitaba esas 3 líneas el programa no funcionaba.

Esta es la solución al problema 35 pero también funciona para el problema 704 aunque no es la óptima:
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
