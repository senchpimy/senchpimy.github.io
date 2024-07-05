---
title: "Combinar Array Ordenado"
date: "03 Jul 2023"
---

## Conbinar Array Ordenado

Este problema consisten en combinar dos arrays que estan ordenados

### Solucion

Primero intente esto pues pense que podria funcionar:

```rb
# @param {Integer[]} nums1
# @param {Integer} m
# @param {Integer[]} nums2
# @param {Integer} n
# @return {Void} Do not return anything, modify nums1 in-place instead.
def merge(nums1, m, nums2, n)
    return if n == 0
    sec_i = 0
    tmp = nil
    0.upto(m) do |i|
        break if sec_i==n
        end
        if nums1[i]>nums2[sec_i]
            tmp = nums1[i]
            nums1[i]=nums2[sec_i]
            nums2[sec_i]=tmp
            sec_i+=1
        else
            next
        end
    end
    nums2 = nums2.sort
    i = 0 
    m.upto(m+n-1) do |j|
        nums1[j] = nums2[i]
        i+=1
    end
end
```
Esta funcion ingresa correctamente en orden creciente los elementos de nums2 en nums1 y funciona cuando m>=n,

La respuesta correcta es la siguiente:

```rb
# @param {Integer[]} nums1
# @param {Integer} m
# @param {Integer[]} nums2
# @param {Integer} n
# @return {Void} Do not return anything, modify nums1 in-place instead.
def merge(nums1, m, nums2, n)
    return if n == 0
    len1 = nums1.length
    end_idx = len1-1
    while n > 0 && m > 0
        if nums2[n-1] >= nums1[m-1]
            nums1[end_idx] = nums2[n-1]
            n-=1
        else
            nums1[end_idx] = nums1[m-1]
            m-=1
        end
        end_idx-=1
    end
    while n > 0
        nums1[end_idx] = nums2[n-1]
        n-=1
        end_idx-=1
    end
end
```

Como el array nums1 tiene al final una serie de 0s el cual se tiene que llenar, se pueden recorrer ambos arrays en reversa con dos apuntadores apuntando al final de cada array y agregar el mayor de el final de cada uno y recorrer el apuntador en el array del elemento que se agrego.
