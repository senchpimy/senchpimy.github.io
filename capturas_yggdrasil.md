# Capturas pendientes para `zellij_yggdrasil.md`

> Estas capturas hay que tomarlas en la **máquina que tiene el servidor de Yggdrasil**
> (la de escritorio), no en la laptop. Hacerlas **una por una** y con el **fondo negro**.

## Comandos a capturar

1. `ip -brief addr show tun0` → va en la sección **Yggdrasil**.
2. `sudo yggdrasilctl getPeers` → va en la sección **Acceso desde cualquier parte**.
3. `sudo ufw status verbose` → va en la sección **El firewall (ufw)**.

## Cómo tomarlas

1. Abrir la terminal con **fondo negro** (sin transparencia ni blur).
2. Correr **un solo comando** por captura, para que cada imagen sea legible.
3. Tomar la captura con `slurp` + `grim` (Hyprland):

   ```sh
   grim -g "$(slurp)" captura.png
   ```

4. Guardar cada imagen en `static/pro_img/` con un nombre claro, por ejemplo:
   - `yggdrasil_ip_tun0.png`
   - `yggdrasil_getpeers.png`
   - `yggdrasil_ufw_status.png`
5. Referenciarlas en `content/archivos/zellij_yggdrasil.md` en su sección,
   con una descripción breve (alt text + pie de imagen), igual que las existentes:

   ```md
   ![Descripcion de la captura](/pro_img/yggdrasil_ip_tun0.png)

   *Pie de imagen describiendo lo que se ve.*
   ```
