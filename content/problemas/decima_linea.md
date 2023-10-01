---
title: "Decima Linea"
date: "30 Jun 2023"
---

## Decima Linea



 Este problema consisten en imprimir la demcima linea de un archivo usando comando de shell, mi primera solucion fue la siguiente:
 
### Solucion


```sh
 head file.txt --line 10 | tail --line 1
```
 

 Pero fallaba cuando el documento no tenia mas de 10 lineas, entonces con **awk** tienen la varibale **NR** que practicamente un contador de lineas,etonces
 se puede usar de la siguiente manera
 

```sh
 awk 'NR == 10' file.txt
```
 

 Pero esta solucion tardaba mucho entonces con **sed** tambien se puede con
 

```sh
 sed -n '10p' file.txt
```
 

 En donde se le indica imprimir el decimo parrafo
 


