---
title: "Perímetro de la Isla"
date: "25 Sep 2026"
tags: ["LeetCode", "Array", "Matrix", "C++", "Algorithms"]
---
## Perímetro de la Isla

Este problema consiste en, dada una matriz `grid` donde `1` representa tierra y `0` agua, regresar el perímetro de la isla. La isla está formada por celdas de tierra conectadas horizontal o verticalmente (sin diagonales) y se garantiza que existe una sola isla.

### Solución

```cpp
class Solution {
public:
    int islandPerimeter(vector<vector<int>>& grid) {
        int t{0};
        for (int i{0}; i < grid.size(); i++) {
            for (int j{0}; j < grid[i].size(); j++) {
                if (grid[i][j] != 1)
                    continue;
                if (i == 0)
                    t++;

                if (i > 0)
                    if (grid[i-1][j] == 0)
                        t++;

                if (i == grid.size()-1)
                    t++;
                if (i < grid.size()-1)
                    if (grid[i+1][j] == 0)
                        t++;

                if (j == 0)
                    t++;
                if (j > 0)
                    if (grid[i][j-1] == 0)
                        t++;

                if (j == grid[i].size()-1)
                    t++;
                if (j < grid[i].size()-1)
                    if (grid[i][j+1] == 0)
                        t++;
            }
        }
        return t;
    }
};
```

Se recorren todas las celdas y, por cada celda de tierra, se revisan sus cuatro lados. Un lado aporta `1` al perímetro si la celda vecina correspondiente es agua o si el lado cae en el borde de la matriz. Sumando los lados expuestos de todas las celdas de tierra se obtiene el perímetro total de la isla.
