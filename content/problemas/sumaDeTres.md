---
title: "Suma De Tres"
date: "02 Jul 2024"
---
## Suma de Tres

 Este problema consiste en encontrar cada posible combinacion de 3 numeros sin prepetirse tal que la suma de estos 3 numeros sea igual a 0
 
### Solucion

```rb
# @param {Integer[]} nums
# @return {Integer[][]}
def three_sum(nums)
    nums = nums.sort
    len = nums.length-1
    prev = nil
    result = []
    for i in 0..len do 
        next if i>0 && nums[i-1] == nums[i]
        to_search = -nums[i]
        left=i+1
        right = len
            while left < right
                current = nums[left]+nums[right]
                if current == to_search
                    result << [nums[i], nums[left], nums[right]]
                    left+=1
                    while nums[left]==nums[left-1] and left<right
                        left+=1
                    end
                elsif current > to_search
                    right-=1
                else
                    left+=1
                end
            end
    end
    result
end
```
Este programa primero ordena la lista, luego usa el algoritmo que se usa en sumaDos para buscar dos numeros que sumados den un numero objetivo,
en este caso el opuesto del numero que se está buscando actualmente.

Pero en este caso como estamos buscando todas las posibilidades diferentes entonces tomar en cuenta que se repitan varios 
valores entonces para encontrar cada posible dato diferente debemos mover el último indice hasta que el último valor sea diferente
