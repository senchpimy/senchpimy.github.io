---
title: "Unique Morse Code Words"
date: "07 Jul 2026"
tags: ["LeetCode", "Mathematics","Python", "Algorithms"]
katex: true
---

## Unique Morse Code Words

Este problema consiste en dado un array con palabras encontrar su traducción de cada palabra a código morse y entre las palabras dadas encontrar las combinaciones únicas

### Solución

```python
class Solution(object):
    def uniqueMorseRepresentations(self, words):
        """
        :type words: List[str]
        :rtype: int
        """
        letters = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
        se = set()
        for w in words:
            str1 = ""
            for c in w:
                s = letters[ord(c)-97]
                str1+=s
            se.add(str1)
        return len(se)

```
Esta solución encuentra su equivalente en una lista, genera el string completo y lo guarda en un hashset, y regresamos solo la longitud del hashset
