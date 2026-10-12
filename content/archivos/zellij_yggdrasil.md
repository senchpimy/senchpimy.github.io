---
title: "Servir Jupyter y Zellij por Yggdrasil"
date: "06 Oct 2026"
tags: ["Networking", "Yggdrasil", "Jupyter", "Zellij", "Systemd", "UFW", "Server", "Python"]
---

En la escuela tengo que usar una laptop que funciona bien para trabajos simples, pero si quiero analizar y procesar grandes cantidades de datos preferiría usar la gráfica de mi computadora de escritorio. Para lograrlo pensé en servir un JupyterLab y ejecutar todo desde ahí. También pensé que, si necesito hacer otras cosas además de Python, necesitaría mi terminal.

Hacerlo en una red local es muy fácil, pero quiero acceder desde cualquier lado. Necesito que esté disponible de la misma forma que lo hice con el servidor de Ollama que usé en un hackatón en 2024.

**Resultado en una línea:** JupyterLab y una terminal (Zellij) de mi PC de escritorio, accesibles desde el navegador de cualquier dispositivo conectado a Yggdrasil, sin abrir puertos en el router, sin IP pública y sin dominio.

### El servidor

Pensé en rentar un servidor aparte, pero uno con el hardware que ya poseo saldría muy caro para el uso que le doy, y además ya tengo ese hardware.
Entonces, como en el hackatón de 2024, consideré dos opciones: un proxy inverso hacia mi PC o un túnel de Cloudflare —algo parecido a lo que ya
había contado en mi [entrada de Ngrok](/archivos/ngrok_reverse_proxy/)—. El problema del túnel es que, sin cuenta, la URL cambia en cada ejecución;
para mantenerla fija tendría que usar una cuenta y un dominio.

Entonces recordé que existe Yggdrasil.

### Yggdrasil

**[Yggdrasil](https://yggdrasil-network.github.io/)** es una red en malla descentralizada que funciona como un
**overlay** sobre internet. Donde cada nodo se conecta con otros y entre todos se arma un árbol de rutas,
así que no hay un servidor central y no hace falta abrir puertos en el router ni tener una IP pública.

Al tener un cifrado end-to-end, los nodos intermedios solo enrutan el tráfico sin ver el contenido de los paquetes y además verifica 
la identidad de cada nodo con su llave, así que nadie puede hacerse pasar por ti.

Todo dentro de Yggdrasil es **IPv6**. A cada nodo se le asigna una dirección única dentro del rango **200::/7**,
derivada de su llave pública. Por eso es siempre la misma, sin importar dónde estés ni cuál sea tu IP, y por eso 
me servía para exponer servicios sin depender de un dominio ni de un túnel con cuenta y que la IP se mantuviera constante.

Yggdrasil crea la interfaz **tun0** y le asigna esa IPv6. Se calcula a partir del `PrivateKey` de `/etc/yggdrasil.conf`, por lo tanto es la misma reinicios y solo cambia si se regenera la llave. 

Para ver la IP:

```sh
ip -brief addr show tun0
```

![Salida de ip -brief addr show tun0](/pro_img/yggdrasil_ip_tun0.png)

La topología seria la siguiente:

```tikz
\begin{tikzpicture}[box/.style={draw, rounded corners, minimum width=2.8cm, minimum height=1.1cm, align=center, font=\small}]
  \node[box] (laptop) at (0,0) {Laptop\\(navegador)};
  \node[box, dashed] (mesh) at (5,0) {Red mesh\\Yggdrasil};
  \node[box] (pc) at (10,0) {PC de escritorio\\(GPU)};
  \node[box] (jup) at (8.5,-2.5) {JupyterLab\\\texttt{:8888}};
  \node[box] (zel) at (11.5,-2.5) {Zellij web\\\texttt{:8082}};

  \draw[<->] (laptop) -- node[above, font=\scriptsize] {cifrado E2E} (mesh);
  \draw[<->] (mesh) -- node[above, font=\scriptsize] {\texttt{tun0}} (pc);
  \draw[->] (pc) -- (jup);
  \draw[->] (pc) -- (zel);
\end{tikzpicture}
```

### El certificado

El servidor web de Zellij exige TLS si no escucha en `127.0.0.1`,
así que generé un certificado autofirmado con **SAN** para la IP de
Yggdrasil (y también para `127.0.0.1` y `localhost`) usando una configuración de openssl:

```sh
mkdir -p ~/Documentos/yggdrasil/zellij/certs

cat > openssl-san.cnf <<EOF
[req]
distinguished_name = dn
x509_extensions = v3
prompt = no
[dn]
CN = yggdrasil-zellij
[v3]
subjectAltName = IP:200:956c:8ab5:399d:126f:5a0:f718:4d39,IP:127.0.0.1,DNS:localhost
basicConstraints = CA:FALSE
extendedKeyUsage = serverAuth
EOF

openssl req -x509 -newkey rsa:4096 -nodes -days 3650 \
  -keyout ~/Documentos/yggdrasil/zellij/certs/key.pem \
  -out ~/Documentos/yggdrasil/zellij/certs/cert.pem \
  -config openssl-san.cnf
```

Al ser autofirmado, el navegador mostrará una advertencia la primera vez que se conecta, pero 
puedes aceptarla manualmente o importar `cert.pem` como certificado de confianza en tu laptop.

### Zellij

Zellij es un multiplexor de terminal como tmux, pero con otras características. Desde su versión **0.44**
tiene un servidor web con el que puedes conectarte a tus sesiones desde el navegador. Expuse este servicio
por **Yggdrasil** y así conseguí una terminal a mi PC desde el navegador, sin importar dónde esté. Hablo más del multiplexor en su [entrada de Zellij](/archivos/zellij/).

Con la IP y el certificado, solo hay que arrancar el servidor apuntando a esa IP. Si lo corres sin `--daemonize` se queda en primer plano, que es justo lo que necesita **systemd**:

```sh
YGG_IP=$(ip -brief addr show tun0 | awk '{print $3}' | cut -d/ -f1)

zellij web --start \
  --ip "$YGG_IP" \
  --port 8082 \
  --cert ~/Documentos/yggdrasil/zellij/certs/cert.pem \
  --key  ~/Documentos/yggdrasil/zellij/certs/key.pem
```

El acceso queda protegido por un **token de login** que se crea una sola vez y no se puede recuperar después, así que hay que guardarlo:

```sh
zellij web --create-token
zellij web --create-read-only-token   # solo lectura
zellij web --list-tokens
```

### Jupyter

Lo instalé en un entorno virtual aislado con **uv**, para no interferir con el Python del sistema:

```sh
uv venv ~/Documentos/yggdrasil/jupyter/venv
uv pip install --python ~/Documentos/yggdrasil/jupyter/venv/bin/python jupyterlab
```

El certificado es igual que el de Zellij pero con `CN = yggdrasil-jupyter`, generado con el mismo `openssl-san.cnf` (cambiando el nombre) y guardado en `~/Documentos/yggdrasil/jupyter/certs/`.

La contraseña se genera con:

```sh
~/Documentos/yggdrasil/jupyter/venv/bin/python -c "from jupyter_server.auth import passwd; print(passwd())"
```

Eso imprime un hash `argon2:...` que se pega en la configuración. La configuración va en `jupyter_server_config.py`: ahí pongo el puerto, el certificado, la carpeta raíz y la contraseña. Dejo el `token` vacío para que el login sea con contraseña y no con el token en la URL:

```python
c = get_config()  # noqa
c.ServerApp.port = 8888
c.ServerApp.open_browser = False
c.ServerApp.allow_remote_access = True
c.ServerApp.root_dir = "/home/plof"

c.ServerApp.certfile = "/home/plof/Documentos/yggdrasil/jupyter/certs/cert.pem"
c.ServerApp.keyfile  = "/home/plof/Documentos/yggdrasil/jupyter/certs/key.pem"

c.ServerApp.password = "argon2:..."
c.IdentityProvider.token = ""
```

Como la configuración no está en `~/.jupyter`, hay que indicarle a Jupyter dónde buscarla con `JUPYTER_CONFIG_DIR`. Eso se hace en el script de arranque, que se explica en la siguiente sección.

### El firewall (ufw)

El firewall ya lo había visto en [Preparar un Servidor](/archivos/servidor/), pero aquí fue donde me atoré. Primero, aunque `ufw.conf` decía `ENABLED=yes`, **ufw estaba inactivo**, así que lo activé. Pero al activarlo quedó en `deny (incoming)` y **dejó de verse la página desde otra máquina**.

La primera regla es permitir la interfaz de Yggdrasil:

```sh
sudo ufw allow in on tun0
```

Como Yggdrasil es **IPv6 puro**, hay que asegurarse de que `IPV6=yes` esté en `/etc/default/ufw`. Así la regla se crea tanto para v4 como para **v6**.

El segundo problema fue el **peering**. El nodo no tenía **ningún** peer (`yggdrasilctl getPeers` vacío) porque ufw bloqueaba el descubrimiento **multicast** (UDP **9001**) y las conexiones **link-local** en la interfaz de la red local. Se veía en `dmesg` así:

```
[UFW BLOCK] ... PROTO=UDP SPT=9001 DPT=9001
[UFW BLOCK] ... SRC=fe80::... DST=fe80::...:44941 PROTO=TCP ... SYN
```

Así que permití el tráfico link-local (solo red local, no enrutable):

```sh
sudo ufw allow from fe80::/10 comment "Yggdrasil link-local peering"
```

![Estado de ufw tras permitir la interfaz y el link-local](/pro_img/yggdrasil_ufw_status.png)

*ufw activo con la interfaz `tun0` y el rango `fe80::/10` permitidos.*

### Acceso desde cualquier parte (la red pública)

Por defecto el archivo venía con `Peers: []`, o sea que **solo se conectaba a la LAN** por multicast y no a la red global. Para entrar desde cualquier lado hay que unir el nodo a la malla pública agregando peers. Los saqué de la lista pública (`quic://`) y los puse en `/etc/yggdrasil.conf`:

```hjson
Peers: [
  quic://109.107.177.127:65535
  quic://129.80.167.244:23165
  quic://146.103.107.222:65535
  quic://193.93.119.42:1443
  quic://23.184.48.86:1443
  quic://212.34.131.160:65535
  quic://[2a0b:4142:ce0::2]:65535
]
```

Antes de reiniciar conviene validar que el archivo no quedó roto, y luego reiniciar:

```sh
sudo yggdrasil -useconffile /etc/yggdrasil.conf -normaliseconf >/dev/null && echo OK
sudo systemctl restart yggdrasil
sudo yggdrasilctl getPeers
```

![Tabla de peers de Yggdrasil](/pro_img/yggdrasil_getpeers.png)

*El nodo ya tiene peers en la malla pública por QUIC y TLS.*

Con eso la tabla de rutas subió y el nodo quedó alcanzable por toda la red de Yggdrasil.

### Seguridad

El cifrado end-to-end protege el **transporte**, pero no el **acceso**. Con `ufw allow in on tun0`, cualquier nodo de la red Yggdrasil puede llegar a los puertos 8888 y 8082 de mi PC, y lo que hay detrás es una terminal completa y ejecución de código arbitrario. Lo único que lo impide es la contraseña de Jupyter y el token de Zellij, así que:

- Usa una contraseña larga para Jupyter y guarda bien los tokens de Zellij (con uno de solo lectura para cuando no necesites escribir).
- Lo ideal es restringir los puertos solo a la IP de Yggdrasil de tu laptop, que es estable. Primero se borra la regla general y luego se agregan las específicas:

```sh
sudo ufw delete allow in on tun0
sudo ufw allow in on tun0 from <IP_YGG_LAPTOP> to any port 8888 proto tcp
sudo ufw allow in on tun0 from <IP_YGG_LAPTOP> to any port 8082 proto tcp
```

### Resultado

Con todo esto se puede trabajar desde cualquier dispositivo que **también** esté conectado a Yggdrasil, aprovechando la gráfica y el hardware de la PC de escritorio:

```
JupyterLab: https://[200:956c:8ab5:399d:126f:5a0:f718:4d39]:8888/lab   (pide contraseña)
Zellij web: https://[200:956c:8ab5:399d:126f:5a0:f718:4d39]:8082       (pide token)
```

![Sesion de Zellij web: a la izquierda la terminal de la de escritorio (Arch, Ryzen 7 7700X, Radeon RX 7900 XTX) y a la derecha la laptop (Gentoo, i7-1260P, Iris Xe) conectada a esa sesion por Yggdrasil](/pro_img/zellij_yggdrasil.png)

*Zellij web sirviendo la sesion de la de escritorio: a la izquierda el `neofetch` del pc (Arch, Ryzen 7 7700X y Radeon RX 7900 XTX) y a la derecha el de la laptop (Gentoo, i7-1260P e Iris Xe) ya conectada a esa misma sesion a traves de Yggdrasil.*

![Notebook de JupyterLab comprobando el hardware disponible: 8 nucleos del Ryzen 7 7700X, la GPU Radeon y PyTorch con ROCm detectando `AMD Radeon Graphics`](/pro_img/zellij_yggdrasil2.png)

*Notebook de JupyterLab verificando el hardware desde el navegador: cuenta los nucleos del Ryzen 7 7700X, lista la GPU Radeon y confirma que PyTorch (con ROCm) detecta la `AMD Radeon Graphics`, todo corriendo en la de escritorio.*

### Limitaciones

- Ambos dispositivos necesitan tener Yggdrasil instalado y funcionando.
- La latencia depende de los peers que te toquen en la malla.
- Si la PC se apaga o se suspende, no hay acceso. Habría que desactivar la suspensión o configurar Wake-on-LAN.

### Ver también

Estas entradas cubren por separado las piezas que fui juntando aquí:

- [Preparar un Servidor](/archivos/servidor/): configuración y seguridad básica de un servidor Linux (incluido el firewall con ufw).
- [Ngrok para exponer un puerto local](/archivos/ngrok_reverse_proxy/): el túnel que menciono al inicio.
- [Subdominios](/archivos/subdominios/): Nginx y DNS para varios servicios.
- [Gitea](/archivos/gitea/): self-hosting de Git.
- [Páginas Estáticas](/archivos/estaticas/): servir sitios estáticos con Nginx.
