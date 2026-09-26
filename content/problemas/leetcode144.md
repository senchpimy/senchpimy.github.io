---
title: "Recorrido Preorden de un Árbol Binario"
date: "25 Sep 2026"
tags: ["LeetCode", "Tree", "Depth-First Search", "C++", "Algorithms"]
---
## Recorrido Preorden de un Árbol Binario

Este problema consiste en, dada la raíz de un árbol binario, regresar el recorrido preorden de los valores de sus nodos.

El recorrido preorden visita primero el nodo actual, luego el subárbol izquierdo y finalmente el subárbol derecho.

### Solución

```cpp
void iter(TreeNode *root, vector<int>& vec) {
    if (!root)
        return;

    vec.push_back(root->val);
    if (root->left) {
        iter(root->left, vec);
    }

    if (root->right) {
        iter(root->right, vec);
    }
}

class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        std::vector<int> v;
        iter(root, v);
        return v;
    }
};
```

La función auxiliar `iter` aplica recursividad: primero agrega el valor del nodo actual al vector, después recorre el hijo izquierdo y finalmente el hijo derecho. Cuando el nodo es nulo se detiene. La función principal solo inicializa el vector y llama a `iter`.
