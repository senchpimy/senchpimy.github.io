---
title: "Configuración de Marlin Para la Ender3"
date: "29 Oct 2022"
---

 Con los 4 archivos de configuracion tenemos muchas de modificación posibilidades para la ender 3, en mi caso hice las siguientes, pues modifique mi impresora desde el hardware agregandole un nuevo hotend (Maxiwatt) y el extrusor BondtechBMG necesita modificaciones al firmware
 
## _Statusscreen.h



**_statusscreen.h** es un archivo que contiene un bitmap de la pantalla de status que contiene el logo de Marlin, pero como me gusta Serial Experiments Lain se lo voy a cambiar a esta imagen:
 

![](./copland.jpg)


 Para hacerlo solo subí la imagen <https://marlinfw.org/tools/u8glib/converter.html> Asegurándome que la imagen cumpliera con las dimensiones y seleccioné que la queria para status, copie la salida y la pegue en \_Statusscreen.h
 
## PID



 Al cambiarle el hotend necesitamos cambiarle el PID que es una formula que controla como el hotend se calienta, evitando que este varie mucho en el tiempo para poder hacer esto el firmware necesita de tres valores, estos valores se obtiene al hacer una serie de pruebas al calentarse y enfriarse, para poder hacer estas pruebas necesitamos de un programa que pueda enviar Gcode a la placa de la impresora, el programa que utilice se llama **pronterface**


 Para poder hacer esta prueba la placa debe estar conectada a la computadora y a la corriente, luego para conectarse a la impresora desde la computadora solo hay que abrir el programa y este va a detectar el puerto, y solo hay que seleccionarlo, probablemente tambien selección de forma correcta los demás valores para conectarse si todo esta correcto al momento de dar click en conectar se debera conectar sin errores.
 

 Al ya estar conectado enviaremos el siguiente texto a la computadora **M303 E0 S205 C7**, lo que este comando de g code significa es lo siguiente
* **M303:** Este comando indica que haremos al prueba de calibración de los valores de PID
* **E0:** Esto significa que llevaremos la prueba en el extrusor 0 pues como solo tiene uno mi impresora es el unico que hay que calibrar
* **S205:** Significa que el hotend se calentará hasta los 205 grados para hacer la prueba
* **C7:** Significa que la prueba se llevará a cabo 7 veces, esto es para tener unos valores mas exactos, tambien se pueden hacer menos pero podría llevar a inexactitudes o se podrian hacer mas pero llevaria mas tiempo y puede que las optimizaciones no valgan la pena




 Al finalizar la prueba el programa en mi caso dio la siguiente información:
 
```C
>>> M303 E0 S215 C7
 SENDING:M303 E0 S215 C7
 PID Autotune start
 bias: 52 d: 52 min: 214.02 max: 223.35
 bias: 50 d: 50 min: 214.14 max: 216.67 Ku: 50.40 Tu: 13.60
 Classic PID
 Kp: 30.24 Ki: 4.45 Kd: 51.41
 bias: 50 d: 50 min: 213.83 max: 216.41 Ku: 49.39 Tu: 13.44
 Classic PID
 Kp: 29.63 Ki: 4.41 Kd: 49.76
 bias: 48 d: 48 min: 214.22 max: 216.20 Ku: 61.76 Tu: 13.11
 Classic PID
 Kp: 37.06 Ki: 5.65 Kd: 60.71
 bias: 51 d: 51 min: 213.75 max: 215.94 Ku: 59.37 Tu: 14.25
 Classic PID
 Kp: 35.62 Ki: 5.00 Kd: 63.47
 bias: 49 d: 49 min: 213.98 max: 216.20 Ku: 56.37 Tu: 13.11
 Classic PID
 Kp: 33.82 Ki: 5.16 Kd: 55.41
 **PID Autotune finished! Put the last Kp, Ki and Kd constants from below into Configuration.h
 #define DEFAULT_Kp 33.82
 #define DEFAULT_Ki 5.16
 #define DEFAULT_Kd 55.41
```


 Los valores de al final son los que debemos poner en la configuracion de el Marlin, en el archivo Config.h Aproximadamente en la linea 656 es donde empiezan, en mi caso por defecto los valores son los siguientes:
 
```make
// Creality Ender-3
 #if ENABLED(PID_PARAMS_PER_HOTEND)
 // Specify up to one value per hotend here, according to your setup.
 // If there are fewer values, the last one applies to the remaining hotends.
 #define DEFAULT_Kp_LIST { 21.73, 21.73 }
 #define DEFAULT_Ki_LIST { 1.54, 1.54 }
 #define DEFAULT_Kd_LIST { 76.55, 76.55 }
 #else
 #define DEFAULT_Kp 21.73
 #define DEFAULT_Ki 1.54
 #define DEFAULT_Kd 76.55
 #endif
#endif
```
 

 Y como los valores que tengo para el Kp es 33.82, para Ki es 5.16 y para Kd es 55.41 pues son los que cambiare dejando el anterior en lo siguiente:
 

```make
// Creality Ender-3
 #if ENABLED(PID_PARAMS_PER_HOTEND)
 // Specify up to one value per hotend here, according to your setup.
 // If there are fewer values, the last one applies to the remaining hotends.
 #define DEFAULT_Kp_LIST { 33.82, 33.82 }
 #define DEFAULT_Ki_LIST { 5.16, 5.16 }
 #define DEFAULT_Kd_LIST { 55.41, 55.41 }
 #else
 #define DEFAULT_Kp 33.82
 #define DEFAULT_Ki 5.16
 #define DEFAULT_Kd 55.41
 #endif
#endif
```
 
## Temperatura



 Cuando cambie de hotend este traía un termistor aparte y como era diferente tenia una resistencia diferente que necesita
 ser especificada en el firmware de Marlin, lo que hice fue que en la descripcion de el hotend que compre, este tenia una
 descripcion de el termistor que este decia ***"Incluye 100K NTC B 3950 termistor."*** y solo busque ese modelo y agregue a la busqueda "Marlin" y encotre que para ese modelo el valor que se tiene que colocar es de **11**, cuando este valo es incorrecto el termistor se puede calentar mucho o poco y cambiar mucho la calidad de las impresiones. Este valor se cambia en la linea 535 en Configuration.h
 
## Extrusor



 Como cambie el extrusor por defecto a el extrusor BondtechBMG el cual es de extrucion directa, este extrusor necesita una cantidad diferente de pasos para poder extruir la misma cantidad de material, existe una formula para poder tener la cantidad de pasos exactos que especificar, pero al buscar en internet me econtre que para este extrusor la cantidad de pasos son **415** en comparacion a los **93** que tiene por defecto, en este caso no se necesita editar el marlin (aunque se puede) para modificar este valor, en la pantalla de mi ender 3, en **Configuration> AdvancedConfiguration> Steps> Extruder** e ingresamos el valor y lo guardamos, para finalizar solo hay que guardar los cambios para que estos permanezcan después de que se apague la impresora
 


