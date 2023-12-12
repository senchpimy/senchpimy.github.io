---
title: "Top K Elementos"
date: "12 Jun 2023"
---
## Top K Elementos



 Este problema consisten contar cuantas veces aparece un elemento en un vector y regresar una lista con **K** elementos, los cuales sean los de mayor repeticion en el primer vector, este fue mi primer intento:
 
### Primer Intento


```cpp
#include <map>
class Solution {
 public:
 void insertar(int num,int k,int* vals){
    for (int i=0; i<k;i++){
     if (num<vals[i]){
         i=i-1;
         for (int j=0;j<i;j++)
             vals[j]=vals[j+1];
 
             vals[i]=num;
             break;
        }
    }
 }
 
 vector<int> topKFrequent(vector<int>& nums, int k) {
    map<int,int> mapa;
    for (int element : nums) {
       mapa[element]++;
    }
    int vals[k];
    int l=0;
    for (auto i: mapa){
        if (l==k)
            break;
        vals[l]=i.first;
        l++;
    }
    int minimo=0;
    int pos = 0;
    for (auto i:mapa){
        if (i.second>=minimo){
            if (pos<k){
               vals[pos]=i.first;
                pos++;
            }else{
                insertar(i.first,k,vals);
            }
            minimo=mapa[vals[0]];
        }
    }
    std::vector<int> dest(vals, vals + k);
 return dest;
 }
};
 
```

Este intento consiste en primero contar cuantas veces un elemento aparace en el vector luego iterar solo una vez sobre este mapa y llenar array estatico, y tener un registro de la cantidad de veces en el que el menor elemento que se ha insertado tiene, asi que si algun elemento supera este minimo este se debe de insertar en su poscicion correcta, con esto lograba insertar todos loe elementos de una sola pasada, 
pero este codigo no funciono, solo logro pasar la mitad de los casos.

Pero me encontre esta solucion que me parecio interesante.
 

```cpp
class Solution {
 public:
 vector<int> topKFrequent(vector<int>& arr, int k) {
 #pragma GCC optimize("Ofast")
 #pragma GCC target("sse,sse2,sse3,ssse3,sse4,popcnt,abm,mmx,avx,avx2,fma")
 #pragma GCC optimize("unroll-loops")

 ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);

 unordered_map<int,int> mp;
 for(auto i: arr) mp[i]++;

 vector<pair<int,int>> vp;
 for(auto i: mp) vp.push_back({i.second, i.first});

 sort(vp.rbegin(), vp.rend());

 vector<int> ans;
 for(int i=0; i<k i++) ans.push_back(vp[i].second);
 return ans;
 }
};
 
```

 Primero yo no sabia que con GCC se podia modificar las caracteristicas de la compilacion dentro del codigo, al buscarlo me encontre que "pragma" le permite al compilador cambiar las caracteristicas de la compilacion por archivo.

 Luego esta linea nucna la habia visto antes:
 
```cpp
 ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
```
 
 Lo que hace esta parte es primero es evitar la sincronizacion entre stdin,stdout y stderr de C y las de cin, cout y cerr de C++, lo que se supone que puede mejorar la velocidad del codigo.
 
```cpp
 cin.tie(NULL); cout.tie(NULL);
```
 
 Y estas dos instrucciones hacen que cada vez que una es escrita, la otra es limpiada y esta parte hace que este comportamiento ya no suceda.

 Luego usa un **unordered_map** en lugar de un **map**, no se bien el por que de esta descicion, luego guarda la informacion de cuantas veces se repite un valor de la misma forma en que yo la hice. 

 Luego copia todos los datos a un Vector y ordena el vector, lo cual no solo duplica la memoria necesaria sino tambien se tarda en ordenar todos los elementos cuando solo se necesitan una pequeña porcion, por lo que es muy tardado.

 Finalmente crea un vector en el que agrega los primeros **K** elementos.
 


