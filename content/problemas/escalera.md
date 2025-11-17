---
title: "Escalera"
date: "01 Jul 2024"
---

## Escalera

Este problema consisten en regresar un entero que indique todas las formas posibles en las cuales se puede subir una escalera de n escalones
si en cada paso se puede escoger subir 1 o 2 escalones

### Solucion

```rb
# @param {Integer} n
# @return {Integer}
def climb_stairs(n)
    if n <= 3 
		return n
	end
    total = 0
    restantes = n - 3
    prev2 = 2
    prev1 = 3
    1.upto(restantes).each do
        total = prev1+prev2
        prev2 = prev1
        prev1 = total
    end
    total    
end
```

Este programa toma en consideracion que para n siendo menor o igual a 3, el resultado sera igual que n, luego considera que la 
ecuacion para resolver este problema es la siguiente:

f(n) = f(n-1) + f(n-2)

Entonces iteramos desde 1 (pues la primera iteración ya se resolvio) hasta n, luego obtenemos el resultado de la iteración i que sería
el resultado si n = i, y lo repetimos hasta que i = n; En donde ya tendríamos el resultado final
