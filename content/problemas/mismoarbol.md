---
title: "Mismo Arbol"
date: "30 Jun 2024"
---

## Arbol

Este problema consisten en regresar un booleano que describe si dos raices de unos arboles describen dps arboles iguales

### Solucion

```rb
def is_same_tree(p, q)
    izq = [p]
    der = [q]
    while izq.length != 0 && der.length != 0
        e_izq = izq.pop
        e_der = der.pop
        if e_izq.nil? ^ e_der.nil?
            return false
        end
        next if e_izq == nil 
        if e_izq.val != e_der.val
            return false
        end
            izq<<e_izq.left
            der<<e_der.left
            izq<<e_izq.right
            der<<e_der.right
    end
    true
end

```

Este programa lo resolvi creado dos ques para cada arbol, y añadiendo los nodos hoja de cada nodo a su respectiva lista y regresando false en
la diferencia de valor de el nodo o de la arquitectura.

Primero se guardan en una lista y se van sacando los elementos uno por uno, luego se revisa si existe diferencia entre si, es decir continua
si los dos son nulos o si los dos son no-nulos, si alguno es nulo pero el otro no entonces no son iguales, finalmente compara el valor de cada
uno.

Esta versión se encuentra en el top ~98% de velocidad
