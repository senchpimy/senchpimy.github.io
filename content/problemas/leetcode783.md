---
title: "Minimum Distance Between BST Nodes"
date: "07 Jul 2026"
tags: ["LeetCode", "Mathematics","Python", "Algorithms"]
katex: true
---

## Minimum Distance Between BST Nodes

Dada la raíz de un árbol binario, encuentra la diferencia mínima entre cualquiera sean dos nodos

### Solución

```python
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def minDiffInBST(self, root):
        self.min = 9999999999999
        self.s = set()
        def evaluate(root):
            v = root.val
            self.s.add(v)
            if root.left:
                evaluate(root.left)
            if root.right:
                evaluate(root.right)
        
        evaluate(root)
        for i in self.s:
            for j in self.s:
                if abs(i-j)!=0:
                    self.min=min(abs(i-j), self.min)

        return self.min
        """
        :type root: Optional[TreeNode]
        :rtype: int
        """

```

Esta solución es tiene una complejidad de n^2, por lo que no es eficiente, obtiene todos los valores y encuentra la diferencia mínima restándolos uno entre otros,
una mejor solución es la siguiente:

```python
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def minDiffInBST(self, root):
        self.min = float("inf")
        self.prev = None
        def evaluate(root):
            if not root:
                return
            
            evaluate(root.left)
            if self.prev:
                self.min = min(self.min, root.val-self.prev.val)
            self.prev = root
            evaluate(root.right)
        
        evaluate(root)

        return self.min
```

Este problema aprovecha que es un árbol binario para restar solo los números con sus valores adyacentes, pues no puede haber una diferencia menor entre nodos que estén más lejos que un nivel


## Comentarios

Este problema es exactamente el mismo que Leetcode 530
