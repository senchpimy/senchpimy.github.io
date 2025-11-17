---
title: "Ngrok Para Exponer un Puerto Local a Internet"
date: "03 Feb 2023"
---


# Introducción: Cómo Exponer un Puerto Local a Internet con ngrok

Cuando desarrollamos una aplicación o un servicio en nuestra máquina local, a veces necesitamos acceder a él desde fuera de nuestra red local.
Podríamos estar mostrando un prototipo a un cliente.
El método tradicional implicaría configurar un servidor público, gestionar un dominio y configurar la red, lo cual puede ser complejo y lento.

Una solución mucho más sencilla y rápida es usar una herramienta de túneling como ngrok.
Esta utilidad crea un túnel seguro desde un servidor público de ngrok directamente a un puerto específico de nuestra computadora.
En esencia, nos proporciona una URL pública que redirige todo el tráfico hacía nuestra aplicación local, sin necesidad de modificar nuestro router o firewall.

Para empezar a usar ngrok, primero debemos instalarlo en nuestro sistema. La página oficial proporciona el siguiente comando para sistemas basados en Debian/Ubuntu:

```bash

curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
  | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
  && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
  | sudo tee /etc/apt/sources.list.d/ngrok.list \
  && sudo apt update \
  && sudo apt install ngrok

```

Como yo estoy en un sistema basado en Arch Linux, usaré el siguiente comando:

```bash
paru -S ngrok
```

Tenemos que registrarnos en la página oficial de ngrok para obtener un token de autenticación. Ya con el token deberemos ejecutar el siguiente comando para autenticar nuestra instalación:

```bash
ngrok config add-authtoken TU_TOKEN_AQUI
```

Y finalmente para poder usar ngrok (empezar a servir la página), simplemente ejecutamos el siguiente comando:

```bash
ngrok http --url=URL 80
```

Esto creará un túnel desde la URL pública proporcionada por ngrok hacía el puerto 80 de nuestra máquina local. Ahora, cualquier persona que acceda a esa URL podrá interactuar con nuestra aplicación local como si estuviera en un servidor público.

Y por último yo tuve que configurar mi archivo de hosts para que la URL proporcionada por ngrok apunte a mi localhost.

```bash
sudo nano /etc/hosts
# 127.0.0.1     localhost
```

