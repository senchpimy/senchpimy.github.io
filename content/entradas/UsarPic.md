---
title: "Programando un Pic16F887 desde Arch Linux en 2025"
date: "15 Sep 2025"
---

## Introducción
En este artículo, te guiaré a través del proceso de programación de un microcontrolador PIC16F887 utilizando Arch Linux.
A pesar de que existen muchas herramientas y métodos para programar microcontroladores, aquí nos enfocaremos en una solución sencilla y efectiva utilizando herramientas de línea de comandos.

## Requisitos previos
Antes de comenzar, asegúrate de tener lo siguiente:
- Un microcontrolador PIC16F887.
- Un programador compatible con PIC, en mi caso estoy usando el **PICkit 2**.
- Un cable USB para conectar el programador a tu computadora.
- Arch Linux instalado en tu computadora.

## Instalación de herramientas necesarias
Primero, necesitamos instalar las herramientas necesarias para detectar el PIC y para cargar el programa en él. Para esto usaremos el paquete del AUR pk2cmd, pues estamos usando un PICkit 2.
Existe un problema conocido con el paquete `pk2cmd` en el AUR, lo que pasa que es que el enlace de descarga ya es obsoleto, y esto es conocido desde 2023, pues en el sitio
web del paquete tmb nos dice la solución, y es descargar el archivo desde otro enlace. 

![Error de descarga del paquete pk2cmd](/pk2cmd_error.png)

Aplicando esta correcion, al final el PKGBUILD quedaría asi, y para instalarlo hay que obtener todos los archivos que vienen en el enlace [de aquí](https://aur.archlinux.org/packages/pk2cmd-plus) (puede ser copiandolos, pero como se hace un hash de el archivo, lo mejor sería hacer un wget) y ponerlos en una carpeta, y luego ejecutar `makepkg -si` en esa carpeta.:
```bash
# Maintainer: BxS <bxsbxs at gmail dot com>

pkgname='pk2cmd-plus'
pkgver=1.21rc1_1.63.148
pkgrel=2
pkgdesc="PICkit 2 CLI software with updated DeviceFile and udev rules"
arch=('i686' 'x86_64')
url='http://www.microchip.com/pickit2'
license=('custom')
depends=('libusb-compat')
provides=('pk2cmd')
conflicts=('pk2cmd')
install=$pkgname.install
source=('http://ww1.microchip.com/downloads/en/DeviceDoc/PICkit2_PK2CMD_WIN32_SourceV1-21_RC1.zip'
        'PK2DeviceFile_v1.63.148.zip::https://web.archive.org/web/20201128020840/http://www.microchip.com/forums/download.axd?file=0;749972'
        'pk2_devicefile_osfile_paths.patch'
        '60-pickit2.rules'
        'LICENSE')
md5sums=('6f93ede97be484ab7859626a9156a5d6'
         '3983ce4f45992318c4f0037c8d1acf9f'
         'c3972d96ac997eb35ae76a861eb4ae0c'
         'a5cf4ffff54af41c4d1cf8c97d007dcf'
         '6d53baa09ac4ac3907d503992349b17a')
[[ ${DLAGENTS[1]} == 'http::/usr/bin/curl'* ]] && DLAGENTS[1]="${DLAGENTS[1]::-3} -A firefox %u"

build() {
  cd $srcdir/pk2cmd/pk2cmd
  patch -Np1 -i $srcdir/pk2_devicefile_osfile_paths.patch
  make linux
}

package() {
  install -Dm 755 $srcdir/pk2cmd/pk2cmd/pk2cmd $pkgdir/usr/bin/pk2cmd
  install -Dm 644 $srcdir/PK2DeviceFile.dat $pkgdir/usr/share/pk2/PK2DeviceFile.dat
  install -Dm 644 $srcdir/pk2cmd/release/PK2V023200.hex $pkgdir/usr/share/pk2/PK2V023200.hex
  install -Dm 644 $srcdir/60-pickit2.rules $pkgdir/etc/udev/rules.d/60-pickit2.rules
  install -Dm 644 $srcdir/LICENSE $pkgdir/usr/share/licenses/$pkgname/LICENSE
}
```

Una vez que ejecutaste `makepkg -si` en la carpeta donde tienes los archivos, se deberia instalar sin problemas. Para que el sistema detecte el programador, hay que recargar las reglas de udev con los siguientes comandos: 

```bash
sudo udevadm control --reload-rules\
sudo udevadm trigger
```


Después para saber si se instalo y detecta el programador, conectamos el PICkit 2 a la computadora y ejecutamos:

```bash
pk2cmd -P
```

Si todo esta bien, deberia salir algo como esto:


```bash
Auto-Detect: Found part PIC16F887.


Operation Succeeded

```

## Compilando el programa
Ahora que tenemos todo listo, vamos a crear un programa simple para el PIC16F887. Para este ejemplo, vamos a hacer que un LED parpadee.
Este sería el programa:

```c
#include <xc.h>

#pragma config FOSC = INTRC_NOCLKOUT // Oscilador interno, pines I/O disponibles
#pragma config WDTE = OFF       // Watchdog Timer deshabilitado
#pragma config PWRTE = OFF      // Power-up Timer deshabilitado
#pragma config MCLRE = ON       // Pin MCLR/VPP funciona como Master Clear Reset
#pragma config CP = OFF         // Protección de código desactivada
#pragma config CPD = OFF        // Protección de datos EEPROM desactivada
#pragma config BOREN = ON       // Brown-out Reset habilitado
#pragma config IESO = ON        // Internal/External Switchover mode habilitado
#pragma config FCMEN = ON       // Fail-Safe Clock Monitor habilitado
#pragma config LVP = OFF        // Low-Voltage Programming deshabilitado

#define _XTAL_FREQ 8000000

void main(void) {
    OSCCON = 0x70;

    TRISBbits.TRISB0 = 0;
    PORTBbits.RB0 = 0;

    while(1) {
        PORTBbits.RB0 = 1;
        __delay_ms(500);

        PORTBbits.RB0 = 0;
        __delay_ms(500);
    }
    return;
}
```

Y para compilarlo usamos `xc8`, que se instales con el paquete **microchip-mplabxc8-bin**

```bash
paru -S microchip-mplabxc8-bin
```

Y para poder compilarlo necesitaremos unas definiciones que no se encuentran en el paquete y hay que descargarlas desde [este enlace](https://packs.download.microchip.com/), debajo de cada pack dice cual es el microchip que 
soporta, y buscamos el que dice PIC16F887, y descargamos el pack, que en mi caso es el **Microchip PIC16Fxxx Series Device Support (1.7.162)**.
Una vez descargado y descomprimido el Device Pack, su estructura interna contiene los archivos de soporte que necesitamos. Sin embargo,
en las versiones modernas del compilador XC8, simplemente copiar archivos no es suficiente. Debemos decirle explícitamente al compilador dónde encontrar estos nuevos archivos de soporte al momento de compilar.

La forma correcta de hacerlo es usando el flag `-mdfp`.

Asumiendo que has guardado el código anterior en un archivo llamado `main.c`, el comando final para compilarlo es el siguiente. Este comando le indica al compilador que use los archivos de soporte 
que se encuentran dentro de la carpeta `xc8` del paquete que descargaste.

Primero, descomprime el archivo `.atpack` que descargaste (recuerda que es solo un archivo zip).
```bash
unzip ~/Downloads/Microchip.PIC16Fxxx_DFP.1.7.162.atpack -d ~/Downloads/PIC16Fxxx_DFP
```

Ahora, compila tu `main.c` apuntando a la carpeta `xc8` dentro del directorio descomprimido:

```bash
xc8-cc -mcpu=16F887 -mdfp=~/Downloads/PIC16Fxxx_DFP/xc8/ main.c
```

*   `-mcpu=16F887`: Especifica nuestro microcontrolador.
*   `-mdfp=...`: Le da la ruta a la carpeta que contiene los archivos de soporte del dispositivo (`Device Family Pack`).

Si la compilación no muestra errores, se habrá generado un archivo **`main.hex`** en tu carpeta. ¡Este es el programa listo para ser cargado en el PIC!

## Cargando el programa en el PIC

Ahora que tenemos nuestro archivo `main.hex`, el último paso es usar `pk2cmd` para grabarlo en el microcontrolador. Asegúrate de tener tu PIC16F887 conectado correctamente al programador PICKit 2.

El comando para subir y verificar el programa es:

```bash
pk2cmd -P -M -Fmain.hex
```

*   `-P`: Auto-detecta el PIC conectado.
*   `-M`: Graba el archivo en la memoria de programa.
*   `-Fmain.hex`: Especifica el archivo a grabar.

Si todo sale bien, la terminal mostrará un mensaje de "Verification Succeeded" y el LED conectado a tu PIC16F887 comenzará a parpadear.
