---
title: "Arbol Binario Balanceado"
date: "02 Jul 2026"
tags: ["LeetCode", "Tree", "Python", "Algorithms"]
---
## Balanced Binary Tree

Este problema consisten en regresar un booleano que describe si un arbol binario esta balanceado, es decir
si la diferencia entre todas sus hojas no es mayor que 1

### Solución

```python
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isBalanced(self, root):
        """
        :type root: Optional[TreeNode]
        :rtype: bool
        """
        self.res = True
        def transver(root):
            v = None
            y = None
            if root is None or not self.res:
                return 0

            v = transver(root.left)
            y = transver(root.right)

            
            if abs(v-y) >1:
                    self.res = False
            return max(v,y)+1
                
        transver(root)
        return self.res

```
Esta solucion es DFS, es decir primero busca el nodo más profundo y luego regresa su nivel de profundidad, y la compara con la profundidad de los otros nodos
