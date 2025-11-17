---
title: "Diffusion VS Autoregresion"
date: "05 Jul 2024"
---

## Generar Imagenes

El problema de generar imagenes puede ser reducido a un problema de prediccion. Primero se tiene que encontrar una manera de introducir los datos al modelo, pues si solo se introducen imagenes con una etiqueta el modelo generará un promedio de todas las
imagenes con la misma etiqueta, es decir una imagen la cual cada pixel de está imagen es el promedio de los demás pixeles que se encuentran en esa misma posscicion en las otras imagenes.

## Auto Regresion

El agoritmo de Auto Regresion en la generacion de imagenes consiste en dada una secuencia de pixeles intentar predecir el siguiente o los siguientes N pixeles.

Esta solucion tiene varias desventajas:

-   si al momento de predecir el pixel siempre se selecciona el optimo segun el modelo, siempre se terminara generando la misma imagen, para corregir esto se puede elegir un valor de la distribucion de probabilidad que
genero el modelo.

-   Si se intentan generar muchos pixeles por cada ejecucion el modelo generará un promedio de todas las posibildades que esos pixeles puedan ser, por lo que existe un limite en que tan grande cada generacion puede ser. Para solucionar esto se aplica Auto Regresion Generalizada,
que consiste en lugar de generar un solo pixel se generan nxn mallas de pixeles, Pero la n no puede ser demasiado grande, pues al ser un modelo de prediccion, entre mayor sea la cantidad de información que se tenga que generar en una sola regresion hay una mayor cantidad de
probabilidades que pueden ser congruentes con la información anterior por lo que el modelo toma el promedio de todas las posibles probabilidades, creando un mal resultado. Pero este problema solo surge si los pixeles que se están generando están relacionados unos de los otros.
Una forma de contrarestar esto es si generamos n pixels que no sean dependientes unos de los otros, es decir que no sean espacialmente cercanos.

## Diffusion

Un modelo de Diffusion toma una imagen de ruido y en lugar de agregar información, elimina información de el ruido.

Cuando estos modelos se entrenan, se tiene una imagen y se le agrega "ruido", la forma de generar este ruido es la que aprenden los modelos de generacion. Para después dada una imagen de ruido, este proceso pueda ser invertido, eliminando el ruido en cada iteracion
y por lo tanto generando una imagen coherente.


### Fuente
(Why Does Diffusion Work Better than Auto-Regression?)[https://www.youtube.com/watch?v=zc5NTeJbk-k]
