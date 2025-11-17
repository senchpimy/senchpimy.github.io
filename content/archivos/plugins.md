---
title: "Configuración de Neovim"
date: "10 Aug 2022"
---
En esta entrada explicare todos los plugins que tengo en neovim y que funcion cumplen, asi sobre como están configurados en mi init.vim y por que esos y no otros
 
## Indentline



[Vim Indentline](https://github.com/Yggdroot/indentLine) es un plugin simple que solo agrega una barra como "|" cuando se detecta un indentLine, mis configuraciones son las siguientes
 
```vim
let g:indentLine\_char\_list = ['|', '¦', '┆', '┊']
let g:indentLine\_enabled = 0
nmap &ltspace&gtl &ltcmd&gtIndentLinesToggle&ltCR>
autocmd FileType python IndentLinesToggle
```
 

 Lo que hacen es que conforme existan mas indentLines el plugin mostrara la linea correspondiente en alguno de esos 4 posibles estilos,
 y la segunda configuracion hace que el plugin este apagado por defecto pues yo solo lo ocupo para python.
 La tercera linea hace cuando se apreite "Espacio+ l" el plugin se active o se desactive y la cuarta hace que cuando detecte un archivo de python se active automaticamente
 
## Rnvimr



[Rnvimr](https://github.com/kevinhwang91/rnvimr) es un plugin que hace que se pueda ejecutar el administrador de archivos ranger desde neovim, esto lo incluye con todos los comandos que tengas configurados en ranger 
 

```vim
nmap &ltspace&gtr &ltcmd&gtRnvimrToggle&ltCR>
```
 

 Esa unica linea de configuracion hace que con "Espacio+r" se abra el programa, en la documentacion se pueden ver mas opciones de su uso, se sale de la aplicacion con "q", si se ejecuta en la aplicacion de ranger el comando ":q" se cerrara ranger pero seguira existiendo un gran cuadrado en donde estaba la ventana de el programa para eso también cree el siguiente comando que con "Espacio + q" se cerrara el programa y el espacio donde estaba, ahora ya no la ocupo pues todo se cierra solo con "q" pero la configuracion era la siguiente
 

```vim
nmap &ltspace&gtq &ltcmd&gtq &ltbar>&ltcmd&gtq
```
 
## Markdown-previous.nvim



[Markdown-previous.nvim](https://github.com/iamcco/markdown-preview.nvim) es un plugin que como su nombre lo dice da una preview de un archivo Markdown (.md, .MD), para que este plugin funcione se debe tener instalado **yarn** y **node**, este plugin funciona con muchos tipos de archivos que crean archivos de texto, ademas que cualquier cambio se ve reflejado en tiempo real en la previsualizacion en el navegador que especifiques, en mi caso **qutebrowser** y para hacerlo solo use la linea de a continuacion
 

```vim
let g:mkdp\_browser = 'qutebrowser'
```
 
## Pywal



[Pywal](https://github.com/AlphaTechnolog/pywal.nvim) es un plugin que cambia el tema de neovim segun los colores que lee de Pywal, que es una programa que extrae la paleta de colores de una imagen, este plugin lee uno de los varios archivos que este produce (pues pywal puede obtener los colores en diferentes formatos) y lo utiliza para generar el tema de nvim, prefiero este plugin en lugar de [wal.vim](https://github.com/dylanaraps/wal.vim) aunque ambos cumplen la misma funcion pywal lo hace con la configuracion de neovim **"set termguicolors"**  que es necesaria para otros plugins mientras que wal.vim es incompatible con esta configuracion, para este plugin no existe cconfiguracion extra 
 
## Telescope.nvim



[Telescope.nvim](https://github.com/nvim-telescope/telescope.nvim) es un buscador multiusos de neovim, tiene varias funciones y muchas no las utilizo, solo lo ocupo para estas tres funciones
 

```vim
nmap &ltspace&gto &ltcmd&gtTelescope oldfiles&ltCR>
nmap &ltspace&gtf &ltcmd&gtTelescope find\_files&ltCR>
nmap &ltspace&gtb &ltcmd&gtTelescope buffers&ltCR>
```
 

 Lo que hacen es abrir los archivos recientemente editados en neovim, busca archivos y me permite moverme entre differentes buffers, esto con las siguientes teclas "Espacio+o"=Archivos recientemente editados
 "Espacio+f"=Buscar archivos
 "Espacio+b"=Mostrar los diferentes buffers abiertos

 

 Este plugin tiene muchas otras funciones, yo lo ocupo para moverme mas rapido entre mis archivos, este plugins requiere de otro plugin llamado plenary.nvim
 
## coc.nvim



[Coc.nvim](https://github.com/neoclide/coc.nvim) Es un plugin que funciona para atuocompletar código en diferentes lenguajes de programacion, se requiere mucha configuracion pero, existe una configuracion por defecto que esta disponible en la pagina de github del el programa, esa misma configuracion es la que uso y la que me funciona bien
 

```vim
" Some servers have issues with backup files, see ##9.
set nobackup
set nowritebackup

" Having longer updatetime (default is 4000 ms = 4 s) leads to noticeable
" delays and poor user experience.
set updatetime=300

" Always show the signcolumn, otherwise it would shift the text each time
" diagnostics appear/become resolved.
set signcolumn=yes

" Use tab for trigger completion with characters ahead and navigate.
" NOTE: Use command ':verbose imap &lttab>' to make sure tab is not mapped by
" other plugin before putting this into your config.
inoremap <silent><expr> <TA&>
 \ coc##m#visible() ? coc#pum#next(1):
 \ CheckBackspace() ? "\<Tab>" :
 \ coc#refresh()
inoremap <expr><S-TAB> coc##m#visible() ? coc#pum#prev(1) : "\<C-h>"

" Make <CR> to accept selected completion item or notify coc.nvim to format
" <C-g>u breaks current undo, please make your own choice.
inoremap <silent><expr> <CR> coc#pum#visible() ? coc#pum#confirm()
 \: "\<C-g>u\<CR>\<c-r>=coc#on\_enter()\<CR>"

function! CheckBackspace() abort
 let col = col('.') - 1
 return !col || getline('.')[col - 1] =~# '\s'
endfunction

" Use <c-space> to trigger completion.
if has('nvim')
 inoremap <silent><expr> <c-space> coc#refresh()
else
 inoremap <silent><expr> <c-@> coc#refresh()
endif

" Use `[g` and `]g` to navigate diagnostics
" Use `:CocDiagnostics` to get all diagnostics of current buffer in location list.
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" GoTo code navigation.
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Use K to show documentation in preview window.
nnoremap <silent> K :call ShowDocumentation()<CR>

function! ShowDocumentation()
 if CocAction('hasProvider', 'hover')
 call CocActionAsync('doHover')
 else
 call feedkeys('K', 'in')
 endif
endfunction

" Highlight the symbol and its references when holding the cursor.
autocmd CursorHold \* silent call CocActionAsync('highlight')

" Symbol renaming.
nmap <leader>rn <Plug>(coc-rename)

" Formatting selected code.
xmap <leader>f <Plug>(coc-format-selected)
nmap <leader>f <Plug>(coc-format-selected)

augroup mygroup
 autocmd!
 " Setup formatexpr specified filetype(s).
 autocmd FileType typescript,json setl formatexpr=CocAction('formatSelected')
 " Update signature help on jump placeholder.
 autocmd User CocJumpPlaceholder call CocActionAsync('showSignatureHelp')
augroup end

" Applying codeAction to the selected region.
" Example: `<leader>aap` for current paragraph
xmap <leader>a <Plug>(coc-codeaction-selected)
nmap <leader>a <Plug>(coc-codeaction-selected)

" Remap keys for applying codeAction to the current buffer.
nmap <leader>ac <Plug>(coc-codeaction)
" Apply AutoFix to problem on the current line.
nmap <leader>qf <Plug>(coc-fix-current)

" Run the Code Lens action on the current line.
nmap <leader>cl <Plug>(coc-codelens-action)

" Map function and class text objects
" NOTE: Requires 'textDocument.documentSymbol' support from the language server.
xmap if <Plug>(coc-funcobj-i)
omap if <Plug>(coc-funcobj-i)
xmap af <Plug>(coc-funcobj-a)
omap af <Plug>(coc-funcobj-a)
xmap ic <Plug>(coc-classobj-i)
omap ic <Plug>(coc-classobj-i)
xmap ac <Plug>(coc-classobj-a)
omap ac <Plug>(coc-classobj-a)

" Remap <C-f> and <C-b> for scroll float windows/popups.
if has('nvim-0.4.0') || has('patch-8.2.0750')
 nnoremap <silent><nowait><expr> <C-f> coc##oat#has\_scroll() ? coc#float#scroll(1) : "\<C-f>"
 nnoremap <silent><nowait><expr> <C-b> coc#float#has\_scroll() ? coc#float#scroll(0) : "\<C-b>"
 inoremap <silent><nowait><expr> <C-f> coc#float#has\_scroll() ? "\<c-r>=coc#float#scroll(1)\<cr>" : "\<Right>"
 inoremap <silent><nowait><expr> <C-b> coc#float#has\_scroll() ? "\<c-r>=coc#float#scroll(0)\<cr>" : "\<Left>"
 vnoremap <silent><nowait><expr> <C-f> coc#float#has\_scroll() ? coc#float#scroll(1) : "\<C-f>"
 vnoremap <silent><nowait><expr> <C-b> coc#float#has\_scroll() ? coc#float#scroll(0) : "\<C-b>"
endif

" Use CTRL-S for selections ranges.
" Requires 'textDocument/selectionRange' support of language server.
nmap <silent> <C-s> <Plug>(coc-range-select)
xmap <silent> <C-s> <Plug>(coc-range-select)

" Add `:Format` command to format current buffer.
command! -nargs=0 Format :call CocActionAsync('format')

" Add `:Fold` command to fold current buffer.
command! -nargs=? Fold :call CocAction('fold', <f-args>)

" Add `:OR` command for organize imports of the current buffer.
command! -nargs=0 OR :call CocActionAsync('runCommand', 'editor.action.organizeImport')

" Add (Neo)Vim's native statusline support.
" NOTE: Please see `:h coc-status` for integrations with external plugins that
" provide custom statusline: lightline.vim, vim-airline.
set statusline^=%{coc#status()}%{get(b:,'coc\_current\_function','')}

" Mappings for CoCList
" Show all diagnostics.
nnoremap <silent><nowait> <space>a :<C-u>CocList diagnostics<cr>
" Manage extensions.
nnoremap <silent><nowait> <space>e :<C-u>CocList extensions<cr>
" Show commands.
nnoremap <silent><nowait> <space>c :<C-u>CocList commands<cr>
" Find symbol of current document.
nnoremap <silent><nowait> <space>o :<C-u>CocList outline<cr>
" Search workspace symbols.
nnoremap <silent><nowait> <space>s :<C-u>CocList -I symbols<cr>
" Do defa< action for next item.
nnoremap <silent><nowait> <space>j :<C-u>CocNext<CR>
" Do defa< action for previous item.
nnoremap <silent><nowait> <space>k :<C-u>CocPrev<CR>
" Resume latest coc list.
nnoremap <silent><nowait> <space>p :<C-u>CocListResume<CR>
```
 
## nvim-web-devicons



[Nvim-web-devicons](https://github.com/kyazdani42/nvim-web-devicons) son solo iconos para otros programas como es **CHADtree**


![](./nvimicons.png)

##gitsigns.nvim



[Gitsigns.nvim](https://github.com/lewis6991/gitsigns.nvim) es un plugin que nos deja usar y ver muchas funciones relacionadas el programa git (control y manejo de versiones de software) para poder ver en un archivo que lineas fueron eliminadas, en que commits y cuando se agreagron otras lineas, entre mucas otras funciones, esta escrito en lua y para poder ocuparlo es necesario que neovim lo llame, en un archivo de configuracion de vimscript para neovim (init.vim) se necesitan las siguietes tres lineas
 

```vim
lua >> END
require('gitsigns').setup()
END
```
 

 El plugin tiene muchas otras configuraciones, pero por el momento no ocupo ninguna, el plugin necesita que neovim tenga un tema, de lo contrario lo que este plugin agrega tendra el color por defecto de la terminal
 
## vim-sorround



[Vim-sorround](https://github.com/tpope/vim-surround) es un plugin que por medio de comando cambia, elimina o añade elementos a una palabra, palabras o linea especificada, este no requiere de configuracion 
 
## suda.vim



[Suda.vim](https://github.com/lambdalisue/suda.vim) es un plugin que nos permite editar archivos como super usuario son necesidad de salir de neovim y de tener que rehacer los cambios, est eplugin tiene 2 configuraciones, una es para que automaticamente se detecte los archivos que necesten sudo para ser vistos o editados y al momento de guardarlo pida la contraseña, y la segunda es un texto personalizado que se muestra al momento de solicitar la contraseña, yo no tengo ninguna de estas opciones activadas
 
## Vim-Lastplace



[Vim-Lastplace](https://github.com/farmergreg/vim-lastplace) es un plugin que al momento de editar un archivo, cerrarlo y abrirlo de nuevo, el curso aparecera justo en la posicion anterior, justo antes de cerrarlo, tiene unas configuracions pero yo ocupo ninguna
 
## CHADtree



[CHADtree](https://github.com/ms-jpq/chadtree) es un plugin que habre un arbol de archivos en la parte derecha de la pantalla, es un poco redundante tener **Rnvimr**, **Telescope** y Chadtree pues cumplen casi la misma funcion pero las pocas diferencias que tienen, hace que me sirvan para cosas distintas.
 CHADtree tiene varias configuraciones pero yo no ocupo ninguna
 
## Lualine.nvim



[Lualine.nvim](https://github.com/nvim-lualine/lualine.nvim) es un plugin que modifica la linea de estado de neovim logrando mostar mas información que la linea por defecto de nvim, y mucho pas personalizable, yo uso la configuracion por default pero existem muchos temas que luego probare, esta es en promedio mas rapida que lightline y airline, dos plugins hechos para cumplir el mismo proposito al igual que otros plugins este necesita ser llamado desde lua por lo que si ya tienes el plugin **gitsigns** solo hay que agragar la siguiente linea una lina arriba o abajo de la linea central de la configuracion de gitsigns
 

```vim
require('lualine').setup()
```
 

 Si no tienes gitsigns hay que agregar todo lo siguiente
  
```vim
lua >> END
require('lualine').setup()
END
```
 
## Dashboard.nvim



[Dashboard.nvim](https://github.com/glepnir/dashboard-nvim) es un plugin que modifica el buffer de inicio de neovim, con este plugin se puede modificar mucho el buffer de inicio, yo no sabia como modificarlo y por eso cree mi propia version y meti los cambio en el código fuente de el plugin, ahora que ya lo se editar desde el init.vim voy a cambiarlo por el del repositorio original, ya viene "activado" por defecto, la configuracion se hace al igual que **gitsigns** y **lualine**


```lua
 local db = require('dashboard')
 db. ***valor-a-configurar***= *valor*
```


![](./dashboard1.png)
![](./dashboard2.png)

## Vim-cool



[Vim-cool](https://github.com/romainl/vim-cool) desactiva el destacado en las palabras que hace vim después de que terminas de buscar algo, y lo vuele a activar cuando buscas algo de nuevo, tiene solo una configuracion pero no la uso
 
## Vim-hexokinase



[Vim-hexokinase](https://github.com/RRethy/vim-hexokinase) vim hexokinase es un plugin que cuando detecta que el documento contiene un color escrito, ya sea en rgb, hex, o por nombre (red, purple, green, blue, etc) muestra en pantalla el color que que esta escribiendo, en mi caso esta configurado para colorear las letras de el color que representan, la unica configuracion que tengo es para poder lograr este efecto
 

```vim
let g:Hexokinase\_highlighters = ['backgroundfull']
```
 
## Hop.nvim



[Hop.nvim](https://github.com/phaazon/hop.nvim) es un plugin que nos deja saltar a donde sea en nuestro documento con solo unos pocos tecleos, al usar el comando :HopWord por ejemplo el programa va a resaltar la inicial de todas las palabras con una letra diferente, al presionar esta letra el programa nos llevará al inicio de la letra que seleccionamos
 Este programa tiene una configuracion similar a **gitsigns y lualine**


```lua
require'hop'.setup()
```
 
## Lf.nvim



[lf.nvim](https://github.com/lmburns/lf.nvim) lf es un plugin que hace lo mismo que el de Rnvimr, la diferencia es que Rnvimr es para el programa ranger, este programa es un administrador de archivos desde la terminal, lf es exactamente lo mismo.

 Entonce por que cambiar?
 Ranger esta escrito en python y lf en go, lo que hace a lf muchisimo mas rapido al momento de cargar, lf es casi instantaneo mientras que ranger tiene aproximada 3 segundos de carga, este tiempo disminuye si no ha pasado mucho tiempo desde que se abrio pero aun asi es mas lento que lf, ademas que con este plugin puedo ver imagenes que se encuentran en las carpetas, para que esto funcione debemos primero hacer que lf pueda hacer esto, yo segui el tutorial que viene en la wiki de lf, y por defecto para usar lf con imagenes necestamos ejecutar **lfrun** como dice la wiki de lf, después en la configuracion del plugin debemos cambiar el comando por defecto a **lfrun**, esto sse hace la siguiente manera
 Este programa tiene una configuracion similar a **gitsigns y lualine**


```lua
 require("lf").setup({
 default_cmd="lfrun"
 })
```
 

 Este plugin requiere de otros dos para funcionar correctamente toogleterm.nvim y [plenary.nvim](https://github.com/nvim-lua/plenary.nvim)

## Emmet-vim



[Emmet-vim](https://github.com/mattn/emmet-vim) es un plugin diseñado para documentos html y css, este plugin camcia palabras claves definidas por el usuario con snippets creados por el mismo usuario, este plugin también tiene un autocompletado de html basado en la selección y tags, este plugin es muy util y me ahorra mucho tiempo aunque no haga paginas web.
Mi configuracion para tener un snippet de la descripción de estos plugins es lo siguiente 


```vim
 let g:user\_emmet\_install\_global = 0
 let g:user\_emmet\_mode='a' "enable all function in all mode.
 autocmd FileType html,css EmmetInstall
 let g:user\_emmet\_settings = {
 \ 'html': {
 \ 'default\_attributes': {
 \ 'option': {'value': v:null},
 \ 'textarea': {'id': v:null, 'name': v:null, 'cols': 10, 'rows': 10},
 \ },
 \ 'snippets': {
 \ 'descplug':"&lth1>\n\t${child}|\n</h1>\n&ltdiv class=\"text\">\n&lta href=\"https://github.com/\"></a>\n</div>\n&ltdiv class=\"código\">\n</div>"
 \ },
 \ },
 \}
```


 Y para hacerlo funcionar solo tengo que escribir **descplug** en un documento html o css y luego en modo de comando escribir  **(control+y)**y lugo coma con el cursor posicionado en la ultima letra, y el plugin se va aencargar de autocompletar, existe una funcion que todavia no se como usar que es la de autocompletar html solo escribiendo llos nombres de las tags, la mayoria de comando de este plugin funcionan con **≶ C-y > ,**, pero por ejemplo si seleccionamos un caracter de un elemento de html que no sea el ultimo o el primero y apretamos **≶ C-y > u** temenos la opcion de agregar clase o id al elemento html, este plugin contiene muchas otras funciones de html

## Bullets.vim



[Bullets.vim](https://github.com/dkarter/bullets.vim) es un plugin que ocupo principalmente para documentos de markdown, lo unico que hace es agregar automaticamente los numeros y casillas de las listas que se ocupan en Markdown, es decir que si escribo algo inicando con "1. " y termino de escribir el plugin automaticamente agregara "2. " y me pondra un espacio después para escribir directamente, también funciona con "+", "-", "\*", "[]", este tiene varias configuraciones pero yo ocupo el default

## Impatient.nvim



[Impatien.nvim](https://github.com/lewis6991/impatient.nvim) es un plugin que disminuye el tiempo de carga de Neovim, en aproximadamente un 90% en promedio, su configuracion solo cambia el directorio en el cual el archivo de cache es guardado.

##Vim-table-mode



[Vim-table-mode](https://github.com/dhruvasagar/vim-table-mode) es un plugin para documentos markdown, lo que hace es que el procesos de hacer y formatear tablas en markdown mucho mas sencillo, solo con activar el modo con el comando **:TableModeEnable** el plugin cada vez que se detecte un "|" va a hacer un formato de los elementos, para crear la linea de separacion de después de la primera tabla de forma automatica(Es decir si la primera linea es "| name | address | phone |" la segunda tiene que ser la separacion de las tablas es decir "|------+---------+-------|") solo se inserta "||" en la linea siguiente y el plugin va a darle formato al resto, asi mimos cuando en una nueva linea se inserte un elemento con tantos caracteres que no quepan dentro de el espacio delimitado por las columnas ("|~~~~~~|") el plugin se encargara de arreglar todo el formato. Las configuraciones son sobre que caracteres se ocupan para las esquinas de las tablas, los caracteres de enmedio de las lineas de separacion de filas, etc.

## vim-matchup



[Vim-matchup](https://github.com/andymass/vim-matchup) es un plugin que identifica todas las plabars que sean iguales en un mismo documento de texto y te ayuda a moverte mas rapido entre estas, yo no tengo ninga configuracion de este plugin

##Vim-cursorword



[Vim-cursorword](https://github.com/itchyny/vim-cursorword) es un plugin simple y lo unico que hace es que cuando el cursor (sin omportar el modo) este en una palabra el plugin va a subrayar la palabra en la que esta el cursor y todas las palabras iguales. Este plugin no tiene configuracion

## Vim-choosewin



[Vim-choosewin](https://github.com/t9md/vim-choosewin) es un plugin para moverse facilmente entre las ventanas y tabs de vim, vim y neovim ya tienen esta funcion incluida, pero apenas estoy aprendiento vim y este plugin me ayuda a hacerlo de una forma mas visual, tal ves en el futuro lo deje de usar, las configuraciones requeridas son las siguientes


```vim
nmap - (choosewin)
let g:choosewin_overlay_enable = 1
```


La primera linea hace que cuando se apriete "-" el plugin se active y la segunda es para poner numeros en cada tab/division al momento de cambiar

##Targets.vim



[Targets.vim](https://github.com/wellle/targets.vim) es un plugin que expande la cantidad de objetos de vim, asi como los objetos pueden ser palabras, caracteres, parrafos. Pero este plugin agrega a esta lista de objetos todos lo que se encuentre dentro de los siguientes caracteres **(),[],{},"",'',`` , . ; : + - = ~ \_ \* ## | \ & $**  permitiendonos borrar (da$Caracter), eliminar e insertar (cin$caracter)
 Este plugin necesita de configuracion ya que por defecto las teclas necesarias para hacerlos funcionar son **"aiAI"** que son las teclas de insetar y agregar en vim y neovim, por lo que la configuracion que agregue para evitar esto es la siguiente
 TEST NO TERMINADO

```vim
let g:targets\_aiAI = ['<Space>a', '<Space>i', '<Space>A', '<Space>I']
```


## Bufferline.nvim



[Bufferline.nvim](https://github.com/akinsho/bufferline.nvim) es un plugin que modifica la linea de vim/neovim de tabs/buffers, este plugin lo ocupo por que es mas legible que la linea por defecto, ademas de que agrega otras funciones a la que esta por defecto, lo malo es que para lograr esto el intercambio de tab al que esoty acotumbrado **gt** es despreciado por unos comandos, pero esto se puede cambiar en la configuracion de vimscript, est eplugin tiene también muchas modificaciones esteticas, pero a mi me gusto el que trae por defecto al igual que otros plugins para que este se active necesita ser activado por lua


```vim
lua << END
require("bufferline").setup{}
END
```

Para poder moverme entre tabs use la siguiente configuracion, en modo normal Tab me mueve una tab hacia delante y Shift+Tab una tab hacia atras

```vim
noremap &ltsilent>&ltTAB> :BufferLineCycleNext&ltCR>
noremap &ltsilent>&ltS-TAB> :BufferLineCyclePrev&ltCR>
```

Algo que no me gusto de este plugin es que si quieres cerrar un buffer en vim/neovim vanilla bastaba con **:q** en la ventana de el buffer, para poder hacerlo con este plugin se necesita de el comando **:BufferlineXXXClose** donde XXXX es una de las funciones que trae para cerrar el buffer
## Which-key.nvim



[Which-key](https://github.com/folke/which-key.nvim) es un plugin que nos muestra todas las funciones de neovim asociadas con un caracter, para llamarlo demebos de hacerlo como gitsigns.


```vim
 lua << EOF
 require("which-key").setup {}
EOF
```

## Hydra.nvim



[Hydra.nvim](https://github.com/anuvyklack/hydra.nvim) es un plugin muy util y me gusto mucho su explicacion en la pagina de github

> Una vez que invocas a la hydra a traves de la tecla prefijada (el cuerpo + cualquier cabeza), todas las cabezas pueden ser llamadas en sucession solo con una pequeña extension.
> La hydra es vencida una vez que hercules o cualquier otra tecla que no sea una cabeza de la Hydra intervenga


Esto quiere decir que este pluginnos sirve para configurar varios comandos que tengan algo en comun, un ejemplo es el comando para manipular ventanas, todos estos comandos requieren de  + **X** donde **X** puede ser cambiar de ventana, hacer una division, ajustar el tamaño de un aventana etc, pero si queremos repetir un comando tendriamos que repetir  + **X** que son muchas teclas, lo que este plugin hace es que cada vez que introduzcamos  *(El Cuerpo de la hydra)* nos saldra una pequeña ventana con todas la opciones de comandos que hayamos configurado que empiezen con  *(Cabezas)*, en donde podremos hacer todos los comandos que hayamos configurado con las teclas que asignamos, y en el momento en el que presionemos una tecla que no este configurada vamos a salir de esta interfaz
 Mi configuracion para la manipulacion de ventanas es la siguiente:


```lua
local Hydra = require('hydra')
local window\_hint = [[
^ ^^ Move ^^Size ^^ ^^Split ^^ ^^Buffers
^ ^-------^^ ^^------^^ ^^----------^^ ^^---------
^^ ^^ _k_ ^^ ^^ _+_ ^ ^^ ^^_s_: horiz^^ ^^_r_: Inter
^ _h_ ^^ _w_^ ^ _l_ ^^ ^^_<_^^ ^^_>_ ^^ ^^_v_: vert^^ ^^_H_: Hor2Vert
^^ ^^ _j_ ^^ ^^ _-_ ^^ ^^_Q_: cerrar^^ ^^_J_:Vert2Hor
 ^^_=_: igual^ 
]]
Hydra({
 name = "Windows",
 hint=window_hint,
-- config = {},
 mode = 'n',
 body = '<C-w>',
 heads = {
 {'+','<Cmd>res +3<CR>',{desc='Aumentar horizontal'}},
 {'-','<Cmd>res -3<CR>',{desc='Disminuir horizontal'}},
 {'=','<Cmd>wincmd =<CR>',{desc='Igualar horizontal'}},
 {'<','<Cmd>vertical resize -3<CR>',{desc='Disminuir vertical'}},
 {'>','<Cmd>vertical resize +3<CR>',{desc='Aumentar vertical'}},
 {'s','<Cmd>wincmd s<CR>',{desc='Dividir Horizontal'}},
 {'l','<Cmd>wincmd l<CR>',{desc='Navegar Izquierda'}},
 {'h','<Cmd>wincmd h<CR>',{desc='Navegar Derecha'}},
 {'v','<Cmd>wincmd v<CR>',{desc='Dividr Vertical'}},
 {'w','<Cmd>wincmd w<CR>',{desc='Intercambiar cursor'}},
 {'j','<Cmd>wincmd j<CR>',{desc='Navegar Abajo'}},
 {'r','<Cmd>wincmd r<CR>',{desc='Intercambiar los buffers'}},
 {'k','<Cmd>wincmd k<CR>',{desc='Navegar Arriba'}},
 { 'Q', '<Cmd>try | close | catch | endtry<CR>' ,{desc='Cerrar buffer'}},
 {'H','<Cmd>wincmd H<CR>',{desc='Pasar de horizontal a vertical '}},
 {'J','<Cmd>wincmd J<CR>',{desc='Pasar de vertical a horizontal'}}},
})
```

 Lo que **window_hint** hace es una pequeña venta que mostrara que funcion tiene cada tecla y al pasarla a **Hydra** va a configurarla para mostar como un menu con las teclas y los comandos de cada una de las opciones que configuramos
##Harpoon



[Harpoon](https://github.com/ThePrimeagen/harpoon) es un plugin que nos deja marcar archivos y tenerlos en un una pequeña ventana de acceso rapido


```vim
nmap &ltleader>+ &ltCmd&gtlua require("harpoon.mark").add\_file()&ltCR> &ltbar> &ltCmd&gtecho 'File added to harpoon'&ltCR>
nmap &ltleader&gt- &ltCmd&gtlua require("harpoon.mark").rm\_file()&ltCR> &ltbar> &ltCmd&gtecho 'File removed from harpoon'&ltCR>
```

##Dracula



[Dracula](https://github.com/dracula/vim) es un tema de vim, es decir cambia los colores de el fondo, el resaltado de letras, etc. con este plugin remplaze a pywal, pues pywal al hacer una paleta de colores le misma imagen muchas veces los colores eran muy parecidos y asia que al editar texto por mucho tiempo perdiera de vista las declaraciones de variables, funciones, etc. Dracula es un tema que tiene mucho contraste entre colores y por eso me permite usar vim por mas tiempo sin que pierda el hilo


```vim
colorscheme dracula 
```

##vim-illuminate



[Vim-illuminate](https://github.com/RRethy/vim-illuminate) es un plugin que marca con un gran contraste palabras que involucren un inicio y un final, muchas veces puedo tener un archivo de html en el cual no puedo saber donde es el final de un div, al poner el cursor ya sea en modo nomal o en modo de insertar este plugin marcara el comienzo y el final de esa sección, este plugin obtiene esta información ya sea por medio lsp, regex o tressitter, por lo que funciona practicamente en cualquier tipo de archivo


```lua
require('illuminate').configure()
```

## jaq.nvim



[Jaq,nvim](https://github.com//is0n/jaq-nvim) Como su nombre lo indica es un plugin para poder ejecutar código dentro de vim/neovim, este plugin necesita una configuracion pues necesita saber que comando de shell ejecutar con cierto tipo de archivos, la configuracion que esta en su pagina de github funciona muy bien, y para ejecutarlo solo necesitamos ejecutar como comando de vim **Jaq** y esto lo empezara a ejecutar
quoso


```lua
 require('jaq-nvim').setup{
 cmds = {
 -- Uses vim commands
 internal = {
 lua = "luafile %",
 vim = "source %"
 },

 -- Uses shell commands
 external = {
 markdown = "glow %",
 python = "python3 %",
 go = "go run %",
 sh = "sh %"
 }
 },

 behavior = {
 -- Default type
 default = "float",

 -- Start in insert mode
 startinsert = false,

 -- Use `wincmd p` on startup
 wincmd = false,

 -- Auto-save files
 autosave = false
 },

 ui = {
 float = {
 -- See ':h nvim\_open\_win'
 border = "none",

 -- See ':h winhl'
 winhl = "Normal",
 borderhl = "FloatBorder",

 -- See ':h winblend'
 winblend = 0,

 -- Num from `0-1` for measurements
 height = 0.8,
 width = 0.8,
 x = 0.5,
 y = 0.5
 },

 terminal = {
 -- Window position
 position = "bot",

 -- Window size
 size = 10,

 -- Disable line numbers
 line\_no = false
 },

 quickfix = {
 -- Window position
 position = "bot",

 -- Window size
 size = 10
 }
 }
```

## delimitMate



[delimitMate](https://github.com/Raimondi/delimitMate) es un plugin que añade autocompletado para caracteres como **(),{},[],"",''**, estos caracteres pueden ser activados o desactivados e incluso agregar mas

## Fidget.nvim



[Fidget.nvim](https://github.cj-hui/fidget.nvimom/) es un plugin que solo sirve como un visualizador de progreso de nvim-lsp


```vim
 require"fidget".setup{}
```

## vim-bookmarks



[vim-bookmarks](https://github.com/MattesGroeger/vim-bookmarks) es un plugin que hace el manejo de las bookmarks de vim mas sencillo y mas visual, vim tiene esta funcion en donde en un documento se pueden marcar bookmarks, es decir una especie de marcador en una linea la cual con otro comando, no importa en que parte de el archivo estemos si presionamos ese comando nos mandara a la bookmark que marcamos, este plugin nos permite anotar notas en una bookmark, gurdar y cargar las bookmarks que hayamos creado mover una bookmark a otra linea, etc.
Este plugin no requiere configuracion

## Nvim-tressitter



[Nvim-tressitter](https://github.com/nvim-treesitter/nvim-treesitter) es una plugin que colorea la syntaxis en diferentes lenguajes de programacion.


```lua
require'nvim-treesitter.configs'.setup {
 ensure\_installed = { "c", "lua", "rust","latex","python","go","html","css","markdown" },

 sync\_install = false,

 auto\_install = true,

 highlight = {
 enable = false,
 additional\_vim\_regex\_highlighting = false,
 },
}
```

## treesitter-ts-rainbow







## Winshift



[Winshift](https://github.com/sindrets/winshift.nvim) es un plugin que agreag mas funcionalidad y hace mas simpl eel manejo de diferentes ventanas 


```lua
 require("winshift")
```

## VimTex



[VimTex](https://github.com/lervag/vimtex) sirve para llevar a cabo entre otras cosas iluminado, y previsualizacion de documentos de latex, no requiere configuracion

## Winbar



 En la version +0.8 de Neovim agregaron la posibilidad de poder agregar winbar a neovim, esto es un oequeño texto en la parte superior derecha de la pantalla que muestra la ubicacion del archivo [Winbar](https://github.com/senchpimy/winbar.nvim) hace que podamos agreagar mayor funcionalidad y personalizacion a este elemento, este plugin combinado con [Nvim-Navic](https://github.com/SmiteshP/nvim-navic) hace que junto con lsp de neovim podamos ver si el elemento en el que escribimos código es un objeto, funcion, etc.


```lua
 require('winbar').setup()
```

 Y no es necesario configuracion extra para combinarlo con Navic, solo hay que configurar Navic para que este pueda fucnionar.



```lua
 local navic = require("nvim-navic")
```


 Y este navic agregarlo a la configuracion **on\_attach** o configurarlo como esta misma en cada configuracion de cada lsp


```lua
 require("lspconfig").clangd.setup {
 on_attach = function(client, bufnr)
 navic.attach(client, bufnr)
 end
}
-----------------------------O agregarlo a una configuracion ya existente-------------------
 local on_attach = function(client, bufnr)
 if client.server_capabilities.documentSymbolProvider then
 navic.attach(client, bufnr)
 end
 .....
 .....
 .....
 .....
 end
-----------------------------Y agrrgarlo a la configuracion de el LSP-------------------
require('lspconfig')['tsserver'].setup{
 on_attach = on_attach,
 flags = lsp_flags,
}
```

## Trouble.nvim



[Trouble.nvim](https://github.com/folke/trouble.nvim) es un plugin que agrega una revision de código en modo Normal, marca los posibles errores, las advertencias y hasta faltas de ortografia


```lua
 require("trouble").setup()
```

## cmp



**Cmp**, abreviacion de completion son varios plugins que se combinan con el lsp de neovim y proveen diferente tipos de autocopletado segun el plugin que que sea instalado, los que yo tengo son los siguientes


```
 'hrsh7th/cmp-buffer'
 'hrsh7th/cmp-path'
 'hrsh7th/cmp-cmdline'
 'hrsh7th/nvim-cmp'
 'hrsh7th/cmp-nvim-lsp'
```


 EL plugin que se encarga de configurarlo con lsp se llama [nvim-cmp](https://github.com/hrsh7th/nvim-cmp) el cual tiene intrucciones sobre su configuracion en su pagina, para agregar cualquier otro plugin como puede ser [cmp-buffer](https://github.com/hrsh7th/cmp-buffer) para agregar al autocompletado todas las palabras que se encuentren en el mismo buffer la configuracion seria la siguiente:


```lua
 require('cmp').setup({
 sources = {
 { name = 'buffer' },
 },
})
```



