---
title: "Paginas Estaticas"
date: "03 Feb 2023"
---

 Una forma de mostrar paginas estaticas es usando **nginx**, para lograr esto hay que tener una pagina estatica la cual mostrar, por ejemplo yo hice [esta pagina](https://github.com/senchpimy/simple), como se puede ver, esta pagina solo tiene el index y una pagina, ademas de otros archivos que irian en esta pagina.
   

  

 Hay que guardar estos archivos en una carpeta, en la cual no debe tener nada mas que lo que queremos mostrar en la pagina web, pues de lo contrario cualquier otro archivo extra que este en este directorio sera servido como los otros archivos.
   

  

 Despues simplemente hay que poner el siguiente archivo en la carpeta **/etc/nginx/sites-avaible** bajo cualquier nombre que uno desee

```toml
 server {
 listen 80 ;
 listen [::]:80 ;
 server\_name **XXXXXXX** ;
 root **path a loas archivos** ;
 index index.html index.htm index.nginx-debian.html ;
 location / {
 try\_files $uri $uri/ =404 ;
 }
 }
``` 
 
 El programa de **nginx** se encargara de administrar las solicitudes a el servidor y de evitar que se intente acceder a otros archivos de el sistema que no sean los especificados
 

