---
tags: ["LeetCode", "Math", "Python", "Algorithms"]
title : 'Número Feliz'
date : "2026-04-20"
---

# Happy Number

Encontrar si un número es "feliz", es decir, si
se suman los cuadrados de los dígitos repetidamente, en
algún punto nos da 1.


 ## Solución

 ```py
 class Solution(object):
    def isHappy(self, n):
        """
        :type n: int
        :rtype: bool
        """
        s = set()
        while True:
            new_n = 0
            while n > 0:
                d = n % 10
                cuadrado = d * d
                new_n += cuadrado
                n  = n//10
            if new_n == 1:
                return True
            if new_n in s:
                return False
            n = new_n
            s.add(new_n)
 ```
Este problema guarda los números en un set, por lo que si
ya está un número en la lista, entonces se encontró un
bucle y el número no es feliz.
