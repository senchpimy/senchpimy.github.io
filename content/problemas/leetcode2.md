---
title: "Add Two Numbers"
date: "20 Jun 2024"
tags: ["LeetCode", "Linked List", "Ruby", "Algorithms"]
---
## Add Two Numbers

Este problema consiste en dadas dos listas ligadas las cuales tienen los dígitos de un número entero en reversa y el problema consiste en sumar estos dos
valores y regresar otra lista ligada en reversa con los dígitos del resultado

### Solución

```ruby
# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val = 0, _next = nil)
#         @val = val
#         @next = _next
#     end
# end
# @param {ListNode} l1
# @param {ListNode} l2
# @return {ListNode}
def get_num(node)
    num = 0
    mul = 1
    while node != nil
        num += (mul * node.val)
        mul = mul * 10
        node = node.next
    end
    return num
end

def add_two_numbers(l1, l2)
n =  get_num(l1)
n1 = get_num(l2)
res = n + n1
puts n
puts n1

node = ListNode.new
ref = node
while true
    node.val = res % 10
    res = res / 10
    if res != 0
        node.next = ListNode.new
        node = node.next
    else
    break
    end
end
    return ref
end
```
Este programa consiste primero en encontrar los dos números que debemos sumar, itera la lista en su orden normal y cada vez que encuentra un número
este es multiplicado por un multiplicador y sumado al valor total, este multiplicador aumenta en 10 con cada iteración.

Luego suma los números de forma normal y hace el proceso inverso

Pero encontré estas dos soluciones

```ruby
# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val = 0, _next = nil)
#         @val = val
#         @next = _next
#     end
# end
# @param {ListNode} l1
# @param {ListNode} l2
# @return {ListNode}
def add_two_numbers(l1, l2)
    result = l1
    remain = 0

    1.upto(100) do |index|
        remain = l1.val + l2.val + remain
        l1.val = remain % 10
        remain /= 10

        if !l1.next && l2.next
            l1.next = l2.next
            l1 = l1.next
            l2.next = nil
            l2.val = 0
            next
        elsif !l1.next && !l2.next
            l1.next = ListNode.new(remain) if remain.positive?
            break
        end

        l1 = l1.next if l1.next
        if l2.next
            l2 = l2.next
        else
            l2.val = 0
        end

    end

    result
end
```

Este programa toma otra alternativa, suma los números como los va leyendo y si la suma de los números es superior o igual a 10 guarda el residuo y lo añade al siguiente, este código no crea una nueva lista, pues guarda los nuevos valores en un nuevo array
