---
title: "Paréntesis Válido"
date: "05 Dec 2023"
tags: ["LeetCode", "Stack", "Python", "Algorithms"]
---
## Paréntesis Válido

Este problema consiste en regresar cierto si un string contiene una serie de paréntesis que sean válidos

### Solución

```python
def isValid(s: str) -> bool:
         fifo = []

         for char in s:
             if char in '({[':
                 fifo.append(char)
             else:
                 if not fifo:
                     return False

                 curr= fifo.pop()

                 if (char == ')' and curr!= '(') or (char == '}' and curr!= '{') or (char == ']' and curr!= '['):
                     return False

         return not fifo

```

Esta función primero añade a una lista los paréntesis que abren y conforme la lista avanza el orden en el que salen debe 
ser el mismo con el que entran por lo que si esto no es así entonces el paréntesis no es válido y si al final la lista está vacía se regresa *True*
