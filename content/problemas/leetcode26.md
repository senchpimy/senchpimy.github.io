---
title: "Eliminar Duplicados"
date: "06 Jul 2023"
tags: ["LeetCode", "Array", "C++", "Algorithms"]
---
## Eliminar Duplicados



 Este programa consiste en eliminar los elementos duplicados de un vector y regresar cuántos elementos únicos este tenía
 
### Solución


```cpp
class Solution {
public:
 int removeDuplicates(vector&ltint>& nums) {
 int j = 1;
 int size = nums.size();
 for(int i = 1; i < size; i++)
 if(nums[i] != nums[i - 1]){
 nums[j] = nums[i];
 j++;
 }
 
 return j;
 }
};
 
```

 Este programa itera por todo el vector y como este está ordenado es cuando el número anterior al número de la iteración actual son diferentes que se puede decir que es otro elemento del array, por lo que se aumenta el valor, al mismo tiempo como tenemos el índice de que elementos únicos lo podemos intercambiar
 para así poder reducir su tamaño a solo elementos únicos
 


