---
date: "09 Jun 2023"
title: "Preparar un Servidor"
---

 Cuando se tiene un nuevo servidor el cual uno esta rentando, hay algunas configuraciones que se tienen que llevar a cabo en el servidor para poder hacerlo más seguro. Esta guia esta enfocada a servidores Linux
  

### Actualizar el sistema

 Muchas veces podriamos estar instalando alguna imagen de sistema, que sea antigua y por lo tanto esta puede que no tenga los ultimos parches de seguridad de cualquier programa que pudiesemos estar ejecutando, asi que lo primero seria actualizar el sistema, como hacer esto varia en cada distribución, por lo que tambien es bueno actualizar los servidores de forma relgular, en debian existe un programa llamado **unnatended-upgrades**
  

### Ejecutar servicios


 Cuando ejecutamos un programa este tiene la capacidad de modificar y hacer lo mismo que este en la capacidad segun los permisos de el usuario que lo ejecuto, por lo que si tenemos un programa ejecutado por root, este mismo podría hacer lo mismo que root, que es practicamente hacer todo, por esto es necesario que cualquier servicio que sea ejecutado y que valla a estar al servicio de cualquier persona en el internet **no** sea ejecutado por root, lo ideal seria que un usuario con menor privilegios sea el que ejecute estos servicios, algunos programas por defecto no se ejecutan si detectan que son ejecutados por root.

  

### Contraseña De Root


 Lo primero que se nos da cuando rentamos un servidor (o la minima información que debemos tener para poder controlar el servidor), es la ip y la contraseña de el administrador, asi que lo que demos de hacer es acceder a ese servidor usando ssh que viene instalado por defecto en la mayoria de las distribuciones que se usan para servidores (OpenSuse, Debian, Ubuntu, CentOS, Fedora), asi que nos conectaremos usando con
 
```sh
 ssh root@<IP>
```

 El cual nos pedira la contraseña, y la ingresamos y con eso deberiamos tener acceso a el servidor como root, lo primero que se debe hacer es cambiar la contraseña, yo uso el programa **keepassxc** para administrar y generar contraseñas, yo no usaria una contraseña que pudiera recordar facilmente como **c0ntr4s3ñ4** ó **Cu4lqU13r.C0ntr4s3ñ45786**, pues cualquiera que sea facil para nosotros recordar tambien es facil de crackear [**ejemplo**](https://www.youtube.com/watch?v=BiStxSaLs7U)
  

### Conectarse al Servidor


 Siempre se va a necesitar una coneccion al servidor, pero ssh nos pedira introducir la contraseña, lo que podría mostrar en que puerto esta esuchando el servidor ssh, lo cual si este no esta actualizado podría ser una falla de seguridad, por lo que para evitar esto lo ideal seria bloquear el acceso a ssh con contraseña, es decir que se requiera una llave ssh para poder aacceder al servidor, de esta forma se la validacion se hara automaticamente, y podría evitar la posibilidad de un ataque de fuerza bruta
 
```sh
 ssh-keygen
 ssh-copy-id root@<IP>
```

 Con esto ya no es necesario ingresar la contraseña pero aun es posible ingresar con esta misma, para evitar esto hay que modificar el archivo **/etc/ssh/sshd\_config** y modificar la linea que dice **PasswordAuthentication** y **USEPam** a **no**, esto hace que aunque se ingrese la contraseña correcta no se pueda acceder al servidor y solo se puede acceder con la llave, con lo que estariamos eliminando un posible punto debil. Tambien estaria bien cambier el puerto por defecto de ssh, pues esto ayuda a defender de ataques muy simples, aunque ataques que escaneen todos los puertos pueden detectar en cual de todos se ejecuta ssh, esto ultimo puede ser considerado inutil.


### Firewall


 El firewall es una herramienta que nos ayudara a rechazar conecciones en puertos que podrian estar abiertos, dejando una probabilidad de que alguien pueda acceder a el servidor por medio de alguno de estos puertos abiertos, para esto yo use **ufw** el cual es un programa que nos ayuda a admministrar los puertos.
   

 Despues de instalarlo hay que permitir los siguientes puertos **80,443,22(O puerto de ssh)** usando el comando 
 
```sh
 ufw allow **puerto**
```

 Podemos bloquear los otros puertos ó revisar el estado de el firewall usando:
 
```sh
 ufw status
```
