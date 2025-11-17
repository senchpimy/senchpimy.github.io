---
title: "Evaluar Notacion Polaca Inversa"
date: "14 Jul 2024"
---

## Evaluar Notacion Polaca Inversa

Este problema consisten en dada una lista de numeros y símbolos evaluar está lista como si fuiera una notación polaca

### Solucion

```rb
# @param {String[]} tokens
# @return {Integer}
def eval_rpn(tokens)
    stack = []
    while !tokens.empty?
        c = tokens.shift
        begin
            val = Integer(c)
            stack<<val
        rescue 
            n1,n2 = stack.pop(2)
            case c
            when "+"
                res = n1+n2
            when "-"
                res = n1-n2
            when "*"
                res = n1*n2
            when "/"
                res = (n1/n2.to_f).to_i
            end
            stack<<res
        end
    end
    stack.pop
end
```
