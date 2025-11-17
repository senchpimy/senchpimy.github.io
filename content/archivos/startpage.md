---
title: "Startpage"
date: "30 Jan 2023"
---

 Una startpage es una pagina que sale al principio de tu navegador cada que abres un nuevo tab o al abrirlo por primera vez, yo lo hice en dos navegadores, en **Qutebrowser** y en **Firefox**, en en primero es bastante simple pues tan solo basta con modificar el archivo de configuración de este programa, para esto hay que entrar en la carpeta de **~/.config/qutebrowser**, y en esta carpeta hay que modificar (o crear el archivo y agregar lo siguiente) el archivo **config.py**, por comodidad creamos la variable que contenga el archivo html principal, es decir el que se va a cargar (en el caso de Qutebrowser carga cualquier cosa que contenga esta variable, sea un archivo local, o una url, incluso un puerto local), en este caso le llame **StartPage** y esta variable sera ocupada en las dos siguientes propiedades/funciones, por lo que el código necesario para tener una startpage en Qutebrowser seria el siguiente.
 
 ```py
 StartPage='***Path/port/url***'
 c.tabs.background = True
 c.url.default\_page = StartPage
 config.set('url.start\_pages',StartPage)
 config.load\_autoconfig(False)
 ```
 
 En donde "c", es un valor de configuración propio de Qutebrowser, asi que no hay que definirlo y las demás configuraciones permiten que al abrir el programa este abra por defecto en startpage y tambien cuando se abre una nueva tab.
   
  
  

 En Firefox es un poco más dificil de usar archivos locales, pues por cuestiones de seguridad esto se implemento, para poder tener la startpage con cada nueva tab abierta para poder lograr esto hay que instalar una extensión llamada **New Tab Override**, y en esta hay que ir a la configuración de la extensión y seleccionar archivo local, esta extensión solo puede usar un archivo por lo que hay que tener los estilos y el html en un mismo archivo, por cuestiones de seguridad parece que extenciones no pueden ejecutar código, asi que en este caso lo mejor seria usar una url y un puerto.
 


