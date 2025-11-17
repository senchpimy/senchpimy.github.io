---
title: "Configuración de Neovim"
date: "31 Jul 2022"
---


Neovim es un programa de edición de texto basado en vim, este se diferencia de vim en que Neovim tiene integración con el lenguaje de programación lua, lo que lo hace más extensible en el momento de usar plugins
 

 Los plugins son lo mejor de vim/neovim pues aumentan la funcionalidad de el programa y aquí explicaré los que uso actualmente, que hacen y como los configuré
 
## init.vim



Init.vim es el archivo que lee por defecto neovim/vim este archivo está escrito en vimscript ejecuta comandos de vim cada vez que vim se ejecuta
 

```vim
source $HOME/.config/nvim/vim-plug/plugins.vim
set number relativenumber
set nu ru
let g:Hexokinase\_highlighters = ['backgroundfull']
let g:Hexokinase\_ftEnabled = ['css', 'html', 'javascript','lua','py']
nmap r RnvimrToggle
nmap q q q
nmap p CocCommand markdown-preview-enhanced.openPreview
nnoremap v CHADopen
let g:airline\_left\_sep = ''
let g:airline\_right\_sep = ''
colorscheme pywal
"///////////////////////////////////////////////////////////////////////////////
" Set internal encoding of vim, not needed on neovim, since coc.nvim using some
" unicode characters in the file autoload/float.vim
set encoding=utf-8

" TextEdit might fail if hidden is not set.
set hidden

" Some servers have issues with backup files, see #649.
set nobackup
set nowritebackup

" Give more space for displaying messages.
set cmdheight=2

" Having longer updatetime (default is 4000 ms = 4 s) leads to noticeable
" delays and poor user experience.
set updatetime=300

" Don't pass messages to |ins-completion-menu|.
set shortmess+=c

" Always show the signcolumn, otherwise it would shift the text each time
" diagnostics appear/become resolved.
if has("nvim-0.5.0") || has("patch-8.1.1564")
 " Recently vim can merge signcolumn and number column into one
 set signcolumn=number
else
 set signcolumn=yes
endif

" Use tab for trigger completion with characters ahead and navigate.
" NOTE: Use command ':verbose imap ' to make sure tab is not mapped by
" other plugin before putting this into your config.
inoremap  
 \ pumvisible() ? "\" :
 \ CheckBackspace() ? "\" :
 \ coc#refresh()
inoremap  pumvisible() ? "\" : "\"

function! CheckBackspace() abort
 let col = col('.') - 1
 return !col || getline('.')[col - 1] =~# '\s'
endfunction

" Use  to trigger completion.
if has('nvim')
 inoremap   coc#refresh()
else
 inoremap   coc#refresh()
endif

" Make  auto-select the first completion item and notify coc.nvim to
" format on enter,  could be remapped by other vim plugin
inoremap   pumvisible() ? coc#\_select\_confirm()
 \: "\u\\=coc#on\_enter()\"

" Use `[g` and `]g` to navigate diagnostics
" Use `:CocDiagnostics` to get all diagnostics of current buffer in location list.
nmap  [g (coc-diagnostic-prev)
nmap  ]g (coc-diagnostic-next)

" GoTo code navigation.
nmap  gd (coc-definition)
nmap  gy (coc-type-definition)
nmap  gi (coc-implementation)
nmap  gr (coc-references)

" Use K to show documentation in preview window.
nnoremap  K :call ShowDocumentation()

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
nmap rn (coc-rename)

" Formatting selected code.
xmap f (coc-format-selected)
nmap f (coc-format-selected)

augroup mygroup
 autocmd!
 " Setup formatexpr specified filetype(s).
 autocmd FileType typescript,json setl formatexpr=CocAction('formatSelected')
 " Update signature help on jump placeholder.
 autocmd User CocJumpPlaceholder call CocActionAsync('showSignatureHelp')
augroup end

" Applying codeAction to the selected region.
" Example: `aap` for current paragraph
xmap a (coc-codeaction-selected)
nmap a (coc-codeaction-selected)

" Remap keys for applying codeAction to the current buffer.
nmap ac (coc-codeaction)
" Apply AutoFix to problem on the current line.
nmap qf (coc-fix-current)

" Run the Code Lens action on the current line.
nmap cl (coc-codelens-action)

" Map function and class text objects
" NOTE: Requires 'textDocument.documentSymbol' support from the language server.
xmap if (coc-funcobj-i)
omap if (coc-funcobj-i)
xmap af (coc-funcobj-a)
omap af (coc-funcobj-a)
xmap ic (coc-classobj-i)
omap ic (coc-classobj-i)
xmap ac (coc-classobj-a)
omap ac (coc-classobj-a)

" Remap  and  for scroll float windows/popups.
if has('nvim-0.4.0') || has('patch-8.2.0750')
 nnoremap   coc#float#has\_scroll() ? coc#float#scroll(1) : "\"
 nnoremap   coc#float#has\_scroll() ? coc#float#scroll(0) : "\"
 inoremap   coc#float#has\_scroll() ? "\=coc#float#scroll(1)\" : "\"
 inoremap   coc#float#has\_scroll() ? "\=coc#float#scroll(0)\" : "\"
 vnoremap   coc#float#has\_scroll() ? coc#float#scroll(1) : "\"
 vnoremap   coc#float#has\_scroll() ? coc#float#scroll(0) : "\"
endif

" Use CTRL-S for selections ranges.
" Requires 'textDocument/selectionRange' support of language server.
nmap   (coc-range-select)
xmap   (coc-range-select)

" Add `:Format` command to format current buffer.
command! -nargs=0 Format :call CocActionAsync('format')

" Add `:Fold` command to fold current buffer.
command! -nargs=? Fold :call CocAction('fold', )

" Add `:OR` command for organize imports of the current buffer.
command! -nargs=0 OR :call CocActionAsync('runCommand', 'editor.action.organizeImport')

" Add (Neo)Vim's native statusline support.
" NOTE: Please see `:h coc-status` for integrations with external plugins that
" provide custom statusline: lightline.vim, vim-airline.
set statusline^=%{coc#status()}%{get(b:,'coc\_current\_function','')}

" Mappings for CoCList
" Show all diagnostics.
nnoremap  a :CocList diagnostics
" Manage extensions.
nnoremap  e :CocList extensions
" Show commands.
nnoremap  c :CocList commands
" Find symbol of current document.
nnoremap  o :CocList outline
" Search workspace symbols.
nnoremap  s :CocList -I symbols
" Do default action for next item.
nnoremap  j :CocNext
" Do default action for previous item.
nnoremap  k :CocPrev
" Resume latest coc list.
nnoremap  p :CocListResume

``` 

 La primera linea **source $HOME/.config/nvim/vim-plug/plugins.vim**  llama a el primer plugin de todos **vim-plug** este plugin nos ayudara a descargar, actualizar, y manejar los demás plugins, en este caso el plugin está llamando a otro archivo llamado **plugins.vim** para que funcione con la configuración que tengo este archivo debe estar dentro de una carpeta llamada **vim-plug**, pero solo hace con hacer referencia a este archivo en esa función es suficiente, he visto algunos init.vim que contienen lo que contendría plugins.vim, esto se hace poniendo lo siguiente en lugar de source en el archivo de init.vim
 

```vim
 call plug#begin(system('echo -n "${XDG\_CONFIG\_HOME:-$HOME/.config}/nvim/plugged"'))
 #
 #
 #
 #
 #
 call plug#end()
``` 

 Para poder instalar otros plugins necesitamos primero instalar vim-plug existen varias formas de instalarlo, pero encuentro que solo agregando las siguientes líneas al archivo init.vim es la mejor pues estas líneas se aseguran de instalarlo correctamente y de verificar si está instalado y si no lo instales, lo que significa que con solo el archivo de vim.init se puede usar la misma configuración de vim con los mismos plugins.
 

 
```vim
if ! filereadable(system('echo -n "${XDG\_CONFIG\_HOME:-$HOME/.config}/nvim/autoload/plug.vim"'))
 echo "Downloading junegunn/vim-plug to manage plugins..."
 silent !mkdir -p ${XDG\_CONFIG\_HOME:-$HOME/.config}/nvim/autoload/
 silent !curl "https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim" > ${XDG\_CONFIG\_HOME:-$HOME/.config}/nvim/autoload/plug.vim
 autocmd VimEnter \* PlugInstall
endif
``` 

 

 Otra alternativa es el siguiente comando de shell
 

```sh
 sh -c 'curl -fLo "${XDG\_DATA\_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
 https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
``` 
 

 Para más métodos de instalación y dudas sobre vim-plug hay que visitar su [github](https://github.com/junegunn/vim-plug)

## Plugins



 Para verificar que el plugin vim-plug se instaló correctamente hay que ejecutar el comando de vim
 

```vim
 :PlugStatus
 
```

 Si no encuentra el comando no fue instalado correctamente, cuando si se logro instalar abrirá un buffer donde mostrara que todo está en orden
 

 Los plugins son lo extienden las funciones de vim/nvim, para instalarlas hay que poner lo siguiente dentro de [está sección](#plug) en lugar de los***#***


```vim
 Plug '**link**'
```

 Donde link es el enlace ha donde se encuentra el plugin, en el caso de plugins que se encuentren en github.com solo es necesario colocar el usuario y el repositorio, tal como se indica en la página de vim-plug (Para pasar el argumento hay que usar comillas simples '', pues el lenguaje vimscript toma las comillas dobles "" como indicacion de un comentario)
 

 
```vim
" Notación corta; Indica a https://github.com/junegunn/vim-easy-align
Plug 'junegunn/vim-easy-align'

" Toda URL git es válida 
Plug 'https://github.com/junegunn/vim-github-dashboard.git'
 
```

 Entonces el archivo en donde están los plugins que ocupo quedaría como:
 

```vim
" auto-install vim-plug
if empty(glob('~/.config/nvim/autoload/plug.vim'))
 silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
 \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
endif

call plug#begin('~/.config/nvim/autoload/plugged')

 " File Explorer
 Plug 'ms-jpq/chadtree', {'branch': 'chad', 'do': 'python3 -m chadtree deps'}
 Plug 'kevinhwang91/rnvimr', {'do': 'make sync'}
 Plug 'nvim-lua/plenary.nvim'
 Plug 'https://github.com/nvim-telescope/telescope.nvim', { 'tag': '0.1.0' }
 " Auto pairs for '(' '[' '{'
 Plug 'tpope/vim-surround'
 " Enviroment 
 Plug 'vim-airline/vim-airline'
 Plug 'rrethy/vim-hexokinase', { 'do': 'make hexokinase' }
 Plug 'AlphaTechnolog/pywal.nvim', { 'as': 'pywal' }
 Plug 'senchpimy/dashboard-vim'
 Plug 'farmergreg/vim-lastplace'
 Plug 'Yggdroot/indentLine'
 "Plug 'akinsho/bufferline.nvim', { 'tag': 'v2.\*' }

 Plug 'jreybert/vimagit'
 Plug 'kyazdani42/nvim-web-devicons' " Recommended (for coloured icons)
 " Plug 'ryanoasis/vim-devicons' Icons without colours
 Plug 'akinsho/bufferline.nvim', { 'tag': 'v2.\*' }
 
 "Autocompletion
 Plug 'neovim/nvim-lspconfig'
 Plug 'hrsh7th/nvim-compe'
 Plug 'neoclide/coc.nvim', {'branch': 'release'}

call plug#end()

```
 

 Algunos plugins necesitan especificaciones extras para funcionar correctamente, generalmente los creadores de los plugins lo especifican en sus **README.md**  por eso, lo que hay después de la coma son esas especificaciones de los plugins, también por lo general los creadores dan instrucciones de como instalar el plugin con vim-plug, y por lo general si no dan más especificaciones es por que no hay que hacer nada.
 

 Para instalar los plugins, con todo y las especificaciones hay que ejecutar el comando:
 

```vim
 :PlugInstall
```
 

 Este comando se encargará de hacer todo el trabajo, y a menos de que salga un error no hay que hacer nada más 
 

 Vim-plug es un programa de administración de plugins si, pero este programa es para vim, yo uso Neovim que incorpora algunos cambios y para poder usar mejor y aprovechar estas diferencias que tiene Neovim me entero que existe otro plugin llamado **Packer**, eso no significa que vim-plug no sirva con Neovim, justo ahora estoy escribiendo este documento con neovim+vim-plug pero packer es mejor para mis necesidades y apenas lo descubrí, después cambiaré vim-plug por packer
 



