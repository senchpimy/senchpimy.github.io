---
title: "Instalando Gentoo"
date: "27 Oct 2024"
tags: ["Linux", "Gentoo", "Installation", "OS"]
---

Gentoo es una distribucion de linux en la cual todo es compilado, decidi instalar
este sistema en mi laptop, pues es la que mas se benficiaria de una mejora
de performance, posiblemente incluso sobre el rendimiento de la bateria, pero mi laptop ya contaba
con arch linux y no queria formatear el disco ni perder los archivos de configuracion
de los programas que ya tenia instalados, asi que tuve que instalar el gentoo sobre el
arch

## La instalación normal

La ventaja principal de Gentoo es el poder compilar los programas y tener un build
especifico para la computadora en especifico, así se puede aprovechar el procesador,
la arquitectura y los recursos del dispositivo al máximo y
se obtiene un sistema hecho a la medida. El procedimiento estándar para gentoo es más o menos el siguiente:

- Se arranca con un liveusb
- Se particiona y formatea el disco
- Se descarga un stage3, el cual es el sistema base ya empaquetado y este se descomprime.
- Ya con el sistema en su lugar se configura el `make.conf` (`CFLAGS`, `MAKEOPTS`, `USE`, `ACCEPT_LICENSE`, etc.), se elige el
**perfil** de Portage
- Después se montan `proc`, `sys` y `dev`
- Se entra al `chroot` y dentro del chroot se hace `emerge --sync`,
se actualiza `@world` y se instala el
kernel, el bootloader y los servicios del sistema.
- Finalmente se crea el usuario, se configura la red y se reinicia.

## El servidor de compilación

Mi laptop es una tiene un i7-1260P, que para compilar todo
Portage se queda corta. Por eso usé otra máquina como servidor de compilación, cree un usuario
en esta otra maquina que tenia en mi red local, esta maquina cuenta con Arch Linux 
y en el home de ese usuario puse un stage 3 de gentoo, esto para poder tener un chroot de Gentoo 
en y desde ahí compilaba los binarios pues era considerablemente mucho mas rapido.

El flujo que adopté para todo fue siempre el mismo:

1. `emerge --buildpkg <paquete>` en el chroot remoto (a veces con `nohup`).
2. Copiar los `.gpkg.tar` a mi máquina.
3. `emaint binhost --fix` para indexarlos.
4. `emerge --usepkgonly <paquete>` en local.

## La instalacion sobre Arch

Al yo no querer formatear mi laptop ni perder mis configuraciones intente
reutilizar la estructura de particiones que ya existentes e instalé Gentoo
encima de Arch, montándolo desde un chroot.
El `fstab` quedó conservando la estructura original.

Esto es posible hacerlo sin errores, pero al ser mi primera vez instalando gentoo,
sin querer durante un tiemp mi máquina fue un híbrido Arch y Gentoo,
pues tenia `pacman` y `portage` escribiendo sobre el mismo
`/usr` y queriendo instalar paquetes segun las convenciones de cada uno.


## Los primeros problemas

Al finalizar la instalacion use Hyprland como entorno grafico, al poco de arrancar,
`hyprctl` fallaba con un `symbol lookup error` en
`libre2.so.11` (le faltaba un símbolo de `absl`). La causa raíz era justamente el
híbrido: los binarios de Arch en `/usr/lib` traían el namespace de abseil `2601`,
mientras que las librerías de Gentoo en `/usr/lib64` traían el `2508`. El loader
mezclaba las dos pilas y rompía el ABI.

La solución fue recompilar en mi PC, con `--buildpkg`, todo lo involucrado y
traerlo: `abseil-cpp`, `re2` (con el namespace unificado) y todos los paquetes de
`hypr*`,`hyprland`, `hyprutils`, `hyprgraphics`, `hyprlang`, `hyprcursor`,
`hyprwire`, `hyprtoolkit`, `hyprland-guiutils`, etc.

Pero este error expuso que al instalarlo sobre arch, no se eliminaron los paquetes de Arch,
para resolverlo yo pense que eliminando todos los paquetes de arch con pacman era necesario para 
mantener el sistema como solo gentoo, pues gentoo guardaba sus archivo en rutas diferentes,
pero esto rompio todo el sistema, no podia bootear asi que desde la liveusb se compile los paquetes esenciales 
para poder bootear, y los demas paquetes los termine de compilar en el remote host.

Como `/usr` era compartido
entre Arch y Gentoo, al desinstalar los paquetes de Arch se borraron archivos
que la base de datos de Portage seguía creyendo instalados. Tuve el mismo problema 
en donde tenia paquetes que me marcaban como instalados
pero con librerias faltantes.

Como por ejemplo con:

- **EGL/Mesa:** `/usr/share/glvnd/egl_vendor.d/50_mesa.json` no existía, así que
  `eglInitialize` fallaba.
- **XKB:** `Couldn't find file "rules/evdev"` porque `/usr/share/X11/xkb/` no
  estaba en disco aunque el paquete se daba por instalado. Re-emergí
  `x11-misc/xkeyboard-config`.
- **OpenGL/GLES3:** CMake no encontraba `OPENGL_INCLUDE_DIR` ni GLES3, y era que
  `media-libs/mesa` estaba sin el flag `gles2`.
- **`seatd`/`libseat`:** Hyprland crasheaba con `failed to open a seat` porque el
  binario cacheado venía con `-elogind`; lo recompilé con `+elogind`.
- **Headers de `hyprpm`:** faltaban cabeceras de `pango`, `fribidi`, `libinput`,
  `wayland-server`, `librsvg`, `cairo`…
- **`gst-plugins-base`** estaba con `-wayland`, así que faltaba el símbolo
  `gst_gl_display_wayland_new_with_display` y Nautilus no abría.
- **GTK/GSettings:** `gsettings-desktop-schemas` estaba incompleto, lo que
  provocaba el crash de `antialiasing` en `gnome-control-center` y Nautilus.

Con `qcheck` tenia +45k archivos faltantes en 318 paquetes. Para resolverlo tuve que
reinstalar todo con `emerge --keep-going --oneshot --nodeps --usepkg`. Al final, de los
318 paquetes rotos solo quedaron 2 triviales, `gentoo-kernel`, por sus artefactos
de systemd-boot que no uso, y `zathura-pdf-mupdf`.

### Configuración de Portage (`/etc/portage/make.conf`)

```bash
COMMON_FLAGS="-O2 -pipe -march=x86-64-v3"
CFLAGS="${COMMON_FLAGS}"
CXXFLAGS="${COMMON_FLAGS}"
MAKEOPTS="-j2"

CPU_FLAGS_X86="aes avx avx2 f16c fma3 mmx mmxext pclmul popcnt rdrand sha sse sse2 sse3 sse4_1 sse4_2 ssse3"

ACCEPT_LICENSE="*"
VIDEO_CARDS="intel i965 iris"
INPUT_DEVICES="libinput synaptics"

L10N="es es-ES en"
LINGUAS="es es_ES en"

USE="unicode nls openrc-force vulkan opengl encode alsa pulseaudio dbus udev elogind"
LC_MESSAGES=C.UTF-8

# Binary packages
FEATURES="${FEATURES} getbinpkg"
EMERGE_DEFAULT_OPTS="${EMERGE_DEFAULT_OPTS} --getbinpkg --binpkg-respect-use=n"

FEATURES="${FEATURES} -multilib-strict"
ACCEPT_KEYWORDS="amd64 ~amd64"
```
