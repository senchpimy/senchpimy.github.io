---
title: "Invertir Numero"
date: "08 Jun 2023"
---

## Anagrama

Este problema consiste en tomar un numero de 32 bits y luego invertirlo

### Solucion

La siguiente fue mi primera solucion
```rb
# @param {Integer} x
# @return {Integer}
def reverse(x)
    positive = x>=0? 1:-1
    x = x.abs
    max = 2147483647
    max_rm = max%10
    min = -max - 1
    min_rm = min%10
    num = 0
    while x!=0
        dig = x%10
        x = x / 10
        if (num > max/10 || (num==max/10 && dig>=max_rm)) 
         return 0
        end
        if (num < min/10 || (num==min/10 && dig<=min_rm)) 
         return 0
        end
        num*=10
        num+=dig
    end
    num *= positive

    num
    
end
```

Este programa primero toma el valor absoluto de el numero y guarda si es positivo o negativo, esto por que en algunos lenguajes el modulo de los numeros negativos funciona de diferentes maneras.

Luego guardamos como constante el valor de 2**31 y lo asignamos a unas variables para que no lo tenga que recomputar en cada ciclo, como algunas veces lo hace ruby.

Este programa fue más o menos como lo habia pensado, la parte de verificar que el numero no pase los límites de los 32 bits fue la que tuve que buscar.

Note que también tenía unas divisiones que seguramente ruby recomptaba en cada iteracion y las asigne a unas variables antes de emepzar el ciclo para ver si esto lo hacía más rápido y asi fue:


```rb
# @param {Integer} x
# @return {Integer}
def reverse(x)
    positive = x>=0? 1:-1
    x = x.abs
    max = 2147483647
    max_rm = max%10
    max_10 = max / 10
    min = -max - 1
    min_rm = min%10
    min_10 = min / 10
    num = 0
    while x!=0
        dig = x%10
        x = x / 10
        if (num > max_10 || (num==max_10 && dig>=max_rm)) 
         return 0
        end
        if (num < min_10 || (num==min_10 && dig<=min_rm)) 
         return 0
        end
        num*=10
        num+=dig
    end
    num *= positive

    num
    
end
```
