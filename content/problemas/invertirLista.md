---
title: "Invertir Lista"
date: "14 Jun 2023"
---
## Invertir lista ligada



 Este problema consisten en invertir una lista ligada
 
### Solucion


```cpp

 class Solution {
 public:
 ListNode* reverseList(ListNode* head) {
 ListNode* final = head;
 ListNode* inicio = NULL;

 while (final) {
 ListNode* sig = final->next;
 final->next = inicio;
 inicio = final;
 final = sig;
 }

 return inicio;
 }
 };
 
```

 En este problema creamos un nodo que apunte al último nodo agregado, este se va a llamar final y otro que sea el nodo al cual final está apuntando, mientras que el final no sea un valor nulo, creamos un nuevo nodo que sea el que sigue en la lista en su orden original, este se llama inicio pues sera el inicio de la nueva lista, entonces al final lo apuntamos al incio, y luego volvemos al inicio el primer nodo en la nueva lista y final sigue siendo el último nodo en la lista original.
 

