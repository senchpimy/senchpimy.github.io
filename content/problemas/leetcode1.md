---
title: "Suma de Dos"
date: "14 Jun 2023"
tags: ["LeetCode", "Two Pointers", "C++", "Algorithms"]
---
## Suma de Dos

 Este problema consiste en encontrar la ubicación de dos números en un vector ordenado de forma ascendente que sumados den como resultado un valor deseado.
 
### Solución


```cpp
 class Solution {
 public:
    int binarySearch(vector<int>& arr, int l, int r, int x)
    {
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (arr[m] == x)
                return m;
            if (arr[m] < x)
                l = m + 1;
            else
                r = m - 1;
        }
        return -1;
    }

    vector<int> twoSum(vector<int>& numbers, int target) {
        int lon = numbers.size();
        int buscar;
        vector<tint> vec;
        for (int i = 0; i<lon;i++){
         buscar = target-numbers[i];
         int resultado = binarySearch(numbers,i+1,lon-1,buscar);
         if (resultado!=-1){
            vec.push_back(i+1);
            vec.push_back(resultado+1);
            return vec;
        }
    }
    return vec;
 
 }
 };
```
 

 Mi solución fue restarle al número objetivo el valor del primer elemento de la lista, así ya sabríamos qué número debemos encontrar, después como la lista está ordenada buscamos este número que nos hace falta, si no lo encontramos significa que no es posible la suma con el primer número, por lo tanto repetimos el proceso con el segundo número de la lista hasta que encontremos los dos valores, en tal caso al vector añadimos los índices de donde se encuentran estos elementos y regresamos el vector.

 Este método fue el más tardado pues terminó al último, pero en memoria superó al 95% de las otras soluciones, me sorprendió pues pensé que esta era la respuesta correcta así que busqué otras soluciones y me encontré con esta que gana al 99.91% de las otras soluciones en velocidad y al 75% en memoria.
 

```cpp
 class Solution {
 public:
 vector&ltint> twoSum(vector&ltint>& numbers, int target) {
 int n = numbers.size();
 int i = 0, j = n - 1;
 while (i < j) {
 int sum = numbers[i] + numbers[j];
 if (sum == target) {
 return {i + 1, j + 1};
 } else if (sum < target) {
 ++i;
 } else {
 --j;
 }
 }
 return {-1, -1};
 }
 };
```
 

 Este método usa dos punteros, uno al principio y otro hasta el final, suma estos valores y evalúa la suma, si es igual al número objetivo regresamos los índices, y ahora como la lista está ordenada, si es menor el resultado que obtuvimos podemos aumentar el índice del primer valor pues el menor de los dos y aumentándolo nos dará un número mayor acercándonos al resultado, caso contrario el número resultado es mayor al número objetivo entonces reducimos el índice del último valor, lo que apuntará a un número menor e igualmente acercándonos al resultado.
 


