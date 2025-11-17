---
title: "Contar Agua De LLuvia"
date: "11 Jul 2024"
---

## Contar Agua de LLuvia

Este problema consisten en dado una lista con numeros los cuales representan la altura de pilares en un contenedor, encontrar el volumen total de agua
que se encuentra "atrapada" en el array

### Solucion

Mi primera solucion fue la siguiente

```rb
def min (a,b)
  a<b ? a : b
end
# @param {Integer[]} h
# @return {Integer}
def trap(h)
   left = 0 
   tot = h.length() - 1
   vol_tot = 0
   while left < tot
        min = h[left]
        right = left+1
        while right<=tot
            break if h[right]>=min
            if right == tot
                left +=1
                right = left
            end
            right+=1
        end
        v = (right-left) * min(h[left],h[right])
        less = h[left+1..right-1].sum
        v-= less
        vol_tot += v
        left = right
   end 
   vol_tot
end
```

Esta solucion usa dos apuntadores, busca por la izquierda un pilar hasta encontrar un pilar más grande o igual por la derecha, cuando lo encuentra
este toma el volumen que existe entre los dos y le resta el volumen, pero no contaba en cuenta algunos casos, asi que la modifiqué para 
algunos casos que no tome en cuenta:

```rb
def min (a,b)
  a<b ? a : b
end
# @param {Integer[]} h
# @return {Integer}
def trap(h)
   left = 0 
   tot = h.length() - 1
   vol_tot = 0
   while left < tot
        min = h[left]
        right = left+1
        while right<tot
            break if h[right]>=min
            right+=1
            break if h[right]>=min

            if right == tot
         #       puts "## Izquierda #{left} Derecha#{right}"    
                left +=1
                min = h[left]
                right = left+1
               # next
            end
        end
        v = (right-left-1) * min(h[left],h[right])
        #puts "Volumen: #{v} Izquierda#{left} Derecha#{right}"
        less = h[left+1..right-1].sum
        v-= less
        vol_tot += v
        left = right
   end 
   vol_tot
end
```

Pero aun asi está muy parchado y está mal, la correcta solucion que supera al 99% de las soluciones es la siguiente:

```rb
def min(a, b)
  a < b ? a : b
end

# @param {Integer[]} h
# @return {Integer}
def trap(h)
  left = 0
  tot = h.length - 1
  vol_tot = 0

  while left < tot
    if h[left] <= h[tot]
      min_height = h[left]
      left += 1
      while left < tot && h[left] < min_height
        vol_tot += min_height - h[left]
        left += 1
      end
    else
      min_height = h[tot]
      tot -= 1
      while left < tot && h[tot] < min_height
        vol_tot += min_height - h[tot]
        tot -= 1
      end
    end
  end

  vol_tot
end

```
