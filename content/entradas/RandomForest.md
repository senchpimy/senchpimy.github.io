---
title: "Random Forest"
date: "08 Sep 2024"
---

### Conceptos

**Metodo de Ensamble**: Es un metodo que combina multiples modelos de aprendizaje para mejorar la generalizacion y la robustez sobre un único modelo.
El metodo de ensamble entrena dos o más modelos de aprendizaje en una tarea específica de regresion o clasificacion.

**Arbol de Decision**: Es un modelo de aprendizaje supervisado que se utiliza para la toma de decisiones. Es un arbol que se compone de nodos y ramas.
los nodos representan las características de un conjunto de datos y las ramas representan las reglas (conjunciones) de decision que se toman para llegar

## Random Forest

Random Forest es un algoritmo de aprendizaje supervisado, creado por Leo Breiman y Adele Cutler, su funcionamiento principal consiste en
ombinar la salida de varias desciciones para alcanzar un solo resultado. Es un metodo de ensamble que se usa para clasificacion y regresion.
Consiste en la creacion de multiples arboles de decision durante el entrenamiento. A diferencia de los arboles de decision, Random Forest
al utilizar la aleatoriedad en la selección de las características, evita el sobreajuste y aumenta la precision del modelo. Y a diferencia de
los arboles de decision, Random Forest no utiliza todos los datos para entrenar cada arbol, sino que utiliza una muestra aleatoria de los datos lo que
hace que el modelo sea más robusto y generalice mejor.

También utiliza el metodo de bagging, que consiste en entrenar multiples arboles de decision con diferentes subconjuntos de datos y luego
combinar las salidas de los arboles para obtener un resultado final.

Tomando en cuenta toda la variabilidad potencial en los datos disminuimos el riesgo de sobreajuste y aumentamos la precision del modelo.

### Como funciona

Los Random Forest tienen principalmente tres hiperparametros principales:

1. Numero de arboles(number of trees): Especifica la cantidad de arboles que se van a crear en el modelo.
2. Numero de características(number of feautures): Especifica la cantidad de características que se van a utilizar para entrenar cada arbol.
3. Profundidad maxima(node size): Especifica la profundidad maxima que puede tener cada arbol.

Cada arbol en el bosque se entrena con una muestra aleatoria de los datos y con un subconjunto aleatorio de las características.
Este dataset tiene que ser un dataset con reemplazo, es decir, que los datos pueden ser seleccionados más de una vez.


