---
title: "Arbol Simetrico"
date: "26 Jun 2026"
tags: ["LeetCode", "Tree", "Python", "Algorithms"]
---
## Symmetric Tree

Este problema consiste en regresar un booleano que describe si un árbol es simétrico, es decir, los valores de la derecha
de un árbol son iguales a los valores de la izquierda del otro

### Solución

```python
class Solution(object):

    def isSymmetric(self, root):
        """
        :type root: Optional[TreeNode]
        :rtype: bool
        """
        def comprobar(arr1, arr2):
            if len(arr1) == len(arr2)==0:
                return
            if len(arr1) != len(arr2):
                return False
            n1 = []
            n2 = []
            for izq,der in zip(arr1,arr2):
                if (izq is None) != (der is None):
                    return False
                if izq and der:
                    if izq.val != der.val:
                        return False
                    n1.append(izq.left)
                    n1.append(izq.right)
                    n2.append(der.right)
                    n2.append(der.left)

            return comprobar(n1,n2)
        izq = [root.left]
        der = [root.right]
        res = True 
        if  comprobar(izq,der) == False:
            res = False

```
Este problema lo resolví pensando en que es un problema de BFS, entonces por cada nivel del árbol
verificaba si los valores eran iguales, y si los nodos eran válidos, luego los guardaba al revés para
comprobar si eran simétricos, este problema funcionó, pero era muy lento, una solución más rápida sería
la siguiente:

```python
class Solution(object):
    def isSymmetric(self, root):
        """
        :type root: Optional[TreeNode]
        :rtype: bool
        """
        def isRevSubTree(p,q):
            if not p and not q: return True
            if (p and not q) or (q and not p): return False
            if (p.val == q.val): return (isRevSubTree(p.left,q.right) and isRevSubTree(p.right,q.left))
            else: return False
        
        if not root: return True
        return isRevSubTree(root.left, root.right)

```

Esta solución lo ve como un problema DFS, por lo que se ahorra el insertar los nodos en listas, pero hace las mismas verificaciones
