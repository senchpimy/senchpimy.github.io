---
title: "Evaluar Notación Polaca Inversa"
date: "14 Jul 2024"
tags: ["LeetCode", "Stack", "Ruby", "Algorithms"]
---
## Evaluar Notación Polaca Inversa

Este problema consiste en dada una lista de números y símbolos evaluar esta lista como si fuera una notación polaca

### Solución

```ruby
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
