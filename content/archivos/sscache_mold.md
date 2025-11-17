---
title: "Sscache y Mold"
date: "29 Jun 2023"
---


 Estas herramientas ayudan a reducir los tiempos de compilación.

 **Sccache** lo instale con cargo, y para usarlo con **gcc** se ocupa antes del comando:
   

```sh
sccache gcc -o foo.o -c foo.c
```

 Y para rust basta con exportar la variable siguiente:
   
```sh
export RUSTC\_WRAPPER=/path/to/sccache
```
  

  

 Reduce los tiempos de compilación al almacenar los resultados de compilación, lo que hace que solo compile los archivos necesarios.
   

  

**Mold** es un linkeador que funciona igualmente para lenguajes compilados, cuando un programa es compilado cada archivo es convertido en un archivo **.o**, y finalmente un linker convierte todos estos archivo en un ejecutable.
   

 En Su pagina tiene instrucciones de uso pero en para que funcione en todos las compilaciones con rust hay que agregar la siguiente linea en el archivo de configuracion de cargo que se encuentra en **~/.cargo/config.toml**

```toml
 [target.x86\_64-unknown-linux-gnu]
 rustflags = ["-C", "link-arg=-fuse-ld=/path/to/mold"]
```
 



