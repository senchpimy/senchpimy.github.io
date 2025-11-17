---
title: "VSFTP"
date: "05 Sep 2023"
---


 FTP es un protocolo para transmitir archivos, desde hace tiempo he intentado tener un servidor dentro de mi red local el cual funcione con unos discos que tengo, e intentado usar **OpenMediaVault**, pero tiene algunos bugs y no me gusto, también intente usar **Owncloud**, pero parece que no
 que la empresa que lo desarrolla no le quiere seguir dando mantenimiento y una instalación debian desde apt no funciona pues la versión de php en debian no es compatible con la que requiere owncloud, y la imagen de docker tiene problemas en la configuracion del servidor, entonces mejor decidí usar
 un simple servidor ftp
   
  

 Para instalarlo en debian solo se tiene que ejecutar:

```sh
 apt install vsftpd
``` 
 
 Y luego lo habilitamos desde systemd con
 
``` sh
 systemctl enable vsftpd
 systemctl start vsftpd
``` 
 
 Y ya, el servidor estaría funcionando, y a diferencia de los otros dos programas que intentan ser más simples y fáciles de administrar con sus interfaces gráficas, este fue mucho más fácil para mi.
   
  

 Para poderlo utilizar en mi explorador de archivos de preferencia *Nautilus* tuve solo que hacer click en más ubicaciones y en la parte inferior hay un espacio en donde se pueden agregar servidores con diferentes protocolos, y 
 para agregar el mio solo tuve que poner:
 
```sh
 ftp://192.168.XXX.XXX
``` 
 
 Y se conecto automáticamente, me pidió contraseña y usuario pero fue todo lo que necesité.
   
  

 Para poder usar mis discos los tuve que montar, lo cual es bastante sencillo pero cada vez que se apague y se vuelva a prender necesitaría volver a hacer lo mismo, entonces para evitar esto cambie el archivo de **fstab** con los siguientes comandos:
 
```sh
 uuid=$(ls -al /dev/disk/by-uuid/ | grep **sdb1** | awk '{print $9}')
 str=$(echo "UUID=$uuid **/home/plof/disco** ext4 defaults 0 0")
 echo $str >> /etc/fstab
``` 
 
 Solo hay que cambiar en estos pequeños comandos el nombre del disco y la dirección en la cual se van a montar, y verificar que la configuracion fue correcta con el siguiente comando
 
``` sh
 findmnt --verify
``` 
 
 Y solo para confirmar que todo este funcionando correctamente estaría bien reiniciar la computadora y verificar que tanto el servidor ftp como el disco este funcionando correctamente

 [Mi intento de hacer un reporte de owncloud](/pro_img/owncloud.html)



