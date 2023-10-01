---
title: "Combinar Dos Tablas"
---

## Combinar dos tablas



 Este programa consiste en juntas dos tablas en base a un cambo en SQL
 
### Solucion


```sql
 SELECT firstName, lastName, city, state
 FROM Person 
 LEFT JOIN Address USING (personId)
```
 

 Escojemos los campos de **firstName, lastName, city, state** de la tabla **Person** con **LEFT JOIN** decimos que devuelva todos los registros de la tabla **Address** que no esten en **Person**,
 con **USING** significa que usara la columna **personId** para unir las dos tablas
 


