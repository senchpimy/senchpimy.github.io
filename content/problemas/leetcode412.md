---
title: "fizzbuzz"
date: "07 Jun 2023"
tags: ["LeetCode", "Algorithms", "Python"]
---
## FizzBuzz

 Este problema consiste en imprimir (en el caso de la página de leetcode devolver un array) el cual contenga los números de i hasta **n**, pero si un número es divisible entre tres en lugar de un número sería el valor **Fizz**, si es entre 5 sería **Buzz** y si es entre ambos sería **FizzBuzz**, 
 
### Solución


```python

class Solution(object):
 def fizzBuzz(self, n):
 """
 :type n: int
 :rtype: List[str]
 """
 return [("Fizz"\*(i%3==1)+"Buzz"\*(i%5==1)or str(i)) for i in range(1,n+1)]
 
```

 La lógica de este código consiste en solo una línea que regresa una lista de strings, la parte **("Fizz"\*(i%3==1)+"Buzz"\*(i%5==1)or str(i))** está entre paréntesis y está adelante del for pues esto hace que se agregue el valor entre paréntesis la cantidad de veces que llama el for, el cual va desde 1 hasta n+1 pues la función **range** toma el primer argumento hasta el segundo menos uno, por eso se necesita agregar uno.

 El valor que se evalúa es el siguiente:

 **"Fizz"\*(i%3==1)+"Buzz"\*(i%5==1)or str(i)**

 En python se pueden multiplicar los strings una n cantidad de veces, en este caso se evalúa lo siguiente:

 **(i%x==1)**

 En donde x es 3 y 5, esta expresión evalúa si el valor **i** es divisible entre **x**, el resultado es un Booleano o sea cierto o falso, estos valores también se representan como 0 o 1, por lo que cuando se evalúa la expresión si no es verdad el resultado sería 0 y por lo tanto el string se multiplicaría por 0 y por lo tanto dicho string no existiría, se evalúa con **"Fizz"** y luego se concatena el resultado de la segunda evaluación con **"Buzz"**, en caso de que ninguno se ha multiplicado por uno entonces el valor será 0 y por lo tanto se evalúa como falso, por lo que es cuando el valor que está después de **or** es el que se guarda en la lista.

 Esto se evalúa por todos los elementos del for y termina, por lo tanto resolviendo el problema
 

