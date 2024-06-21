---
title: "Busqueda Binaria"
date: "17 Jun 2023"
---

## Busqueda Binaria



 Este problema consiste en implementar la busqueda binaria
 
### Solucion


```rb
# @param {Integer[]} nums
# @param {Integer} target
# @return {Integer}
def search(nums, target)
    izq = 0 
    der = nums.length-1
    until izq > der
        mid = izq + (der - izq) / 2
        if nums[mid]==target
            return mid
        elsif nums[mid]<target
            izq=mid +1
        else nums[mid]>target
            der =mid -1
        end
    end
    -1
end
```
