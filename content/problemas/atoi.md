---
title: "atoi"
date: "13 Jul 2024"
---

## String a Entero

Este problema consisten en convertir un string en un entero

### Solucion

```rb
# @param {String} s
# @return {Integer}
def my_atoi(s)
    mul = 1
    sym = false
    val = 0

    s.each_char do |c|
        next if c == " " && !sym
        break if c == " "
        if ( c == "-" || c =="+" ) && !sym
            mul = -1 if c == "-" 
            sym = true
            next
        end
        code = c.ord
        break unless code.between?(48,57)
        val *= 10
        val += code - 48
        sym = true
    end
    # Limitar a 32 bits
    max = 2**31
     if val < max 
        return val * mul
     end
     if mul < 0
        return max * mul
    end
    return max-1 * mul
end
```
