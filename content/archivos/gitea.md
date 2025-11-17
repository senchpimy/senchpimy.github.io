---
title: "Gitea"
date: "21 Jan 2023"
---



 Gitea es un programa OpenSource para poder hostear una instancia de un servidor de git, y aprovechando que ya tengo un dominio con una computadora quise hostear mis propios proyectos usando este programa, este programa es de fácil instalación, pero si le quisieras modificar alguna plantilla hay que tener cuidado en que carpeta y usuario lo instales, primero hay que descargar el binario y luego hacerlo ejecutable.
```sh

 wget -O gitea https://dl.gitea.io/gitea/1.18.1/gitea-1.18.1-linux-amd64
 chmod +x gitea
``` 

 
 Luego hay que crear un usuario que ejecute gitea, pues este no puede ser ejecutado por **root**, en la página oficial recomiendan el siguiente comando:
 
```toml
 adduser \
 --system \
 --shell /bin/bash \
 --gecos 'Git Version Control' \
 --group \
 --disabled-password \
 --home /home/git \
 **git**
``` 

 Pero con que este no tenga permisos elevados y una carpeta en **/home** es suficiente, luego necesitamos crear las carpetas **custom,data,log** en **/var/lib/gitea**, y se hace de la siguiente manera en un solo comando.
 
``` sh
 mkdir -p /var/lib/gitea/{custom,data,log}
``` 
 
 Después hay que mover el ejecutable de gitea a la carpeta de los binarios.

 
``` sh
 mv gitea /usr/bin/gitea
``` 
 

 Luego tenemos que hacer que el usuario que creamos posea estas carpetas, además de darle sus permisos especiales. Después de esto los siguientes comando son para darle permiso al instalador web.
 
``` sh
 chown -R git:git /var/lib/gitea/
 chmod -R 750 /var/lib/gitea/

 mkdir /etc/gitea
 chown root:git /etc/gitea
 chmod 770 /etc/gitea
``` 
 
 Luego hay que crear un servicio de **systemd**, en el repositorio de gitea hay un ejemplo pero yo tengo otro el cual es un poco diferente, este archivo hay que guardarlo en **/etc/systemd/system** como **gitea.service**

``` toml
 [Unit]
 Description=Gitea (Git with a cup of tea)
 After=syslog.target
 After=network.target
 
 [Service]
 # Uncomment the next line if you have repos with lots of files and get a HTTP 500 error because of that
 # LimitNOFILE=524288:524288
 RestartSec=2s
 Type=simple
 User=**git**
 Group=**git**
 WorkingDirectory=/var/lib/gitea/
 ExecStart=/usr/bin/gitea --config /var/lib/gitea/custom/conf/app.ini
 Restart=always
 Environment=USER=**git** HOME=/home/**git** GITEA\_WORK\_DIR=/var/lib/gitea
 
 [Install]
 WantedBy=multi-user.target
``` 
 
 Hay que tener atención si es que el usuario que se creo para que ejecutara gitea sea el mismo que esta especificado en el servicio de systemd. En este caso estoy haciendo que al momento que gitea se ejecute tome como el archivo de configuración aquel que esta en **/var/lib/gitea/custom/conf/app.ini**, que en este caso tendríamos que sacar el archivo de configuración desde su github, pues son caso 3,000 líneas de posibles configuraciones y explicaciones sobre su funcionamiento, se hace con el siguiente comando.
 
```sh
 curl https://raw.githubusercontent.com/go-gitea/gitea/main/custom/conf/app.example.ini >> app.ini
 chmod 640 app.ini
``` 
 
 Y depende en que carpeta estemos hay que mover este archivo a la ubicación especificada; En este archivo hay cambiar el puerto en el que se ejecuta, el dominio (si es que tenemos uno), en mi caso después de la instalación web quedó de la siguiente manera:
 
```toml
 APP_NAME = Senchpimy Git Server
 RUN_USER = git
 RUN_MODE = prod
 
 [repository]
 ROOT = /var/lib/gitea/data/gitea-repositories
 
 [server]
 DOMAIN = localhost
 HTTP_PORT = 3000
 ROOT_URL = https://git.senchpimy.xyz
``` 
 
 
 Yo borré algunos campos pues estos tenían información delicada pero esos son los que hay que cambiar, y lo que configuré en mi caso, fue para mi dominio que ya tenía.
   

 Y si todo esta bien configurado solo hay que ejecutar los siguientes comandos.
 
```sh
 systemctl enable gitea.service
 systemctl start gitea.service
 
``` 
 Y ahora si nos dirigimos en este caso sería a senchpimy.xyz:3000, deberíamos ver la página de instalación web, en el tipo de database escogí sqlite, pues solo estaré yo usando ese servidor y no hay necesidad de una database más robusta, en este apartado nos dará opción de modificar las cosas más importantes para que funcione, después de que ya esta configurado, el servidor ya es usable, en este caso solo desde el puerto **3000** y para cambiar esto hay que hacerlo desde **nginx (más información [aquí](./subdominios.html))**.
   

 Finalmente me gustaría cambiar la página principal que se muestra cuando no hay una cuenta registrada, para lograr esto hay que crear una carpeta llamada **templates** dentro de la carpeta **custom** que creamos en la parte de arriba, y después hay que crear la template de la que va a reemplazar a la original, en este caso sería **home** y por lo tanto hay que guardarlo como **home.tmpl**, Después hay que copiar el [ejemplo](https://github.com/go-gitea/gitea/blob/main/templates/home.tmpl) que esta en el repositorio de gitea, y se supone que es la misma que trae por defecto, pero al momento de cambiarla los siguientes bloques me daban error y no permitían que el servicio completo empezara a ejecutarse
 
```go
 {{.locale.Tr "startpage.platform\_desc" | Str2html}}
``` 
 
 Así que solo borré todas las líneas que tuvieran ese contenido, de todos modos era parte de lo que me gustaría haber quitado, y finalmente es un archivo normal de html y este ya se puede modificar como uno quiera. Y para aplicar los cambios hay que **reiniciar** el servicio de gitea.
   

 Finalmente me quedó asi:
 
![](/pro_img/gitea.png)




