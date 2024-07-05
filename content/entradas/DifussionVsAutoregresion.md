---
title: "Diffusion VS Autoregresion"
date: "05 Jul 2024"
---

## Auto Regresion

El agoritmo de Auto Regresion en la generacion de imagenes consiste en dada una secuencia de pixeles intentar predecir el siguiente.

Este algoritmo es lento pues solo puede predecir un solo pixel a la vez.

Para solucionar esto se aplica Auto Regresion Generalizada, que consiste en lugar de generar un solo pixel generar nxn mallas de pixeles

Pero la n no puede ser demasiado grande, pues al ser un modelo de prediccion, entre mayor sea la cantidad de información que se tenga que generar en una sola regresion hay una mayor cantidad de probabilidades que pueden ser congruentes con la informacion anterior
por lo que el modelo toma el promedio de todas las posibles probabilidades, creando un mal resultado.

Pero este problema solo surge si los pixeles que se estan generando estan relacionados unos de los otros. Una forma de contrarestar esto es si generamos n pixels que no sean dependientes unos de los otros, es decir que no sean espacialmente cercanos.

## Diffusion

Un modelo de Diffusion toma una imagen de ruido y en lugar de agregar informacion, elimina informacion de el ruido.
