---
title: "Reloj Multiusos"
date: "21 Oct 2023"
---

En este proyecto use un despertador antiguo que no servia y lo "repare" y ademas añadi más fucnionalidades.


Primero use un **esp32** como microcontrolador para el proyecto, pues este ya tiene coneccion a wifi y bluetooth, use un display de 7 segmentos para matener el formato de la hora, específicamente use el TM1637, y el programa de la hora se ejecuta en el sgundo core de
el esp32. Ademas este usa los botones que el desperator ya traía para dar la hora.

Ademas le añadi una pantalla de e-ink, esto por que el despertador también traía una lampara y se la quite y le coloque esta pantalla de 7 colores, pues le quedaban de el mismo tamaño. Pero tuve problemas al usar la librería por que algunas cosas no funcionaban.

Por ejemplo en la librería hay unos headers que están mal escrito y hay que editar el código fuente para poder corregirlo, después por algun motivo cambiar la orientacion de la pantalla mediante la liberria no funcionaba, asi que tuve que implementar una pequeña funcion 
que se ejecuta cada que se quiera dibujar una linea, para cambiar las coordenadas para que estas tengan la rotacion correspondiente. El cambio especifico lo saque de el código fuente que se supone que lo haria desde la biblioteca.

Pero esto significa que fucniones como la escritura no funcionaba, asi que tuve que crear una fuente, pasarla a bitmap depues pasarla a código de C y finalmente implementar la lectura y la forma en la que cada pixel es dibujado, en este caso tuve un problema, pues
dibuje dos fuentes de diferentes tamaños, la grande funciono sin problemas, pero a pesar de ser el mismo código de C y estar en el mismo formato la fuente pequeña no se dibujaba de forma correcta, por lo que el formato en el que la fuente pequeña se guardo fue de 1 byte 
por pixel a diferencia de 1 bit por pixel que fue la grande, pues asi era solamente como la fuente pequeña se pudo dibujar correctamente.

Implemente también un mmodelador de graficas que gráfica las lineas solo con un array de numeros.

Y los datos que se grafican son los precios de criptomonedas, en este caso escogi *dogecoin*, *monero* y *etherum*.

Para obtener los datos de estos precios primero intente usar la API de *CoinMarketCap* pero el paquete gratuito de la API no me permitia acceder a datos historicos y como en este modelo quise tener los datos de el precio de cada criptomoneda en el periodo de un mes, pues 
era inutil, luego use una pagina que se llama **rate.sx** la cual da los datos de estas criptomonedas y puedo acceder a los ultimos 3o dias por separado, pero tengo que obetner la fecha actual y luego generar las llamadas especificas para obtner las fechas anteriores, entonces
tuve que primero obtener la fecha actual, lo intente mediante la pagina **http://worldclockapi.com/** pero esta pagina esta en constante reparacion y muchas veces durante las pruebas esta pagina estaba fuera de servicio. por lo que no podia seguir haciendo más pruebas si
esta pagina no funcionaba, por lo que termine usando la pagina **http://www.whattimeisit.com/**, la cual tenía que usar un poco más de memoria pues estaba parseando html en lugar de json que daba la otra pagina, pero finalmente esta logro ser más estable.

Y después de obtener la fecha actual y poder hacer las solicitudes de los datos necesarios a la pagina **rate.sx** funcionaba correctamente.... Pero algunas veces yo creo que la pagina pensaba que estaba intentando atacarla por medio de DDOS pues algunas veces 
negaba las solicitudes y no era confiable.

Finalmente intente usar la API de **CriptoCompare** pues esta tenía todo lo necesario, con usa sola solicitud tenía los datos de los 30 dias y no era necesarioobtener la fecha actual, lo unico malo y por lo que no puede usar esta API fue por que esta usaba el
protocolo **https** y todas las paginas que use anteriormente usaban **http** este cambio hacía que se crasheara todo el programa pues la liberia de requests web de el ESP32 parece no soportar https, por lo que finalmente decidi mostrar en la gráfica datos estaticos.

Me gustaria retomar este proyecto en algun momento y poder mejorarlo, para poder mostrar imagenes, pero tendria que impementar el algoritmo de floyd y un algoritmo para poder leer estos datos de imagen.

https://github.com/avishorp/TM1637/blob/master/examples/TM1637Test/TM1637Test.ino

Instalacion de librería:
https://www.waveshare.com/wiki/5.65inch_e-Paper_Module_(F)_Manual#C
https://www.waveshare.com/wiki/5.65inch_e-Paper_Module_(F)_Manual#ESP32
https://www.waveshare.com/wiki/E-Paper_ESP32_Driver_Board#Image_Processing_Algorithms
Codigo Fuente:
https://github.com/waveshareteam/e-Paper/tree/master/Arduino/epd5in65f
https://github.com/waveshareteam/e-Paper/tree/master/STM32/STM32-F103ZET6/User/GUI


Arduino Json:
https://arduinojson.org/v6/example/parser/

ESP32 WIFI:
https://docs.espressif.com/projects/arduino-esp32/en/latest/api/wifi.html#config
https://www.arduino.cc/reference/en/libraries/wifi/wifi.begin/
https://www.arduino.cc/reference/en/libraries/wifi/wifi.begin/
https://www.arduino.cc/reference/en/libraries/wifi/_

Img to code
https://javl.github.io/image2cpp/
