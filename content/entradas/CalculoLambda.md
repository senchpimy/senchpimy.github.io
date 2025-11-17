---
title: "Calculo Lambda"
date: "23 Jul 2024"
katex: true
---

### Conceptos
**Formalismo Matematico**: En las matematicas la formalizacion es una teoria que sostiene que las proposiciones de la matematica 

**Sistema formal**: Es una estructura abstracta y formalizacion de un sistema de axiomas usado para inferir teoremas de axiomas dado
una reglas de inferencia

**Reglas de inferencia**: Una regla de Inferencia es una forma logica que consiste en una funcion que toma una premisa, analiza su 
syntaxis y regresa una conclusion

## Calculo Lambda 

El calculo Lambda es un sistema formal en la logica matematica, inventado por Alonzo Church, lo creo para represntar la notación una funcion desde 
una prespectiva de la computacion, Alonzo fue el supervisor de phD de Alan Turing, el cual cuando desarrollo las maquinas de Turing, estas
plantean un modelo de computacion basado en estados, mientras que Alonzo con el calculo lambda planteo un modelo de computacion basado en
funcion, ambos son equivalentes y a esta equivalencia se le llama la hipotesis Church-Turing.

En el calculo lambda solo existen funciones, y estas funciones son "puras" es decir no existe un estado interno que altere las salidas
de esta funcion, es decir que para un input y una funcion siempre sera igual el output.

## Funciones

Las funciones en calculo lambda se definen de la siguiente manera

$$\lambda$$

Expresa que el siguiente elemento sera un argumento de la funcion, es decir en la siguiente notación x es u n argumento

$$\lambda x$$

Los diferentes argumento se separan con puntos, para definir varios argumentos es de la siguiente manera

$$\lambda x.\lambda y$$

Y finalmente la salida se coloca después de la definicion de los argumentos con un punto. Por ejemplo una funcion que aumente en 1 los valores

$$\lambda x.x+1$$

Y una funcion que toma dos numeros y regresa su suma:

$$\lambda x.\lambda y.x+y$$

En realidad esta funcion se aprovecha de la capacidad de las funciones de ser de alto orden, es decir que pueden ser pasadas como argumentos y regresadas como
salidas. En realidad esta funcion son dos funciones y la primera esta regresando otra la cual toma ambas entradas y las suma, por lo que el desarrollo de esta funcion quedaria de la siguiente manera
$$(\lambda x.\lambda y.x+y) \textrm{1 2} \rightarrow  (\lambda y.1+y) 2 \rightarrow (\lambda 2.1+2) \rightarrow 1+2$$

De manera formal quedaria como :
$$(\lambda x.\lambda y.L) \textrm{M N} \rightarrow  (\lambda y.L[M/x]) N \rightarrow L[M/x][N/y]$$

Se expresa de la siguiente manera la entrada con las salidas:

$$\lambda x.M$$

## Operaciones de Reduccion

**conversion alpha**: Consiste en renombrar las variables para evitar coliciones de nombres
$${\textstyle (\lambda x.M[x])\rightarrow (\lambda y.M[y])}$$

**reduccion beta**: Consiste en reemplazar la variable con su expresion en el cuerpo de la abstraccion, es decir dado una abstraccion lambda y un argumento reemplazarlo por su valor mapeado, si la funcion le suma uno a cualquier argumento entonces su reduccion beta seria el numero
pasado como argumento más uno
$${\textstyle ((\lambda x.M)\ N)\rightarrow (M[x:=N])}$$

Por lo que si tenemos una abstraccion:
$$(\lambda x,M) N$$

Se lee como *dado la funcion que toma un parametro y se transforma en M, aplicar dicha transformacion a N* que se puede expresar en cualquiera de la siguientes formas
$${\textstyle ((\lambda x.M)\ N)\rightarrow (M[x:=N]) = (M[N/x])}$$

## Booleanos Y condicionales

Ejemplo:
Esta funcion va a regresar el primer termino si el booleano es verdadero y el segundo si es falso
$$ True = \lambda x.\lambda y.x$$
$$ False = \lambda x.\lambda y.y$$
$$ ifthen = \lambda b.\lambda x.\lambda y.b x y $$
$$ (\lambda b.\lambda x.\lambda y.b x y) \textrm{True M N} \rightarrow (\lambda x.\lambda y.True\textrm{ x y}) \textrm{ M N} \rightarrow$$
$$(\lambda y.True\textrm{ M y}) \textrm{ N} \rightarrow (True\textrm{ M N}) \rightarrow M$$

## Tipos en el calculo Lambda

Para limitar el tipo de datos que una abstraccion lambda puede recibir se agregan tipos a la definicion lambda de la siguiente forma:

$${\textstyle \lambda x.M : A \rightarrow B}$$

En donde x es de tipo A y M de tipo B


## Aplicaciones

El calculo de lambda puede ser usado para simular cualquier maquina de turing

