---
title: "Palindrome"
date: "12 Jun 2023"
tags: ["LeetCode", "String", "C++", "Algorithms"]
---
## Palindrome




 Este problema consiste en verificar si un string es un palíndromo
 
### Solución


```cpp
 class Solution {
 public:
 bool isPalindrome(string s) {
 s.erase(std::remove_if(s.begin(), s.end(), 
 []( auto const& c ) -> bool { return !std::isalnum(c); } ), s.end());
 int j = s.length()-1;
 for (int i =0; i&lts.length()/2;i++){
 if (tolower(s[j])!=tolower(s[i])){
 return false;
 }
 
 j--;
 
 }
 return true;
 
 }
 };
 

```

 En la primera línea primero eliminamos todos los caracteres que no sean alfanuméricos, la función **.erase** toma una función la cual filtra desde el principio hasta el final todos los elementos que no sean alfanuméricos.

 Luego ponemos un marcador hasta el final del array , y finalmente iteramos desde una mitad hasta la otra, lo hice con mitades pues si no encontramos ninguna indiferencia entre la primera y la última mitad no la vamos a encontrar entre la última y la primera pues estas ya se evaluaron entre sí, es decir si evalúo las otras dos mitades sería evaluar los dos mismos elementos pero en diferente orden.

 Evaluamos estos dos elementos (el primero y el último) en minúscula pues el string puede contener minúsculas y mayúsculas, si son diferentes entonces estos no se pueden leer de atrás hacia delante de la misma manera y por lo tanto no son palíndromos y regresamos false.
 Si terminamos las comparaciones esto significa que son iguales y por lo tanto es un palíndromo por lo que regresamos true .

 Este método me dio un &lt90% en la velocidad y memoria en leetcode
 
 


