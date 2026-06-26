---
title: "Convertir Lista Ordenada a Arbol Binario"
date: "30 Jun 2024"
tags: ["LeetCode", "Tree", "Python", "Algorithms"]
---
## Problema

Este problema consiste dada una lista ordenada, regresar un arbol armado de esa lista, este arbol debe 
de estar balanceado de altura

### Solucion

```py
class Solution(object):
    def sortedArrayToBST(self, nums):
        """
        :type nums: List[int]
        :rtype: Optional[TreeNode]
        """
        def ordenar(l,r):
            if l > r:
                return None
            m = (l+r)//2
            node = TreeNode(nums[m])
            node.left = ordenar(l,m-1)
            node.right = ordenar(m+1, r)
            return node
        n = len(nums)
        r = n-1
        return ordenar(0,r)
        
```
Este problema se resuelve dividendo el array en listas más pequeñas hasta encontrar la solucion,
en donde la mitad del array se vuelve un nodo y cada rama del arbol recurre el mismo proceso
en donde si esta a la mitad s evuelve un nodo automaticamente y dado ese punto, los que estan a la
izquierda se vuelven la izquierda del nodo y los de la derecha se vuelven la derecha del nodo
