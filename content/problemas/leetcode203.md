---
title: "Eliminar Elementos de una Lista Ligada"
date: "25 Sep 2026"
tags: ["LeetCode", "Linked List", "C++", "Algorithms"]
---
## Eliminar Elementos de una Lista Ligada

Este problema consiste en, dada la cabeza de una lista ligada y un entero `val`, eliminar todos los nodos de la lista cuyo valor sea igual a `val` y regresar la nueva cabeza de la lista.

### Solución

```cpp
class Solution {
public:
    ListNode* removeElements(ListNode* head, int val) {
        while (head && head->val == val)
            head = head->next;

        ListNode* ans = head;
        while (ans && ans->next) {
            if (ans->next->val == val)
                ans->next = ans->next->next;
            else
                ans = ans->next;
        }
        return head;
    }
};
```

Primero se eliminan los nodos del inicio que tengan el valor buscado, avanzando la cabeza. Después se recorre la lista con un apuntador `ans`: si el siguiente nodo tiene el valor, se salta enlazando `ans->next` con el siguiente del siguiente; en caso contrario se avanza. Finalmente se regresa la cabeza actualizada.
