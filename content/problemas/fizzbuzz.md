---
title: "fizzbuzz"
date: "07 Jun 2023"
---
## FizzBuzz

 Este problema consisten en imprimir (en el caso de la página de leetcode devolver un array) el cual contenga los numeros de i hasta **n**, pero si un numero es divisible entre tres en lugar de un numero sería el valor **Fizz**, si es entre 5 sería **Buzz** y si es entre ambos sería **FizzBuzz**, 
 
### Solucion


```py

class Solution(object):
 def fizzBuzz(self, n):
 """
 :type n: int
 :rtype: List[str]
 """
 return [("Fizz"\*(i%3==1)+"Buzz"\*(i%5==1)or str(i)) for i in range(1,n+1)]
 
```

 La logica de este código consiste en solo una linea que regresa una lista de strings, la parte **("Fizz"\*(i%3==1)+"Buzz"\*(i%5==1)or str(i))** esta entre parentesis y esta adelante del for pues esto hace que se agregue el valor entre parentesis la cantidad de veces que llama el for, el cual va desde 1 hasta n+1 pues la función **range** toma el primer argumento hasta el segundo menos uno, por eso se necesita agregar uno.

 El valor que se evalua es el siguiente:

 **"Fizz"\*(i%3==1)+"Buzz"\*(i%5==1)or str(i)**

 En python se pueden multiplicar los strings una n cantidad de veces, en este caso se evalua lo siguiente:

 **(i%x==1)**

 En donde x es 3 y 5, esta expresion evalua si el valor **i** es divisible entre **x**, el resultado es un Booleano o sea cierto o falso, estos valores también se representan como 0 o 1, por lo que cuando se evalua la expresion si no es verdad el resultado sería 0 y por lo tanto el string se multiplicaria por 0 y por lo tanto dicho string no existiria, se evalua con **"Fizz"** y luego se concatena el resultado de la segunda evaluacion con **"Buzz"**, en caso de que ninguno se a multiplicado por uno entonces el valor sera 0 y por lo tanto se evalua como falso, por lo que es cuando el valor que esta después de **or** es el que se guarda en la lista.

 Esto se evalua por todos los elementos del for y termina, por lo tanto resolviendo el problema
 

