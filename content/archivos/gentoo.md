---
title: "Instalando Gentoo"
date: "27 Oct 2024"
tags: ["Linux", "Gentoo", "Installation", "OS"]
---

Gentoo es una distribucion de linux en la cual todo es compilado, decidi instalar
este sistema en mi laptop, pues la que mas se benficiaria de una mejora
de performance incluso sobre el rendimiento de la bateria, pero mi laptop ya contaba
con arch linnux y no queria formatear el disco ni perder los archivos de configuracion
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

## La instalacion sobre Arch

Al yo no querer formatear mi laptop ni perder mis configuraciones intente
reutilizar la estructura de particiones que ya existentes e instalé Gentoo
encima de Arch, montándolo desde un chroot.
El `fstab` quedó conservando la estructura original.

Esto es posible hacerlo sin errores, pero al ser mi primera vez instalando gentoo,
sin querer durante un tiemp mi máquina fue un híbrido Arch y Gentoo,
pues tenia `pacman` y `portage` escribiendo sobre el mismo
`/usr` y queriendo instalar paquetes segun las convenciones de cada uno.

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

## Los primeros problemas

Al poco de arrancar, `hyprctl` fallaba con un `symbol lookup error` en
`libre2.so.11` (le faltaba un símbolo de `absl`). La causa raíz era justamente el
híbrido: los binarios de Arch en `/usr/lib` traían el namespace de abseil `2601`,
mientras que las librerías de Gentoo en `/usr/lib64` traían el `2508`. El loader
mezclaba las dos pilas y rompía el ABI.

La solución fue recompilar en chud, con `--buildpkg`, todo lo involucrado y
traerlo: `abseil-cpp`, `re2` (con el namespace unificado) y todos los paquetes de
`hypr*`,`hyprland`, `hyprutils`, `hyprgraphics`, `hyprlang`, `hyprcursor`,
`hyprwire`, `hyprtoolkit`, `hyprland-guiutils`, etc.

Yo pense que eliminando todos los paquetes de arch con pacman era necesario para 
mantener el sistema como solo gentoo, pero esto rompio todo el sistema, no podia bootear, 
desde la liveusb se compilaron los paquetes esenciales en el remote host, y termine de compilar
todo lo que necesitaba.

Como `/usr` era **compartido**
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

## Levantando la sesión y el escritorio

Con el sistema ya en pie, quedaba lo más laborioso: hacer arrancar la sesión y
volver a montar el escritorio. Al principio cualquier sesión **moría al
instante**, porque `ly` interpretaba `login_cmd = null` como el string literal
`"null"` y ejecutaba `zsh -c null ...`. Lo cambié a `login_cmd = ; exec "$@"` y
limpié los `config.ini.pacnew`, `.pacsave` y `._cfg0000_config.ini` que sobraban.
También `sudo` rechazaba la contraseña sin que yo escribiera nada (era `faillock`
con fallos acumulados; lo reseteé con `faillock --user plof --reset`), y la hora
salía en `Factory` en vez de `America/Mexico_City` por un `/etc/localtime` mal
enlazado.

Con eso la sesión ya levantaba, y fui armando el escritorio pieza por pieza.
Instalé los **plugins de Hyprland** con `hyprpm`: **Hyprspace** y los
`hyprland-plugins` oficiales (dejando `hyprbars` activo); **imgborders** lo dejé
deshabilitado porque crasheaba a Hyprland por un conflicto de decoración. Para
que compilaran reinstalé `dev-libs/wayland` y `dev-lang/lua-5.4.8`, repunté
`lua.pc` a `lua5.4.pc` y creé enlaces `lua*.h` en `/usr/include/`; además repuse
el binario de `hyprpm` y sus headers por un bug de archivos `root-owned`.
Después vino **Quickshell**: lo instalé (compilado en el remoto), migré sus
botones de `Hyprland.dispatch` a `Quickshell.Io`, arreglé el `qt6ct` para que
cargaran los iconos y le armé un **perfil de energía TLP** con un
`TlpProfiles.qml` que rota entre Ahorro, Balanceado y Rendimiento sobre los
servicios `tlp-manager` y `kb-backlight`.

Los detalles más pequeños también tenían lo suyo: **Flameshot** no funcionaba en
Wayland porque faltaban `grim` y `slurp` y no había keybind (los reinstalé, puse
`useGrimAdapter=true` y agregué el bind de `Print`); el **audio y el brillo**
estaban partidos porque `pamixer` hablaba con un pulseaudio viejo mientras
quickshell leía de PipeWire (activé `pipewire`/`wireplumber`/`pipewire-pulse`,
instalé `sof-firmware` para la tarjeta Alder Lake y `brightnessctl`); y en el
**tema** el `gtk.css` de Matugen usaba `!important` (que GTK no soporta) y no
importaba `libadwaita.css`, así que lo reescribí con plantillas separadas para
GTK3 y GTK4, habilité el flag `cascadiacode` de `media-fonts/nerdfonts` para los
símbolos Nerd Font de Kitty y copié completos los iconos de `kora`, que en
`/usr/share` estaban corruptos.

Quedó sin cerrar el lock screen de quickshell, que rechazaba la contraseña
correcta y no dejaba cambiar de TTY con `Ctrl+Alt+F#`; sospeché de `pam_faillock`
o de que el usuario no estaba en el grupo `tty`, pero se resolvió por fuera de
este reporte.

## Los programas y configs del día a día

Ya sobre una base sana, fui dejando mis herramientas:

- **Zen Browser:** compilado en chud (`zen-bin`) porque el `ffmpeg-compat` local
  fallaba; luego migré a mano mi perfil viejo con sus 6 extensiones y 13 Zen Mods.
- **Anki:** arrancaba con error por `libgssapi_krb5` (dependencia de PyQt6) y por
  duplicados de PyQt6 que ensombrecían el sistema; con `mit-krb5` y quitando los
  duplicados quedó.
- **Rust:** actualicé `rustc` a 1.97.1 compilándolo en chud (el `emerge` local se
  cortó por timeout y dejó un `librustc_driver` a medias), instalé
  `llvm-core/clang` para `bindgen` y compilé mi proyecto **marmol** en 14m25s.
- **GNOME:** `gnome-control-center` (con el panel de WiFi bien habilitado) y
  Nautilus.
- **Syncthing:** tenía **dos instancias** (el servicio del sistema con home en
  `/var/lib/syncthing` y mi config personal), por lo que no sincronizaba bien con
  chud; pasé el servicio a correr como `plof` con mi config y limpié 110 GB de
  copias duplicadas.
- **SSH:** configuré la llave `~/.ssh/gentoo` con su alias `Host gentoo`, y
  arreglé el servidor local (el `sshd` 10.3p1 y el `sshd-session` 10.4p1 estaban
  desfasados y rompían el handshake).
- **Huella digital:** `fprintd-enroll` daba `PermissionDenied` porque no había
  agente polkit; lo resolvió una regla en `/etc/polkit-1/rules.d/50-fprintd.rules`.

### Extras y ajustes menores

Además instalé y configuré un montón de cosas sueltas: `app-misc/cliphist` con
`gui-apps/wl-clipboard` (los watchers `wl-paste … cliphist store` ya arrancan en
Hyprland), `app-editors/vscodium`, `dev-python/pip`, `uv` y `pygments`, y creé un
ebuild propio para `net-misc/localsend-1.18.0`. También levanté `polkitd` con su
propio `/etc/init.d` en el runlevel `default`.

Entre los arreglos chicos: cambié el wallpaper de `swww` a **`awww`** (el daemon
cambió de nombre y vive en Codeberg), corregí el `rofi` que tenía un typo y
dependía de un `gsettings` inexistente, oculté los `.desktop` de Cisco Packet
Tracer, arreglé el ícono de Zen (`zen` vs `zen-icon`), y compilé **Xwayland** a
mano porque el paquete estaba corrupto (aunque `st` seguía sin abrir). También
arreglé `zsh-syntax-highlighting`, re-cloné un `pyenv` corrupto y reinstalé
varios paquetes de headers (`x11-misc`, `media-libs`, etc.).

### Pendientes

- Arrancar `hyprpolkitagent` en la sesión de usuario y terminar el registro de la
  huella (`fprintd-enroll`).
- Revisar los ~228 archivos de configuración en `/etc` y ~200 en
  `/etc/portage` con `dispatch-conf`.
- El `make.conf` sigue con `--binpkg-respect-use=n` (fuente de futuros
  desajustes de flags), y queda pendiente `emerge -uD @world` para cerrar las
  migraciones de `perl`/`python`.
- Hay detalles sin cerrar en el lock screen de quickshell, `hyprpm` y
  `fontconfig`.

## Reporte del sistema

Para cerrar, dejo cómo quedó la máquina.

### Software

| Campo | Valor |
|-------|-------|
| Distro | Gentoo Linux 2.18 |
| Kernel | 6.18.41-gentoo-dist-bin (PREEMPT\_DYNAMIC) |
| Init | OpenRC 0.63.3 |
| Perfil | `default/linux/amd64/23.0` |
| Escritorio | Hyprland (Wayland) |
| Shell | zsh 5.9.1 |
| Paquetes | 1491 |
| Bootloader | GRUB (EFI) |
| make.conf | Binary packages (`getbinpkg`) + `ACCEPT_KEYWORDS="amd64 ~amd64"` |

### Hardware

| Componente | Detalle |
|------------|---------|
| CPU | 12th Gen Intel Core i7-1260P (Alder Lake) — 12 núcleos / 16 hilos |
| Arquitectura | x86_64 (`-march=x86-64-v3`) |
| RAM | 15 GiB + 8 GiB de swap |
| GPU | Intel Iris Xe Graphics (Alder Lake-P GT2) |
| Almacenamiento | NVMe de 953.9 GB |
| Disco | `nvme0n1` |
| Entrada | libinput + synaptics |

### Particiones

La estructura de particiones es la que ya tenía, preservada tal cual sin formatear.

| Dispositivo | Tamaño | FS | Punto de montaje |
|-------------|--------|----|------------------|
| `nvme0n1p1` | 1 G | vfat | `/boot` (EFI) |
| `nvme0n1p2` | 952.9 G | ext4 | `/` (`noatime,errors=remount-ro`) |
| swapfile | 8 G | — | swap |

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
