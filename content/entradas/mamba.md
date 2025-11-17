---
title: "Mamba"
date: "04 Jul 2024"
---

## Mamba

Mamba es una nueva arquitectura de redes neuronales que es mejor que los transformers en el modelado de lenguaje, también es más eficiente computacionalmente, pues para procesar una secuencia de n palabras
tiene una complejidad nlogn mientras que los transformers tienen n^2

## Modelos State-space 
Estos son una alternativa a modelos sequenciales tales como HiPPO, Discretization, Structured State-Space Models que combina Redes neuronales Recurrentes

## Redes Neuronales Recurrentes

Una red convolucional aplica una red neuronal a una serie de vectores al mismo tiempo, en comparación a una tradicional en donde se analiza toda la información como un solo vector, este cambio en arquitectura logra que la información que se transmite entre capas
pueda tener un cierto "contexto" con la información a su alrededor, que funciono muy bien para el analisis de imágenes y aplicando este mismo conecpto al texto, puede añadir conexto a las palabras segun las otras palabras que estén a su alrededor.

Una arquietectura transofrmer hace que se combinen la información de varios vectores sin importar su proximidad, la desventaja es que la complejidad computacional de este algortimo es de n^2

Una red recurrente le aplica una red neuronal a un vector y a la salida previa a esa red neuronal, este cambio hace que cada salida tenga información sobre todas las salidas anteriores a esta.

La desventaja de este acercamiento es que este proceso no se puede paralelizar pues cada salida depende de la anterior.

Por que en la practica un transformer es más rápido que una red recurrente, además que en una red convolucional aunque en teoria se puede tener información sobre cualquier vector anterior, en la practica son solo unos pocos los que son "recordados"

## Red Neuronal Recurrente Lineal

Esta arquietectura remueve la red neuronal por una función lineal, aunque esto por si solo no es suficiente para una red neural pues una función lineal solo pueden realizar transformaciones simples de sus datos de entrada pero para evitar estas limitaciones de la función lineal se
agrega una red neuronal a cada vector después de su transformacion

## Paralelizar RNN Lineales

## Fuente
[]{https://www.youtube.com/watch?v=N6Piou4oYx8} 7:00
