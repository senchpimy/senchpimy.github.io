---
title: "Buscar en Matriz 2D"
date: "04 Jul 2024"
---

## Buscar en Matriz 2d

Este problema consisten en regresar un booleano dependiendo si un elemento se encuentra en una matriz de m*n en la cuál esta ordenada de forma creciente

### Solucion

```rb
# @param {Integer[][]} matrix
# @param {Integer} target
# @return {Boolean}
def search_matrix(matrix, target)
    m = matrix.length
    n = matrix[0].length
    l = 0
    r = (m*n)-1
    while l<=r
        mid = (l+r)/2
        f = mid /n
        c= mid%n
        if matrix[f][c]==target
            return true
        elsif matrix[f][c]>target
            r=mid-1
        else
            l = mid+1
        end
    end
    false
end
```

Este programa considera la matriz como un solo array y para acceder a los indices adecuados este divide los valores por n pues asi tendríamos la columna y fila siendo el residuo y el resultado respectivamente
