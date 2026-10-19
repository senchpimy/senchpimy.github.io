---
title: "gault"
date: "24 Oct 2022"
tags: ["Go", "Samba", "Server", "Networking"]
---
## Gault: un OpenMediaVault minimalista escrito en Go

 Gault es una reinterpretacion de OpenMediaVault, pero esta es más simple,
 escrita solo con Go, y en lo que he probado, este proyecto fue inspirado en la capacidad de montar discos externos y usarlos para un servidor samba
 desde la interfaz web, esto debido al problema que tuve como me paso cuando use
 ese programa.

 Por el momento al diferencia de OpenMediaVault, este programa todavía no tiene soporte para hacer servidores ftp y nfs,
 pero en algún momento lo agregaré, otro lado negativo de mi programa es que los posibles errores que puedan suceder no son reportados en el GUI y algunos no son muy claros. 
 En mi programa también se pueden modificar la variables globales de samba. Cuenta igual con un parte en donde muestra el uso de cada disco en el sistema
 
## Qué puede hacer hoy

La primera versión era bastante más limitada: montaba discos, creaba shares de Samba y mostraba el uso de disco. Con el tiempo fui completando las partes que faltaban.

### Discos

- Lista los discos montados con `df` y los dispositivos detectados con `lsblk`.
- Permite montar un disco por UUID y desmontarlo.
- Guarda la relación UUID → punto de montaje en `/usr/local/gault/disks`.
- En el arranque monta automáticamente los discos configurados y evita remontar los que ya están montados.

### Samba

- Crear y eliminar shares desde la web.
- Editar la sección `[global]` de `smb.conf`.
- Validar la configuración con `testparm` antes de aplicarla.
- Recargar Samba con `smbcontrol` (o `systemctl reload`/`restart` como respaldo) sin reiniciar el servidor.
- Si la configuración nueva es inválida, se restaura automáticamente el `smb.conf` anterior.

### NFS y FTP

Estas eran dos de las carencias que mencionaba en el borrador original, y ya están implementadas:

- **NFS**: listar, crear y eliminar exportaciones en `/etc/exports`, con validación de rutas, hosts y opciones, y recarga mediante `exportfs -ra`.
- **FTP**: administración de usuarios de `vsftpd` y control del servicio (iniciar, detener, reiniciar y habilitar al arranque).

### Usuarios

- Creación de usuarios del sistema para Samba y FTP.
- Contraseñas gestionadas mediante `chpasswd` y `smbpasswd`, sin exponerlas en la línea de comandos.
- Validación de nombres de usuario y contraseñas.

### Firewall y servicios

- Página de `ufw` con estado, apertura/cierre de puertos, borrado de reglas y activación/desactivación.
- Estado de los servicios del sistema (NFS, Samba, FTP, SSH) con acciones de inicio, parada y reinicio.

### Dashboard y errores

- Uso de CPU por núcleo con `gopsutil`.
- Uso de cada disco mediante gráficos circulares, con colores según el porcentaje ocupado.
- Registro de errores visible en `/errores` y notificaciones flotantes en el resto de páginas.

Esta última parte también responde a otra crítica del borrador: antes los errores solo aparecían en la terminal o en un archivo de log, y algunos eran difíciles de interpretar. Ahora cualquier fallo relevante se muestra en la interfaz y queda registrado.

### Autenticación

- Login con sesiones firmadas y persistentes.
- Contraseñas con bcrypt, manteniendo compatibilidad con el formato antiguo en texto plano.
- Logout real y protección de todas las rutas de administración.

## Cómo está construido

Gault es un único paquete `main`, sin framework web. La estructura es deliberadamente sencilla:

| Archivo | Responsabilidad |
|---|---|
| `main.go` | Rutas HTTP, inicialización y composición de las páginas |
| `login.go` | Sesiones, login y verificación de contraseñas |
| `systemManagment.go` | Discos, montajes y persistencia por UUID |
| `sambamod.go` | Configuración de Samba y recarga segura |
| `nfsmod.go` | Exportaciones NFS |
| `ftpmod.go` | Usuarios y servicio `vsftpd` |
| `firewall.go` | Reglas de `ufw` |
| `systemStatus.go` / `buttons.go` | Estado y control de servicios |
| `log.go` | Registro de errores en memoria y en disco |
| `templates/` | Vistas HTML y hoja de estilos |

Las dependencias externas son pocas: `gorilla/sessions` para las cookies de sesión, `gopsutil` para las métricas del sistema, `gopkg.in/ini.v1` para leer y escribir `smb.conf`, y `golang.org/x/crypto` para bcrypt. Todo lo demás es biblioteca estándar.

La interfaz usa `html/template` y un iframe para el contenido, con un sidebar fijo y una hoja de estilos común. No hay JavaScript de framework ni proceso de build para el frontend: solo unas pocas funciones para las notificaciones y los botones de servicios.

## Instalación y uso

Gault necesita ejecutarse como **root**, porque llama a herramientas privilegiadas del sistema.

Requisitos habituales en Debian/Ubuntu:

```bash
sudo apt install samba nfs-kernel-server vsftpd ufw
```

Compilación e instalación:

```bash
make build
sudo make install
sudo /usr/bin/gault
```

Por defecto escucha en `http://localhost:3000`. El puerto se puede cambiar con `PORT`, y la clave de firma de sesiones con `GAULT_SECRET`.

Si no existe `/usr/local/gault/passwords`, Gault crea un usuario `admin` con una contraseña aleatoria y la muestra una sola vez por consola.

## Lo que Gault no hace (todavía)

Es importante ser honesto con el alcance:

- No formatea, particiona ni crea sistemas de archivos. Para eso sigo usando herramientas del sistema.
- No gestiona RAID, SMART ni copias de seguridad.
- No incluye HTTPS; está pensado para ejecutarse detrás de un proxy inverso o en una red local de confianza.
- No tiene roles ni múltiples administradores: el acceso al panel es único.
- No tiene protección CSRF explícita; la mitigación actual se apoya en cookies `SameSite=Lax`.
- Depende de Linux, `systemd` y las herramientas instaladas en el sistema. No es portable a otros sistemas operativos.
- La interfaz está en español y el soporte de traducciones no existe todavía.

## Lo que aprendí

La parte más valiosa del proyecto no fue la interfaz, sino aprender a tratar las operaciones del sistema con cuidado. Al principio muchas funciones llamaban a `log.Fatal` si algo fallaba, lo que podía tumbar todo el servidor por un error puntual. Ahora los errores se devuelven, se registran y se muestran al usuario.

También aprendí que modificar archivos de configuración del sistema requiere validar y poder deshacer. En Samba, por ejemplo, un share mal escrito podía dejar el servicio sin arrancar. La solución fue validar con `testparm`, recargar de forma controlada y restaurar el archivo anterior si algo falla.

Y, sobre todo, aprendí que un panel de administración debe ser predecible: mostrar qué está pasando, no ocultar los errores y no ejecutar acciones destructivas sin confirmación.

## Próximos pasos

Algunas ideas que me gustaría añadir:

- Soporte de HTTPS y autenticación en dos pasos.
- Tokens CSRF en los formularios.
- Información SMART y estado de salud de los discos.
- Cuotas por usuario y por share.
- Copias de seguridad programadas.
- Notificaciones por correo o webhook.
- Traducciones y temas de interfaz.

## Conclusión

Gault no pretende reemplazar OpenMediaVault ni competir con soluciones como TrueNAS. Es una herramienta pequeña, escrita en Go, pensada para un caso concreto: gestionar discos externos y comparticiones de red desde una interfaz web sin arrastrar un ecosistema completo.

Con el tiempo pasó de ser un experimento para montar discos y crear shares a un panel que cubre Samba, NFS, FTP, usuarios, firewall y monitorización básica. Sigue siendo un proyecto personal, pero hoy lo uso como la alternativa ligera que quería tener cuando empecé.
