***

title: "Anagrama"
date: "08 Jun 2023"
-------------------

## Anagrama

Este problema consisten en regresar cierto si un string es un anagrama del otro

### Solucion

```cpp
#include 
class Solution {
    public:
    bool isAnagram(string s, string t) {
        map<tchar, int> mapa;
        map<tchar, int> mapa2;
        if (s.length()!=t.length())
        return false;
        for (int i = 0; i<s.length();i++){
            mapa[s[i]]++;
            mapa2[t[i]]++;
        }
        for (int i = 0; i<s.length();i++){
            if (mapa[s[i]]!=mapa2[s[i]])
            return false;
        }
    return true;
    }
};

```

Este programa los resolvi mapeando todos los elementos de ambos strings y si la cantidad de ambos elementos son iguales entonces se puede decir que estos son anagramas
