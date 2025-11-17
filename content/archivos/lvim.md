---
title: "Lunar Vim"
date: "29 Jun 2023"
---


 Lunar Nvim es una configuración de Neovim que incluye muchas cosas por default que son bastante útiles y que personalmente yo no puede configurar bien en mi configuración,
 aunque funciona muy bien aun así lo tuve que configurar en algunas cosas y este es el archivo de configuración que agregue
 
```lua
vim.keymap.set("n", "nh", ":HopWord")
vim.keymap.set("n", "", ":BufferLineCycleNext")
vim.keymap.set("n", "", ":BufferLineCyclePrev")
vim.keymap.set("n", "", ":BufferLinePickClose")

vim.wo.relativenumber = true

lvim.log.level = "warn"
lvim.format\_on\_save.enabled = false
lvim.colorscheme = "lunar"
lvim.leader = "space"
lvim.keys.normal\_mode[""] = ":w"
lvim.builtin.alpha.active = true
lvim.builtin.alpha.mode = "dashboard"
lvim.builtin.terminal.active = true
lvim.builtin.nvimtree.setup.view.side = "left"
lvim.builtin.nvimtree.setup.renderer.icons.show.git = false


lvim.builtin.treesitter.ensure\_installed = {
 "bash",
 "c",
 "javascript",
 "json",
 "lua",
 "python",
 "typescript",
 "tsx",
 "css",
 "rust",
 "java",
 "yaml",
}

lvim.builtin.treesitter.highlight.enable = true

lvim.plugins = {
 {"mattn/emmet-vim"},
 {"phaazon/hop.nvim",
 config = function()
 require'hop'.setup()
 end
 },
 {"kevinhwang91/rnvimr",
 config = function ()
 vim.keymap.set("n", "", ":RnvimrToggle")
 end},
 {"lambdalisue/suda.vim"},
 {"farmergreg/vim-lastplace"},
 {"akinsho/bufferline.nvim"},
}

```

 Con esta configuración ya puedo recrear lo que tenía con mi configuración, pero con algo que tuve problemas es configurando el **LSP**, el cual con Lunar nvim, funciona automáticamente y los servidores se instalan automáticamente según el archivo que se abre
 


