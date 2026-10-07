---
title: "Suma de Hojas Izquierdas"
date: "25 Sep 2026"
tags: ["LeetCode", "Tree", "Depth-First Search", "C++", "Algorithms"]
---
## Suma de Hojas Izquierdas

Este problema consiste en, dada la raíz de un árbol binario, regresar la suma de todas las hojas izquierdas. Una hoja es un nodo sin hijos, y una hoja izquierda es una hoja que además es el hijo izquierdo de su padre.

### Solución

```cpp
class Solution {
public:
    void iter(TreeNode* root, int& total) {
        TreeNode *izq = root->left;
        if (root->right)
            iter(root->right, total);
        if (!izq)
            return;
        if (izq->left == izq->right && izq->left == nullptr) { // es leaf
            total += izq->val;
            return;
        }
        iter(izq, total);
    }

    int sumOfLeftLeaves(TreeNode* root) {
        if (!root)
            return 0;
        int total = 0;
        iter(root, total);
        return total;
    }
};
```

La función principal maneja el árbol vacío y regresa el total acumulado. La función auxiliar `iter` revisa el hijo izquierdo del nodo actual: si el subárbol derecho existe, lo recorre primero; si no hay hijo izquierdo, no hay nada que sumar. Si el hijo izquierdo es una hoja (sus dos hijos son nulos), se suma su valor y se detiene esa rama; en caso contrario, se sigue recorriendo el subárbol izquierdo. Así solo se suman los nodos que son hojas y a la vez hijos izquierdos.
