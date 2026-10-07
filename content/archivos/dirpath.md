---
title: "Dirpath"
date: "16 Jan 2023"
tags: ["C", "Shell", "Zsh", "Tools"]
---

Cuando estaba modificando ZSH, me di cuenta que el prompt **starship**,
por el que estaba cambiando **oh-my-zsh** no mostraba el path de los archivos
como a mi gustaba, es decir **starship** mostraba el path así: ***.../Actual/directorio/subcarpeta***,
mientras que el que me gustaba de **oh-my-zsh**
lo mostraba de forma más corta,
ese mismo ejemplo sería ***~/Ac/di/subcarpeta***,
el cual se me hacía más corto y conciso, afortunadamente **starship**
nos permite ejecutar cualquier comando y tener la salida en el prompt.
 
![](/pro_img/Dirpath.png)

primero lo escribi en python como prueba de concepto:

```py
#!/usr/bin/python
import os 
path=os.getenv("PWD")
splited=path.split("/")[1:]
if os.getlogin()==splited[1]:
    splited.pop(0)
    splited[0]="~"

for i,_ in enumerate(splited[1:]):
    splited[i]=splited[i][:2]

print("/".join(splited))
```

Pero seria tendria el problema de que seria igual algo lento y es en
mi opinion es mucho cargar el interprete de python para solamente mostrar el directorio.

Por lo que mejor lo escribi en C y quedo de la siguiente manera:

```c
#include <stdio.h>
#include <string.h>
#include <unistd.h>

char HOME[] = "~";
#define MAX_LEN 2

int main() {
  char path[1024];
  char login[256];
  getcwd(path, sizeof(path));

  char *splited[1024];
  char *token = strtok(path, "/");
  int i = 0;
  while (token != NULL) {
    splited[i++] = token;
    token = strtok(NULL, "/");
  }

  if (i < 2) {
    printf("%s", path);
    return 0;
  }
  getlogin_r(login, sizeof(login));
  if (strcmp(login, splited[1]) == 0) {
    splited[1] = HOME;
    for (int j = 2; j < i - 1; j++) {
      splited[j][MAX_LEN] = '\0';
    }

    for (int j = 1; j < i - 1; j++) {
      printf("%s/", splited[j]);
    }
    printf("%s\n", splited[i - 1]);
    return 0;

  } else {

    printf("/");
    for (int j = 0; j < i - 1; j++) {
      if (strlen(splited[j]) > 3)
        splited[j][MAX_LEN] = '\0';
      printf("%s/", splited[j]);
    }
    printf("%s\n", splited[i - 1]);

    return 0;
  }
}
```

 Este programa en C hace específicamente eso, lee el directorio actual y
 le el formato que quería

En comparacion la version de python vs la version de C, el numero de instrucciones
que cada uno ejecuta es la siguiente:

```
Versión	Instrucciones CPU / ejecución
C	~217,600
Python 	~1,057,330,000 (≈1.06 mil millones)
```
