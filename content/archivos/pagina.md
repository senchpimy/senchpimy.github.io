---
title: "Web page Source Code"
date: "31 Jul 2022"
---

 Este el css que se ocupa en la mayoria de los html en esta pagina
 
```css

 @keyframes glitch {
 0% {text-shadow: 0px -3px 0px white;}
 10% {text-shadow: 3px 1px 0px white;}
 20% {text-shadow: -2px 2px 0px white;}
 30% {text-shadow: 1px -1px 0px white;}
 40% {text-shadow: -3px 3px 0px white;}
 50% {text-shadow: 2px -2px 0px white;}
 60% {text-shadow: -1px 0px 0px white;}
 70% {text-shadow: 3px 3px 0px white;}
 80% {text-shadow: 0px -2px 0px white;}
 90% {text-shadow: -1px 2px 0px white;}
 100% {text-shadow: 2px 0px 0px white;}
 
 }
 
 .title{
 color: rgb(90, 26, 87); 
 font-size: 10%;
 font-family: 'Courier New', Courier, monospace;
 text-align: left;
 font-size: 110%;
 white-space: pre-wrap;
 }
 
 body{
 background-color:rgb(15, 13, 13);
 font-family: 'Courier New', Courier, monospace;
 color: rgb(90, 26, 87);
 margin: 5%;
 }
 .contenidos{
 --gap: 5px;
 --num-cols: 4;
 --row-height: 40%;
 height: 50px;
 background-color: rgb(109, 117, 190);
 font-size: 150%;
 font-weight: 1000;
 font-family: 'Courier New', Courier, monospace;
 border-radius: 5px;
 border:5px solid rgb(22, 88, 51);
 margin: 50px;
 box-sizing: border-box;
 display: grid;
 grid-template-columns: repeat(var(--num-cols), 1fr);
 gap: var(--gap);
 padding: 4px;
 }
 .contenidos>a{
 color:rgb(90, 26, 87);
 }
 .contenidos>a:hover{
 animation-name: glitch;animation-duration: 1s;animation-iteration-count: infinite;
 }
 .texto{
 color: seashell;
 font-size: 20px;
 margin: 2px;
 text-align: justify;
 }
 
 .image-grid {
 --gap: 10px;
 --num-cols: 4;
 --row-height: 300px;
 
 box-sizing: border-box;
 padding:20px;
 
 display: grid;
 grid-template-columns: repeat(var(--num-cols), 1fr);
 grid-auto-rows: var(--row-height);
 gap: var(--gap);
 border-radius: 5px;
 border:10px solid rgb(46, 139, 87) ;
 }
 
 .image-grid > img {
 width: 100%;
 height: 100%;
 object-fit: cover;
 border-radius: 5px;
 
 
 }
 
 .image-grid-col-2 {
 grid-column: span 2;
 }
 
 .image-grid-row-2 {
 grid-row: span 2;
 }
 .full {
 grid-row: span 2;
 grid-column: span 2;
 }
 .contenidos>a:hover{
 animation-name: glitch;animation-duration: 1s;animation-iteration-count: infinite;
 }
 
 .texto{
 color: seashell;
 font-size: 20px;
 margin: 2px;
 text-align: justify;
 }
 .documentos {
 --gap: 10px;
 --num-cols: 4;
 --row-height: 200px;
 
 box-sizing: border-box;
 display: grid;
 grid-template-columns: repeat(var(--num-cols), 1fr);
 grid-auto-rows: var(--row-height);
 gap: var(--gap);
 margin: auto;
 position: relative;
 }
 
 .enlace {
 width: fit-content;
 height: fit-content;
 margin: auto;
 object-fit: cover;
 border-radius: 5px;
 }
 .enlace > img{
 width: 250px;
 height: 250px;
 margin: auto;
 object-fit: cover;
 border-radius: 5px;
 }
 .desc{
 position:relative;
 bottom: 28px;
 color: aqua;
 background-color: black;
 width: 250px;
 height: 30px;
 text-align: center;
 }
 
 
 
 /\* Anything udner 1024px \*/
 @media screen and (max-width: 1024px) {
 .image-grid {
 --num-cols: 2;
 --row-height: 200px;
 }
 }
```

 La barra de navegacion se crea de esta forma en html
 

```html
 <!DOCTYPE html>
<body>
 <div class="contenidos">
 <a href="./entradas/index.html" class="link">Entradas</a>
 <a href="./archivos/index.html">Archivos</a>
 <a href="./wallpapers/index.html">Wallpapers</a>
 <a href="./ascci/index.html">ASSCI</a>
 </div>
</body>
 
```

 Asi es el estilo de los bloques de codigo
 

```css
 .codigo{
 height: fit-content;
 background-color: rgb(74, 80, 80);
 color: blanchedalmond;
 white-space: pre-wrap;
 font-size: 11px;
 padding: 10px;
 border-radius: 25px;
 margin: 40px;
 }
```
 

 Este es el codigo para la red de imagenes, su estilo esta dentro de el archivo de estilos principal
 

```html
 <div class="image-grid">
<img src="./1.jpeg" ">
<img src=./2.jpg alt=>
<img src=./3.jpg >
<img src=./4.jpg alt=>
<img src=./5.jpg alt=>
<img src=./6.jpg alt=>
<img src=./7.jpg alt=>
<img src=./8.jpg alt=>
....
<img src=./36.jpg alt=>
<img src=./37.jpg alt=>
<img src=./38.jpg alt=>
<img src=./39.jpg alt=>
<img src=./40.jpg alt=> 
</div>
 
```

 los dibujos ASSCI son modificados por id y no por clase, pues cada uno tiene una poscicion diferente y un tamaño de fuente diferente, su estilo de forma general se ve de la siguiente manera
 

```css
 #id{
 color: seashell;
 font-size: 20px;
 margin: 2px;
 text-align:left;
 white-space: pre-wrap;
 width: fit-content;
 height: fit-content;
 float: inline-start;
 margin: 10px;
 }
 
```

 Para poder usar caracteres unicode en la pagina se tiene que agregar esta etiqueta en los metadatos
 

```html
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 
```


