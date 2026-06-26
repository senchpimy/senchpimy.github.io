---
title: "Arbol Simetrico"
date: "26 Jun 2026"
tags: ["LeetCode", "Tree", "python", "Algorithms"]
---
## Problema

Este problema consisten en regresar un booleano que describe si un arbol es simetrico, es decir, los valores de la derecha
de un arbol son iguales a los valores de la izquierda del otro

### Solucion

```py
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
Este problema lo resolvi pensando en que es un problema de BFS, entonces por cada nivel del arbol
verificaba si los valores eran iguales, y si los nodos eran validos, luego los guardaba al reves para
comprobar si eran simetricos, estre problema funciono, pero era muy lento, una solucion más rapida seria
la siguiente:

```py
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

Esta solucion lo ve como un problema DFS, por lo que se ahorra el insertar los nodos en listas, pero hace las mismas verificaciones
