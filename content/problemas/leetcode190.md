---
tags: ["LeetCode", "Hash Table", "Python", "Algorithms"]
title : 'Patrón de Palabras'
date : "2026-04-20"
---

# Word Pattern

Dado un string "patrón" y un string "s", encontrar si
*s* cumple el patrón dado. Ejemplo:

 pattern = "abba", s = "dog cat cat dog"

 ## Solución

 ```py
 class Solution(object):
    def wordPattern(self, pattern, s):
        """
        :type pattern: str
        :type s: str
        :rtype: bool
        """
        d = {}
        pat_idx = 0
        s_idx = 0
        pat_l = len(pattern)
        s = s.split()
        s_l = len(s)
        if pat_l != s_l: return False
        while pat_idx < pat_l and s_idx < s_l :
            c = pattern[pat_idx]
            pat_idx+=1
            w = s[s_idx]
            s_idx +=1
            if c in d.keys():
                old_word=d[c]
                if old_word != w:
                    return False
            else:
                if w in d.values(): return False
                d[c]=w
            
                
        return True
 ```

 Este problema guarda cada palabra y la asocia con 
 su equivalente en el patrón. Si la palabra ya se encuentra con
 otra letra, entonces no es válido; así como
 si el equivalente en el patrón no coincide con
 la letra ya guardada, entonces tampoco
 sigue el patrón.
