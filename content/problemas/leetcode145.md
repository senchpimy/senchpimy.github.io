---
title: "Recorrido Postorden de un Árbol Binario"
date: "25 Sep 2026"
tags: ["LeetCode", "Tree", "Depth-First Search", "C++", "Algorithms"]
---
## Recorrido Postorden de un Árbol Binario

Este problema consiste en, dada la raíz de un árbol binario, regresar el recorrido postorden de los valores de sus nodos.

El recorrido postorden visita primero el subárbol izquierdo, luego el subárbol derecho y finalmente el nodo actual.

Por ejemplo, para el árbol `[1, null, 2, 3]` el resultado es `[3, 2, 1]`.

### Solución

```cpp
void iter(TreeNode *root, vector<int>& vec) {
    if (!root)
        return;

    if (root->left) {
        iter(root->left, vec);
    }

    if (root->right) {
        iter(root->right, vec);
    }
    vec.push_back(root->val);
}

class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        std::vector<int> v;
        iter(root, v);
        return v;
    }
};
```

La función auxiliar `iter` aplica recursividad: primero recorre el hijo izquierdo, después el hijo derecho y al final agrega el valor del nodo actual al vector. Cuando el nodo es nulo se detiene. La función principal solo inicializa el vector y llama a `iter`.
