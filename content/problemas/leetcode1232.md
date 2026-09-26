---
title: "Línea Recta"
date: "11 Jun 2023"
tags: ["LeetCode", "Mathematics", "Geometry", "Algorithms"]
---
## Check Straight Line



 Este problema consiste en verificar si un arreglo de coordenadas son una línea recta.
 
### Solución


```python
 def checkStraightLine(self,coordinates):
 (x0,y0)=coordinates[0]
 (x1,y1)=coordinates[1]
 for x,y in coordinates[2:]:
    if (x1-x0)*(y-y1)!=(x-x1)*(y1-y0)
         return False
 return True
```
 

 Primero definimos que una línea recta son dos puntos en donde la pendiente es igual
 La lógica de este código consiste en obtener evaluar la pendiente de los siguientes puntos con respecto a la de los dos primeros. Por lo que necesitamos iterar entre toda la lista, menos entre los dos primeros puntos pues si la lista solo tiene dos puntos estos formarán ya una línea recta

 La fórmula de la pendiente incluye una división, pero para evitar el caso en el que se divide entre cero lo cambiamos por una multiplicación, pues esto hará que las proporciones y por lo tanto la pendiente se mantenga igual. Primero se evalúa la pendiente con la diferencia en X entre los dos primeros puntos con la diferencia del punto a evaluar con el segundo punto. Y si es una línea recta esta pendiente debe ser igual con la pendiente de la diferencia entre el segundo punto de X y el X del punto a evaluar, con la diferencia en Y de los dos primeros puntos, si los valores son proporcionales entre sí entonces la pendiente deberá ser la misma. por lo que si son diferentes regresamos Falso pues ya sabemos que no es una línea recta

 

