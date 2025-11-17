---
title: "Forma Backus-Naur"
date: "08 Sep 2024"
---

### Conceptos

**Sintaxis**: La sintaxis son las reglas que definen una combinacion de símbolos que forman parte de expresiones o declaraciones correctamente estructuradas en ese lenguaje
**Lenguaje Formal**: En la logica y matematica un lenguaje formal es consiste de palabras cuyas letras son tomadas de un alfabeto y se conforman de acuerdo a un set especifico de reglas llamadas gramática formal
**Metasintaxis**: Es la sintaxis usada para definir una sintaxis
**Gramática libre de contexto**: En lenguajes formales una gramática libre de contexto es una gramática cuyas reglas de produccion pueden ser aplicadas a símbolos no no-terminales sin importar su contexto.

## Forma Backus-Naur
La forma Backus Naur (BNF) es una notación para describir la sintaxis de algunos lenguajes formales, fue desarrollada por Jhon Backus Y Peter Naur. BNF puede ser descrita como una *notación de metasintaxis* para gramáticas libre de contexto. BNF es usado cuando
descripciones exactas de lenguajes son necesarias, como en la especificacion de un lenguaje oficial, en manuales, etc. Incluso para describir formatos de documentos, sets de instrucciones y protocolos de comunicación.

Los BNF describen como combinar diferentes símbolos para producir sequencias sintacticamente correctas. Los BNFs consistes de 3 componentes. Los símbolos terminales, los no-terminales y las reglas para reemplazar los símbolos no-terminales con una secuencia de símbolos.
Las reglas de derivacion se escriben de la siguiente manera:
```
 <symbol> ::= __expression__
```

**<symbol>**: Es una variable *no-terminal* que se encierra en un par de "<>"
**::=**: Significa que el simbolo de la izquierda debe ser reemplazado por el de la derecha
**__expression__**: Consiste de una o más sequencias de símbolos terminales o no-terminales, donde cada secuencia es separada por una barra vertical "|" que indica una descicion 

