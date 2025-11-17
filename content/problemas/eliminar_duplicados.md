---
title: "Eliminar Duplicados"
#date: "6 Jul 2023"
---
## Eliminar Duplicados



 Este programa consiste en eliminar los elementos duplicados de un vector y regresar cuanto elementos unicos este tenía
 
### Solucion


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

 Este programa itera por todo el vector y como este está ordenado es cuando el numero anterior al numero de la iteracion actual son diferentes que se puede decir que es otro elemento del array, por lo que se aumenta el valor, al mismo tiempo como tenemos el indice de que elementos unicos lo podemos intercambiar
 para asi poder reducir su tamaño a solo elementos unicos
 


