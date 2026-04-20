---
title: "Excel Sheet Column Name"
date: "20 Jun 2024"
tags: ["LeetCode", "Linked List", "Ruby", "Algorithms"]
---

Este problema consiste en dado un numero, regresar el equivalente a notacion de *Excel*, es decir
A->1
B->2
C->3
...
Z->26
AA->27
AB->28

Es decir convertir el numero a base 26 usando las letras del abecedario, esta fue mi solucion:

```py
class Solution:
    def convertToTitle(self, n: int) -> str:
        fin = ""
        while n > 0:
            n-=1
            l = n % 26
            res = n // 26
            c = chr(65+l)
            fin += c
            n = res
            #n-=1
        return fin[::-1]
```

primero obtenemos el valor que vamos a poner, de atras hacia delante
