---
title: "Parentesis Valido"
date: "05 Dec 2023"
---

## Parentesis Valido

Este problema consisten en regresar cierto si un string contiene una serire de parentesis que sean validos

### Solucion

```py
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

Esta función primero añade a una lista los parentesis que abren y conforme la lista avanza el orden en en el que salen debe 
ser el mismo con el que entran por lo que si esto no es asi entonces el parentesis no es valido y si al final la lista está vacia se regresa *True*
