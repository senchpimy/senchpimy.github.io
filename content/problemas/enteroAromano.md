---
title: "Entero A Romano"
date: "24 Jun 2024"
---

## Entero A romano

Este problema consisten en dado un numero regresar un string que sea su representacion en numero romano de dicho numero

### Solucion

```rb
# @param {Integer} num
# @return {String}
def int_to_roman(num)
    u = {0=>"", 1=>"I", 2=>"II", 3=>"III", 4=>"IV", 5=>"V", 6=>"VI", 7=>"VII", 8=>"VIII", 9=>"IX"}
    d = {0=>"", 1=>"X", 2=>"XX", 3=>"XXX", 4=>"XL", 5=>"L", 6=>"LX", 7=>"LXX", 8=>"LXXX", 9=>"XC"}
    c = {0=>"", 1=>"C", 2=>"CC", 3=>"CCC", 4=>"CD", 5=>"D", 6=>"DC", 7=>"DCC", 8=>"DCCC", 9=>"CM"}
    m = {0=>"", 1=>"M", 2=>"MM", 3=>"MMM"}
    mm = num /1000
    cc = (num%1000) /100
    dd = (num%100) /10
    uu = (num%10) /1
    return m[mm]+c[cc]+d[dd]+u[uu]
end
```
Los límites dados son que ningún numero superara los 3999.

Este programa crea un hashmap para los unidades, decenas, centenas y milesimas, luego divide el numero por el indice de su equivalente en el hashmap.
Esta versión está en el top ~50% en cuanto a velocidad y ~70% en cuanto a memoria, luego me di cuenta que no era necesario un hashmap y se podía usar
una lista cualquiera, pues al final cada numero es equivalente a su posición.

```rb
# @param {Integer} num
# @return {String}
def int_to_roman(num)
    u = ["","I","II","III","IV","V","VI","VII","VIII","IX"]
    d = ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"]
    c = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"]
    m = ["","M","MM","MMM"]
    mm = num /1000
    cc = (num%1000) /100
    dd = (num%100) /10
    uu = (num%10) /1
    return m[mm]+c[cc]+d[dd]+u[uu]
end
```
Esta versión está en el top 70% de velocidad y 60% en memoria. Aunque está solucion es correcta la solucion que se debía dar es más o menos la siguiente:


```rb
# @param {Integer} num
# @return {String}
def int_to_roman(num)
    ans = []

    romans = [
        [1000, 'M'], [500, 'D'], [100, 'C'], [50, 'L'], [10, 'X'], [5, 'V'], [1, 'I']
    ].to_h

    base = 1
    while num > 0
        mod = num % 10
        num /= 10

        if mod == 4 || mod == 9
            ans.concat([romans[(mod + 1) * base], romans[base]])
        elsif mod == 5
            ans << romans[5 * base]
        elsif mod > 5
            ans.concat([romans[base]] * (mod % 5)) if mod != 5
            ans << romans[5 * base]
        else
            ans.concat([romans[base]] * (mod % 5)) if mod != 5
        end
        
        base *= 10
    end

    ans.reverse.join
end
```
