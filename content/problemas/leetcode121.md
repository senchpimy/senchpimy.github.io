---
title: "Comprar y Vender"
date: "19 Jun 2023"
tags: ["LeetCode", "Array", "Dynamic Programming", "Python", "Algorithms"]
---
## Mejor Momento para Comprar y Vender

Este problema consiste en encontrar la máxima diferencia entre un mínimo y un máximo que aparezca después de ese mínimo.

Yo primero lo intenté por fuerza bruta, probando cada posibilidad hasta obtener la mayor, haciendo de mi solución O(N^2) y volviéndola bastante lenta.

### Solución

```python

 def solución(self, nums):
     max=0
     for i in range(len(nums)):
       for j in nums[i:]:
         if j-nums[i]>max:
             max=j-nums[i]
    return max

```

La solución recorre cada posible punto de compra y, para cada uno, revisa todos los días posteriores buscando la mayor ganancia.

Una mejor solución usa dos punteros y no necesita comparar todos los pares:

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        left = 0
        right = 1
        max_prof = 0
        cur_prof = 0

        while right < len(prices) :
            cur_prof = prices[right] - prices[left]
            if prices[right] - prices[right-1] > cur_prof:
                left = right-1
                continue
            max_prof = max(cur_prof, max_prof)
            right+=1

        return max_prof
```

Se mantiene un puntero `left` al mejor precio de compra y un puntero `right` que avanza. Si la ganancia usando el día anterior como compra es mayor, se mueve `left` a `right-1`. En caso contrario se actualiza la ganancia máxima. Así se recorre el arreglo una sola vez.
