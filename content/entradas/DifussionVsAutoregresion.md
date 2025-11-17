---
title: "Diffusion VS Autoregresión"
date: "05 Jul 2024"
---

## Generar Imágenes

El problema de generar imágenes puede ser reducido a un problema de predicción. Primero se tiene que encontrar una manera de introducir los datos al modelo, pues si solo se introducen imágenes con una etiqueta el modelo generará un promedio de todas las
imágenes con la misma etiqueta, es decir una imagen la cual cada píxel de esta imagen es el promedio de los demás píxeles que se encuentran en esa misma posición en las otras imágenes.

## Autorregresión

El algoritmo de Autorregresión en la generación de imágenes consiste en dada una secuencia de píxeles intentar predecir el siguiente o los siguientes N píxeles.

Esta solución tiene varias desventajas:

-   si al momento de predecir el píxel siempre se selecciona el óptimo según el modelo, siempre se terminará generando la misma imagen, para corregir esto se puedelegir un valor de la distribución de probabilidad que
generó el modelo.

-   Si se intentan generar muchos píxeles por cada ejecución el modelo generará un promedio de todas las posibilidades que esos píxeles puedan ser, por lo que existe un límite en qué tan grande cada generación puede ser. Para solucionar esto se aplica Autorregresión Generalizada,
que consiste en lugar de generar un solo píxel se generan nxn mallas de píxeles, Pero la n no puede ser demasiado grande, pues al ser un modelo de predicción, entre mayor sea la cantidad de información que se tenga que generar en una sola regresión hay una mayor cantidad de
probabilidades que pueden ser congruentes con la información anterior por lo que el modelo toma el promedio de todas las posibles probabilidades, creando un mal resultado. Pero este problema solo surge si los píxeles que se están generando están relacionados unos de los otros.
Una forma de contrarrestar esto es si generamos n píxeles que no sean dependientes unos de los otros, es decir que no sean espacialmente cercanos.

## Diffusion

Un modelo de Diffusion toma una imagen de ruido y en lugar de agregar información, elimina información del ruido.

Cuando estos modelos se entrenan, se tiene una imagen y se le agrega "ruido", la forma de generar este ruido es la que aprenden los modelos de generación. Para después dada una imagen de ruido, este proceso pueda ser invertido, eliminando el ruido en cada iteración
y por lo tanto generando una imagen coherente.


### Fuente
(Why Does Diffusion Work Better than Auto-Regression?)[https://www.youtube.com/watch?v=zc5NTeJbk-k]
