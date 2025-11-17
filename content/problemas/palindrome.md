---
title: "palindrome"
date: "12 Jun 2023"
---
## Palindrome




 Este problema consisten en verificar si un string es un palindrome
 
### Solucion


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

 En la primera linea primero eliminamos todos los caracteres que no sean alfanumericos, la función **.erase** toma una función la cual filtra desde el principio hasta el final todos los elementos que no sean alfanumericos.

 Luego ponemos un marcador hasta el final del array , y finalmente iteramos desde una mitad hasta la otra, lo hice con mitades pues si no encontramos ninguna indiferencia entre la primera y la ultima mitad no la vamos a encontrar entre la ultima y la primera pues estas ya se evaluaron entre si, es decir si evualos las otras dos mitades sería evaluar los dos mismol elementos pero en diferente orden.

 Evaluamos estos dos elementos (el primero y el último) en minuscula pues la el estring puede contener minusculas y mayusculas, si son diferentes entonces estos no se pueden leer de atrás hacía delante de la misma manera y por lo tanto no sol palindromos y regresamos false.
 Si terminamos las comparaciones esto significa que son iguales y por lo tanto es un palindromo por lo que regresamos true .

 Este metodo me dio un &lt90% en la velocidad y memoria en leetcode
 
 


