---
title: "owncloud"
date: "08 Jun 2023"
---

 Owncloud es un servicio que te permite tener tu propia nube
 Primero instale docker, que es un poco complejo pues el paquete en el repositorio no es el docker completo, es decir lo suqiente no funciona

 ```sh
 sudo apt install docker
 ```
 
 Por lo que tuve que seguir las instrucciones de [aqui](https://docs.docker.com/engine/install/debian/)
  

 Luego cree el grupo docker y añadi mi usuario
 
 ```sh
 gropadd docker
 sudo usermod -aG docker pi
 ```
 
 Luego lo active desde docker
 
 ```sh
 newgrp docker
 ```

 Y finalmente lo probe con el siguiente paquete.
 
 ```sh
 docker run hello-world
 ```
 
 Luego hice una evaluacion de Owncloud con el siguiente comando
 
 ```sh
 docker run --rm --name oc-eval -d -p8080:8080 owncloud/server
 ```
