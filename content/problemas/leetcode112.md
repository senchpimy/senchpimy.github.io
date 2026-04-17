---
title: "Path Sum"
date: "17 Apr 2026"
tags: ["LeetCode", "Tree", "Python"]
---
## Path Sum

Dado un árbol y un valor encontrar si existe una ruta
de la raíz a una hoja (la hoja siendo un nodo sin hijos)
que sume al valor dado.

Esta fue mi primera solución:

```py
class Solution:
    def recur(self, node,state):
        if node is None:
            return
        state += node.val
        if node.left is None and node.right is None:
            if state == self.obj:
                self.res = True
        self.recur(node.left,state)
        self.recur(node.right,state)
        
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        self.obj = targetSum
        self.res = False
        self.recur(root,0)
        return self.res
        
```

Es una simple búsqueda en profundidad (DFS), que guarda el resultado
y activa una variable cuando lo encuentra, pero noté que cuando es verdadero
se pueden detener todas las demás búsquedas ya que ya encontró el valor, así quedó la segunda iteración:

```py
class Solution:
    def recur(self, node,state):
        if self.res:
            return
            
        if node is None:
            return
        state += node.val
        if node.left is None and node.right is None:
            if state == self.obj:
                self.res = True
                return
        self.recur(node.left,state)
        self.recur(node.right,state)
        
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        self.obj = targetSum
        self.res = False
        self.recur(root,0)
        return self.res
```

Solamente verifica si ya se encontró el valor y termina la búsqueda, ambos resultados tuvieron un tiempo de 0ms,
la mejora se notó en la memoria, uso ~0.2 menos MB
