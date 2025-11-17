---
title: "Sudoku"
date: "21 Jun 2024"
---

## Anagrama

Este problema consisten en dado un sudoku regresar si el sudoku es valido, es decir no existe ningún numero repetido en las columnas, filas y cuadrados de 3x3

### Solucion

```rb
# @param {Character[][]} board
# @return {Boolean}
def is_valid_sudoku(board)
    cols=Hash.new{|h,k| h[k]= []}
    rows=Hash.new{|h,k| h[k]= []}
    sqr=Hash.new{|h,k| h[k]= []}
    board.each_with_index do |row,i| 
        row.each_with_index  do |col,j|
        next if col=='.'
        if cols[j].include?(col) || rows[i].include?(col) || sqr[[i/3,j/3]].include?(col)
            return false
        end
        cols[j]<<col
        rows[i]<<col 
        sqr[[i/3,j/3]]<<col
        end
    end
    true
end
```

Este programa los resolvi teniendo un hashmap para cada fila, columna y cuadro de 3x3, y preguntando si el elemento que se esta procesando actualmente se encuentra dentro de los valores de el hashmap que se esta evaluando.

Este fue mi primer intento, pero ver las soluciones más rapidas encontré una fórmula que mejora la memoria y velocidad de el que ya tenía con solo una linea, salva memoria al no guardar la llave de el hashmap de cuadrados 3x3 como un array con dos elementos y en su
lugar lo guarda como un solo indice, esta es la versión final:


```rb
# @param {Character[][]} board
# @return {Boolean}
def is_valid_sudoku(board)
    cols=Hash.new{|h,k| h[k]= []}
    rows=Hash.new{|h,k| h[k]= []}
    sqr=Hash.new{|h,k| h[k]= []}
    board.each_with_index do |row,i| 
        row.each_with_index  do |col,j|
        next if col=='.'
        grid_index = (i/3)*3 + (j/3)
        if cols[j].include?(col) || rows[i].include?(col) || sqr[grid_index].include?(col)
            return false
        end
        cols[j]<<col
        rows[i]<<col 
        sqr[grid_index]<<col
        end
    end
    true
end
```
