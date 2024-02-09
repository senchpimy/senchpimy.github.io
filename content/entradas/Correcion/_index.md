---
title: "Algoritmo para la correcion de palabras"
date: "2024-02-08"
---
```py

def levenshtein(bas:str,obj:str,total=0):
    if len(bas)==0:
        return len(obj)
    if len(obj)==0:
        return len(bas)
    if bas[0]==obj[0]:return levenshtein(bas[1:], obj[1:],total)
    min_pos = min(
            levenshtein(bas[1:],obj), 
            levenshtein(bas, obj[1:]), 
            levenshtein(bas[1:], obj[1:])
            )
    total+=1+min_pos
    return total


```

```py
def wagner_fishher(bas:str,obj:str):
    matrix = []
    for _ in range(len(bas)+1):
        y = []
        for _ in range(len(obj)+1):
            y.append(None)
        matrix.append(y)
    matrix[0][0]=0
    for i in range(len(bas)):
        matrix[0][i+1]=i+1

    for i in range(len(obj)):
        matrix[i+1][0]=i+1

    vertical = len(bas)
    hor = len(obj)
    itery = 0
    iterx = 0
    while itery!=vertical:
        while iterx!=hor:
            min_v= min(
                    matrix[itery][iterx],
                    matrix[itery+1][iterx],
                    matrix[itery][iterx+1],
                    )
            if bas[itery]==obj[iterx]:
                matrix[itery+1][iterx+1]=min_v
            else:
                matrix[itery+1][iterx+1]=min_v+1
            iterx+=1
        iterx=0
        itery+=1

    return matrix[-1][-1]
```

## Fuentes 
https://www.youtube.com/watch?v=d-Eq6x1yssU
