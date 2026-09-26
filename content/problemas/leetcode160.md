---
title: "Intersection of Two Linked Lists"
date: "02 Jul 2026"
tags: ["LeetCode", "Linked List", "Python", "Algorithms"]
---
## Intersección de dos listas ligadas

Este problema consiste en verificar si dos listas tienen un nodo en común
 
### Solución


```python
# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution(object):
    def getIntersectionNode(self, headA, headB):
        """
        :type head1, head1: ListNode
        :rtype: ListNode
        """
        l1, l2 = headA, headB

        while l1!=l2:
            l1 = l1.next if l1 else headB
            l2 = l2.next if l2 else headA
        return l1
```

Esta solución consiste en tener dos "punteros", uno al principio de cada lista, y se avanza uno por uno, en donde si ambos son de la misma longitud y si ambos no están conectados, 
cuando lleguen al final el valor será None y se regresará None, el resultado correcto, si están conectados en un punto X, si esta
unión está a la misma distancia de la cabeza entonces llegarán al mismo tiempo, si uno está más cerca de la cabeza que el otro, el más corto comenzará en la cabeza del otro, y cuando el otro termine
y comience en la cabeza del anterior, estarán a la misma distancia del punto pues el primero avanzó la diferencia que existe y si existe una unión llegarán a ella al mismo tiempo,
si no entonces llegarán ambos a null, la condición se cumple y se regresa el valor correcto
