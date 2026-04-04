---
title: "Configuración de zsh"
date: "15 Jan 2023"
tags: ["Shell", "Zsh", "Configuration", "Tools"]
---
 Zsh también conovida como Z shell es un intérprete de comandos para sistemas Unix, es la shell que viene por defecto en todas las mac.Es similar a la shell bash, pero en mi opinion tiene varias características por defecto que la hacen más moderna. Para aumentar sus capabilidades un administrador de plugins muy fácil de instalar, que ya incluye varios plugins, modificaciones y alias así como un prompt personalizado, este administrador de plugins se llama **Oh-My-Zsh**, lo malo de este es que yo siento que puede hacer la shell muy lenta al cargar por primera vez, así que lo desinstale y solo agregue lo que necitaba y prompt personalizado, lo demás lo deseche y siento que ahor atengo más control pues ahora se bien que hace cada cosa y el prompt tiene características que no pensé que podía tener así como le quite otras que no me gustaba que tuviera.
   
  
  

* **Cuztomizar el prompt:** El prompt es el texto que aparece antes del cursor en el terminal, y en este aparece información como el directorio, el estado del proyecto de git, el tiempo que tardo en ejecutarse un comando, etc. Así como modificar los colores y símbolos que salen, para lograr modiicar el prompt utilice un programa llamado starship, este programa soporta la mayoria de las shells y el proceso de insatlación y personalización esta en su [sitio web](https://starship.rs/); Yo tengo el siguiente archivo de configuración:

```toml

format = '[░▒▓█](red)[$os$username $sudo](bg:red black)[](red bg:blue)$custom$git\_status$status$cmd\_duration[](green)'
right\_format = """$character$time"""
add\_newline = false

palette = 'foo'

[palettes.foo]
red="#d12e5f"
blue="#324aa8"
orange="#ff9e64"
purple="#5a4a78"
pur="#9a348e"
green="#047e84"

[character] # The name of the module we are configuring is 'character'
success\_symbol = '[➜](bold green)'
error\_symbol = '[✗](bold red) '


[git\_status]
style="bg:orange black"
deleted="✘ ${count} "
modified="!${count} "
staged="+${count} "
ahead="⇡${count}"
untracked="?${count}"
format = "[ $all\_status$ahead\_behind ]($style)[ ](orange bg:green )"
up\_to\_date = '✓'

[status]
style = 'bg:green blink pur bold'
symbol = '🔴'
success\_symbol = '🔴'
format = '[$symbol$common\_meaning$signal\_name$maybe\_int]($style)'
map\_symbol = true
disabled = false

[sudo]
symbol = ''
disabled = false
format="as $symbol "

[time]
disabled = false
time\_format = "%H:%M"
format = "🕙$time($style) "


[username]
format="$user"
show\_always = true

[cmd\_duration]
style = 'bg:green blink pur bold'
format="[$duration]($style)"

[os]
disabled=false
format="$symbol"
[os.symbols]
Linux=" "


[custom.dir]
command = 'Dirpath' 
when = true
format = '[$output]($style)[](blue bg:orange)'
style="bg:blue bold"

```
 
 Lo que me da el siguiente prompt:
 
![](/pro_img/prompt.png)
* **Alias:** Los alias es un texto definido para que la shell lo intérprete como uno o varios comandos juntos con una o varias opciones, según lo que sea definido, todos mis alias están en mi archvio **.zshrc** pero aquí hay algunos
 ```sh
 alias ls="ls --color=auto" 
 alias diff='diff --color'
 alias gc='git commit -m'
 alias ga='git add'
 alias gu='git add -u'
 alias gs='git status'
 alias gr='git restore'
 alias gd='git diff'
 alias pac='sudo pacman'
 alias lf='lfrun'
 ```
* **Keybindings:** Los keybindings son combinaciones de letras que si las presiones ejecutaran ciertos comandos, en este caso tengo **Ctrl+e** el cual abrira el comando que actualmente estoy escribiendo en neovim para que lo pueda editar y **Ctrl+o** el cual abre lf en un modo en el cual puedo buscar el directorio en el cual tengo quiero hacer un cambio, los codigos para estos son los siguientes
 
 ```sh
#&&&&&&&&&&&&&&&&& SWITCH DIRS &&&&&&&&&&&&&&&&&&&&&&&&&&
lfcd () {
 tmp="$(mktemp)"
 lf -last-dir-path="$tmp" "$@"
 if [ -f "$tmp" ]; then
 dir="$(cat "$tmp")"
 rm -f "$tmp"
 [ -d "$dir" ] && [ "$dir" != "$(pwd)" ] && cd "$dir"
 fi
}
bindkey -s '^o' 'lfcd\n'

#&&&&&&&&&&&&&&&&& Edit Line &&&&&&&&&&&&&&&&&&&&&&&&&&
autoload edit-command-line; zle -N edit-command-line
bindkey '^e' edit-command-line
* **Sugestiones:** Cuando quiero escribir un comando con un archivo si presiono **tab** zsh va a tratar de autocompletar lo que estaba tratando de escribir con una sugerencia, el motor es bastante inteligente y puede automáticamente seleccionar archivos del tipo especifico del cual el comando requiere, pero para mejorar esto le puse dos configuraciones, la cual le permite buscar en los archivo que comiencen con un "." y que no distinga entre mayusculas y minusculas, así mismo que coloree las tipos de los archivos y que muestre el bloque blanco cuando se esta en el modo de selección.
 
autoload -U compinit
zstyle ':completion:\*' menu select
zmodload zsh/complist
compinit
\_comp\_options+=(globdots) # Include hidden files.
zstyle ':completion:\*' matcher-list '' 'm:{a-zA-Z}={A-Za-z}' 'r:|[.\_-]=\* r:|=\*' 'l:|=\* r:|=\*'
eval "$(dircolors)"
zstyle ':completion:\*' list-colors ${(s.:.)LS\_COLORS}
# FInalmente utilize syntax-highlighting para los comandos, para lograr esto tuve que instalar **zsh-syntax-highlighting** con pacman y luego activarlo con el siguiente código
 
 source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
 ```
