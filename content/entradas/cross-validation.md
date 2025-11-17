---
title: "Cross Validation"
date: "2025-03-17"
---

# Cross Validation

Es una tecnica que sirve para validar como un analisis estadistico generaliza una serie de datos independientes, se usa cuando la meta es la predicción y 
uno quiere estimar que tan preciso es el modelo en las predicciónes.

En problema de predicción se tiene una serie de datos en la cual el modelo se entrenarra (datos de entrenarmiento) y otros datos desconocidos para el modelo, contra
los cuales es el modelo probado, la meta de la cross validacion es probar la habilidad del modelo de predecir más nuevos datos usando valores que no se usaron para
entrenarrlo, así se pueden encotrar problemas como *overfitting* o *sesgo de selección*

## Tipos

### Leave-p-out cross-validation

Este metodo implica usar *p* observaciones como el set de validacion y el resto como el de entrenarmiento, esto se repite de todas formas 


### Leave-one-out cross-validation

Este metodo es un caso particular de Leave-p-out con p=1

### K-fold corss validation

En este tipo de validacion los datos originales son seleccionados de forma aleatoria entre *k* diferentes subsecciones, cada uno de las subsecciones es usada como 
datos de validacion para una variacion del modelo.
