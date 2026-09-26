---
title: "Sistema de tipo Hindley-Milner"
date: "27 Jul 2024"
katex: true
tags: ["Functional Programming", "Type Theory", "Lambda Calculus", "Hindley-Milner"]
---
Es un sistema clasico de tipos para el calculo lambda con polimorfismo parametrico, descubierto por J. Roger Hindley y luego redescubierto por Robin Milner, dentro de sus propiedades existe la habilidad de poder inferir el *tipo principal* de un programa sin que el programador especifique
las anotaciones de tipo u otras pistas. El algoritmo W es un método eficiente para inferir los tipos. El sistema de tipos Hindley-Milner fue usado primero por lenguajes funcionales como ML.

Como método de inferencia Hindley-Milner es capaz de deducir los tipos de las variables, expresiones y funciones de programas escritos sin un estilo tipado. Se origino el algoritmo para el *Calculo lambda de tipado simple* que fue propuesto por Haskell Curry. En 1969 Hindley probo
que el algoritmo siempre infiere el tipo principal. En 1978 RObin Milner desarrollo un algorimo equivalente conocido como **Algoritmo W**. En 1982 Luis Damas probo que el algoritmo de milner es completo Y extendio el soporte para sistemas con referencias polimorficas.


## Polimorfismo Parametrico

En los lenguajes de programación y en teoría de tipos, el polimorfismo parametrico le permite usar tipos *genericos* usando variables en lugar de los tipos para que luego sea instanciado con los tipos particulares como sea necesario. Generalmente funciones y estructuras parametricas
son llamadas también genericas, en contraste el *polimorfismo ad hoc*, las definiciones del polimorfismo parametrico son uniformes, es decir se comportan igual sin importar el tipo con el cual instanciadas

## Algoritmo W


### Conceptos

- **Polimorfismo AdHoc:**

- **Completitud:** En la logica matematica, un sistema formal es llamado completo con respecto a una propiedad si cada fórmula que posea la propiedad puede ser derivada usando ese sistema; Osea es una propiedad de un conjunto delementos o de un sistema, según la cual cualquier elemento del conjunto se
puede combinar con otros elementos para obtener otro elemento también del conjunto.

- **Tipo principal:** En teoría de tipos, un sistema de tipos se dice que tiene o cuple la propiedad del tipo principal si dado un termino y un ambiente, existe un tipo principal para este termino en este ambiente; Es decir un tipo tal que todos los otros
tipos en el ambiente sean una instancia de este tipo
