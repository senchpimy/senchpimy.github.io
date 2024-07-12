---
title: "Min Stack"
date: "07 Dec 2023"
---

## Min Stack
Este problema consisten en tener un stack el cual siqmpre se le pueda requerir el menor elemento en el stack y este siempre lo puede regresar

### Solucion
Esta solucion tiene dos arrays uno para el valor minimo en ese momento de el array y otro para almacenar los valores, estos se actualizan al mismo tiempo

```rb
class MinStack
    def initialize()
        @min = []
        @arr = []
    end


=begin
    :type val: Integer
    :rtype: Void
=end
    def push(val)
        
        if @min.length ==0
            @min << val 
        else
            if val < @min.last
                @min << val
            else
                @min << @min.last
            end
        end
        @arr << val
    end


=begin
    :rtype: Void
=end
    def pop()
        @arr.pop
        @min.pop
    end


=begin
    :rtype: Integer
=end
    def top()
        @arr.last
    end


=begin
    :rtype: Integer
=end
    def get_min()
        @min.last
    end


end

# Your MinStack object will be instantiated and called as such:
# obj = MinStack.new()
# obj.push(val)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.get_min()
```
