---
title: "Contenedor Con más Agua"
date: "23 Jun 2024"
---

## Contenedor con más agua

Este problema consisten en dado una lista con numeros los cuales representan la altura de pilares en un contenedor, encontrar cual es el volumen mayor que se encontrara entre dos pilares cualquiera

### Solucion

```rb
def min (a,b)
  a<b ? a : b
end

# @param {Integer[]} height
# @return {Integer}
def max_area(height)
    izq = 0
    der = height.length - 1
    m = 0
    while izq < der
        v = (der-izq) * min(height[izq],height[der])
        m = v if v>m 
        if height[izq]< height[der]
            izq+=1
        else
            der-=1
        end
    end
   m
end
```

Este programa se resuelve iterando por todo el array, obtenemos el volumen con la formula de la distancia entre los dos puntos y la menor altura entre dos los multiplicamos y asi obtenemos el volumen y lo guardamos solo si es
mayor que el anterior, y avanzamos los apuntadores hacia cualquiera que fuese el siguiente intento que existe una probabilidad de darnos un resultado mayor
