---
title: "Intersection of Two Linked List"
date: "02 Jul 2026"
tags: ["LeetCode", "Linked List", "Python", "Algorithms"]
---
## Interseccion de dos listas ligadas

Este problema consisten en verificar si dos listas tienen un nodo en comun
 
### Solucion


```py
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

Esta solucion consiste en tener dos "punteros", uno al principio de cada lista, y se avanza uno por uno, en donde si ambos son de la misma longitud y si ambos no estan conectados, 
cuando lleguen al final el valor sera None y se regresara None, el resultado correcto, si estan conectados en un punto X, si esta
union esta a la misma distancia de la cabeza entonces llegaran al mismo tiempo, si uno esta más cerca de la cabeza que el otro, el más corto comenzara en la cabeza del otro, y cuando el otro termine
y comience en la cabeza del anterior, estaran a la misma distancia del punto pues el primero avanzo la diferencia que existe y si existe una union llegaran a ella al mismo tiempo,
si no entonces llegaran ambos a null, la condicion se cumple y se regresa el valor correcto
