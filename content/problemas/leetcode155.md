---
title: "Min Stack"
date: "07 Dec 2023"
tags: ["LeetCode", "Stack", "C++", "Ruby", "Data Structures"]
---
## Min Stack
Este problema consisten en tener un stack el cual siqmpre se le pueda requerir el menor elemento en el stack y este siempre lo puede regresar

### Solucion C++
Esta fue mi por algún motivo parece que leetcode no puede aceptar resultado que usen mallor y realloc, pues en mi computadora si funciono hasta cierto punto este primer intento

```cpp
#include <iostream>
#include <stdio.h>
#include <malloc.h>
#include <stdlib.h>
#include <limits.h>

class MinStack {
public:
    int min;
    int len;
    int *stack;
    int act;
    int com;
    
    MinStack() {
        stack =(int *) malloc (5*sizeof(int));
        len = 5;
        act=0;
        min = INT_MAX;

    }
    
    void push(int val) {
        if (val<min)
            min=val;
        if (act+1==len){
            realloc(stack, (len*2)*sizeof(int));
            len = len*2;
        }
            
        //Añadir
        stack[act]=val;
        act++;

    }
    
    void pop() {
        com++;
    }
    
    int top() {
        return stack[com];
    }
    
    int getMin() {
        return min;
    }

  void print(){
    for (int i = 0; i<len;i++){
      std::cout<<stack[i]<<" ";
    }
    std::cout<<"\n";
  }
};

int main (int argc, char *argv[]) {
  MinStack* obj = new MinStack();
obj->push(-2);
obj->push(0);
obj->push(-3);
  obj->print();
  std::cout<<obj->getMin()<<"\n"; // return -3
obj->pop();
  std::cout<<obj->top()<<"\n";    // return 0
  std::cout<<obj->getMin()<<" ?2\n"; // return -2
  obj->print();
  return 0;
}
```
La verdadera respuesta consiste en tener dos vectores en uno se guardan los elementos del stack y en el otro se debe guardar siempre el menor elemento en la lista hasta ese momento

### Solución Ruby
Esta solución tiene dos arrays uno para el valor mínimo en ese momento del array y otro para almacenar los valores, estos se actualizan al mismo tiempo

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
