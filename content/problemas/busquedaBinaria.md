---
title: "Busqueda Binaria"
date: "17 Jun 2023"
---

## Busqueda Binaria



 Este problema consiste en implementar la busqueda binaria
 
### Solucion


```py
 class Solution(object):
     def search(self, nums, target):
        principio = 0
        final = len(nums)
        while True:
            total=int((final-principio)/2)+principio
            val = nums[total]
        print(val, final, principio)
        if val==target:
            return total
        elif val
```

