---
title: "Minimum Depth of Binary Tree"
date: "17 Apr 2026"
tags: ["LeetCode", "Tree", "Python"]
---

Este problema consiste en que, dado un árbol, se debe encontrar la profundidad mínima a la hoja más cercana (siendo una hoja un nodo sin hijos). Mi solución consistió en llevar un conteo entre cada búsqueda; es una solución de búsqueda en profundidad donde, cuando se encuentra un resultado, se regresa y cada nodo solo devuelve el menor resultado, por lo que al final se obtiene la profundidad mínima.

```py
class Solution:
    def recur(self,node,val):
        if node is None:
            return 99999999999999
        val = val+1
        if node.left is None and node.right is None:
            return val
        d1 = self.recur(node.left,val)
        d2 = self.recur(node.right, val)
        return min(d1,d2)
    def minDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        return self.recur(root,0)
```
