---
title: "Recorrido Inorder de Árbol Binario"
date: "16 Aug 2026"
tags: ["LeetCode", "Tree", "Python", "Rust", "Algorithms"]
---
## Binary Tree Inorder Traversal

Este problema consiste en, dado un árbol binario, regresar una lista con los valores de sus nodos recorridos en orden *inorder*: primero el subárbol izquierdo, luego el nodo, y al final el subárbol derecho.

### Solución

Mi primer intento fue una función recursiva auxiliar que recorre primero el nodo izquierdo, agrega el valor del nodo actual y después el nodo derecho:

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def act(node, l):
    if node.left:
        act(node.left, l)
    l.append(node.val)
    if node.right:
        act(node.right, l)

class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        res = []
        act(root, res)
        return res
```

Funciona, pero el problema tiene un detalle importante: los nodos son `Optional`, por lo que hay que manejar el caso de que el árbol esté vacío de forma explícita (`if not root`) y no se puede acceder a `node.left` sin antes saber que `node` existe.

La misma solución en Rust obliga a ser más explícito con la recursión, ya que los nodos se envuelven en `Option<Rc<RefCell<TreeNode>>>`. Se clona el puntero del hijo con `Rc::clone` al hacer la llamada recursiva y se presta el nodo con `borrow()` para poder leer sus campos:

```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn act(node: Rc<RefCell<TreeNode>>, v: &mut Vec<i32>) {
        let node = node.borrow();
        if let Some(left) = &node.left {
            Self::act(Rc::clone(&left), v);
        }
        v.push(node.val);

        if let Some(right) = &node.right {
            Self::act(Rc::clone(&right), v)
        }
    }

    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut v = vec![];
        if let Some(node) = root {
            Self::act(node, &mut v)
        }
        v
    }
}
```

La clave del recorrido *inorder* es el orden de las tres operaciones: primero se desciende por la izquierda hasta llegar al nodo más profundo, se agrega su valor, y luego se sube procesando la derecha. Así se visitan los nodos en orden ascendente si el árbol es un árbol binario de búsqueda.
