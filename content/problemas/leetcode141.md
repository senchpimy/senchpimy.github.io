---
title: "Linked List Cycle"
date: "14 Apr 2026"
tags: ["LeetCode", "String", "Hash Table", "Python"]
katex: true
---

## Ciclo de Lista Linkeada

El problema consiste en dada la cabeza de una lista linkeada encontrar si
existe un ciclo en la lista, es decir un si existen dos o mas nodos apuntando al mismo
nodo

## Solución

```py
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        s = set()
        while head != None:
            if head.val in s:
                return True
            s.add(head.val)
            head=head.next 
        return False       

```
Pero esta solucion solo funciona si cada valor de los nodos es diferente uno de los otros, no toma en cuenta los nodos
como objetos

