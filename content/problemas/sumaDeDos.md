---
title: "Suma De Dos"
date: "14 Jun 2023"
---
## Suma de Dos

 Este problema consiste en encontrar la ubicacion de dos numeros en un vectos ordenado de forma ascendente que sumados den como resultado un valor deseado.
 
### Solucion


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
 

 Mi solucion fue restarle a el numero objetivo el valor del primer elemento de la lista, asi ya sabriamos que numero debemos encontrar, después como la lista esta ordenada buscamos este numero que nos hace falta, si no lo encontramos significa que no es posible la suma con el primer numero, por lo tanto repetimos el proceso con el segundo numero de la lista hasta que encontremos los dos valores, en tal caso al vector añadimos los indices de donde se encuentran estos elementos y regresamos el vector.

 Este metodo fue el mas tardado pues termino al ultimo, pero en memoria supero al 95% de las otras soluciones, me sorprendio pues pense que esta era la respuesta correcta asi que busque otra soluciones y me encontre con esta que gana al 99.91% de las otras soluciones en velocidad y al 75% en memoria.
 

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
 

 Este metodo usa dos punteros, uno al principio y otro hasta el final, suma estos valores y evalua la suma, si es igual al numero objetivo regresamos los indices, y ahora como la lista esta ordenada, si es menor el resultado que obtuvimos podemos aumentar el indice del primer valor pues el menor de los dos y aumentandolo nos dara un numero mayor acercandonos al resultado, caso contrario el numero resultado es mayor añ numero objetivo entonces reducimos el indicie del ultimo valor, lo que apuntara a un numero menor e igualmente acercandonos al resultados.
 


