---
title: "hyperland"
date: 2024-06-08
---
Hyperland es un compositor de wayland (osea un administrador de ventanas) y este al ser mas simple y minimalista
para poder tener un sistema completo se necesita muchos otros programas diferentes

## Hyperland

Para la configuracion de este use la configuracion ya existente de [Hyde](https://github.com/prasanthrangan/hyprdots) ya que esta contiene scripts
que configuran y declaran ciertas variables en el sistema para tener la menor cantidad de problemas de compatibilidad con otros programas, lo que
modifique en este caso fue el teclado y algunas configuraciones de la teclas:

```
input {
    kb_layout = es
    follow_mouse = 1

    touchpad {
        natural_scroll = no
    }

    sensitivity = 0
    force_no_accel = 1
}
```
Diferencias entre el que esta por defecto y el mio

```
12,14c12,14
< $term = kitty
< $editor = code
< $file = dolphin
---
> $term = alacritty
> $editor = v
> $file = nautilus
15a16
> exec-once =  swww init
19,20c20
< bind = Alt, F4, exec, $scrPath/dontkillsteam.sh # close focused window
< bind = $mainMod, Delete, exit, # kill hyprland session
---
> bind = $mainMod+Shift, Q, exit, # kill hyprland session
23,24c23,24
< bind = Alt, Return, fullscreen, # toggle the window between focus and fullscreen
< bind = $mainMod, L, exec, swaylock # launch lock screen
---
> bind = $mainMod, M, fullscreen, # toggle the window between focus and fullscreen
> bind = $mainMod, B, exec, swaylock # launch lock screen
26,27c26,27
< bind = $mainMod, Backspace, exec, $scrPath/logoutlaunch.sh # launch logout menu
< bind = Ctrl+Alt, W, exec, killall waybar || waybar # toggle waybar
---
> bind = $mainMod+Ctrl, P, exec, $scrPath/logoutlaunch.sh # launch logout menu
> bind = Ctrl, Escape, exec, killall waybar || waybar # toggle waybar
30c30
< bind = $mainMod, T, exec, $term # launch terminal emulator
---
> bind = $mainMod, RETURN, exec, $term # launch terminal emulator
32,33c32,33
< bind = $mainMod, C, exec, $editor # launch text editor
< bind = $mainMod, F, exec, $browser # launch web browser
---
> #bind = $mainMod, C, exec, $editor # launch text editor
> #bind = $mainMod, F, exec, $browser # launch web browser
37,38c37,40
< bind = $mainMod, A, exec, pkill -x rofi || $scrPath/rofilaunch.sh d # launch application launcher
< bind = $mainMod, Tab, exec, pkill -x rofi || $scrPath/rofilaunch.sh w # launch window switcher
---
> bind = $mainMod, R, exec, pkill -x rofi || $scrPath/rofilaunch.sh d # launch application launcher
> #bind = $mainMod, Tab, exec, pkill -x rofi || $scrPath/rofilaunch.sh w # launch window switcher
> #bind = $mainMod, Tab, exec, workspace, previous
> bind=$mainMod,TAB,workspace,previous
60,63d61
< # Move between grouped windows
< bind = $mainMod CTRL , H, changegroupactive, b
< bind = $mainMod CTRL , L, changegroupactive, f
< 
65,68c63,66
< bind = $mainMod, P, exec, $scrPath/screenshot.sh s # partial screenshot capture
< bind = $mainMod+Ctrl, P, exec, $scrPath/screenshot.sh sf # partial screenshot capture (frozen screen)
< bind = $mainMod+Alt, P, exec, $scrPath/screenshot.sh m # monitor screenshot capture
< bind = , Print, exec, $scrPath/screenshot.sh p # all monitors screenshot capture
---
> #bind = $mainMod, P, exec, $scrPath/screenshot.sh s # partial screenshot capture
> #bind = $mainMod+Ctrl, P, exec, $scrPath/screenshot.sh sf # partial screenshot capture (frozen screen)
> #bind = $mainMod+Alt, P, exec, $scrPath/screenshot.sh m # monitor screenshot capture
> #bind = , Print, exec, $scrPath/screenshot.sh p # all monitors screenshot capture
71c69
< bind = $mainMod+Alt, G, exec, $scrPath/gamemode.sh # disable hypr effects for gamemode
---
> #bind = $mainMod+Alt, G, exec, $scrPath/gamemode.sh # disable hypr effects for gamemode
164a163,167
> 
> 
> binds{
> allow_workspace_cycles=true
> }
```

## Waybar

Al ser muy minimalista hay que instalar una barra superior y en este utilizo waybar pero luego me gustaria cambiarla a **eww**, esta es la configuracion

config
```
{
	"layer": "top",	
	"position": "top",
    "height": 20,


    "modules-left": ["hyprland/workspaces", "sway/mode", "hyprland/window"],
    "modules-center": [],
    "modules-right": ["pulseaudio","network", "backlight", "clock", "tray"],


	"hyprland/window": {
    	"format": "{}",
    	"max-length": 150
},



    "tray": {
        "icon-size": 18,
        "spacing": 15
},


    "clock": {
        "format": "{:%a %b %e  %R}",
        "interval": 30
},

    "network": {
        "interface": "wlp4s0", 
        "format-wifi": "   WiFi-On",
        "format-disconnected": "睊   Disconnected",
        "interval": 60
},


	"backlight": {
    	"device": "intel_backlight",
    	"format": "{icon}  {percent}%  ",
    	"format-icons": ["","","",""],
    	"interval": 60
},

    "network": {
        // "interface": "wlp2s0", // (Optional) To force the use of this interface
        "format-wifi": "{essid} ({signalStrength}%) ",
        "format-ethernet": "{ifname}: {ipaddr}/{cidr} ",
        "format-disconnected": "Disconnected ⚠"
    },

    "pulseaudio": {
        "format": " {icon} {volume}% ",
        "format-bluetooth": "  {volume}%  ",
        "format-muted":"婢  Mute  ",
        "interval": 60,

        "format-icons": {
        "default": [""]
},
        "on-click": "pavucontrol"


}

}

    "hyprland/workspaces": {
        "disable-markup": true,
        "format": "{index}" 
        "disable-scroll": true,
		"format": "{name} {icon}",
		"format-icons": {
			"active": " ",
			"default": " "
		},
        "persistent_workspaces": {
            "1": [],
            "2": [],
            "3": [],
            "4": [],
        },
    },
```

style.css
```
* {
    font-family: "UbuntuMono Nerd Font";
    font-size: 13px;
}
window#waybar { 
    background-color: #225877; 
    color: #ffffff;    
}
.modules-left {
	background-color: #323232;
	padding: 0px 0px 0px 0px;
}
.modules-right {
	background-color: #323232;
	padding: 0px 5px 0px 0px;
}
#workspaces {
}
#workspaces button {
	padding: 0px 11px 0px 11px; 
 	min-width: 1px;
	color: #888888;
}
#workspaces button.active {
	background-color: #46474a;
}
#workspaces button.focused { 
	padding: 0px 11px 0px 11px; 
	background-color: #285577;
	color: #ffffff;
}
#mode { 
	 background-color: #900000;
	 color: #ffffff;
     padding: 0px 5px 0px 5px;
     border: 1px solid #2f343a;
}
#window {
	 color: #ffffff;
	 background-color: #285577;
     padding: 0px 10px 0px 10px;
}
window#waybar.empty #window {
	background-color: transparent;
	color: transparent;
}
window#waybar.empty {
	background-color: #323232;
}
#network, #temperature, #backlight, #pulseudio, #battery {
    padding: 0px 15px 0px 15px;
}
#clock {
	margin: 0px 15px 0px 15px;
}
#network.disconnected {
    color: #ff5555;
}

```
## Swww

Tambien se necesita un fondo de pantalla y el programa mas simple para cumplir cone sta tarea es swww el cual
no requiere de configuracion mas que cuando se utiliza el comando y eso depende de la imagen, este inicia automáticamente
cuando inicia Hyperland

## Rofi

Rofi es un programa muy simple que funciona tanto en xorg como en wayland solo hay que tener la versión correcta instalada,
para este use la configuracion por defecto que viene en hyde

## Dunst

El progrma que se encarga de mostrar las notificaciones también use la modificación por defecto de hyde

