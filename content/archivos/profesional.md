---
title: "Pagina Profesional"
date: "22 Jan 2023"
---

 Viendo que mi página se queda algo simple, pero aun asi me gusta, decidí hacer esta misma página, con los mismos contenidos pero con otros estilos, y para no tener una copia de todos los archivos que tengo aquí, que tendria que sincronizar cada vez que haga una modificación, pense en usar mi página principal para obtener el html de su contenido pero cambiar sus estilos, para hacer esto hice un simple prorama en go que hace específicamente esto:
 
```go

 package main

 import (
 "fmt"
 "io"
 "io/ioutil"
 "net/http"
 "strings"
 )
 
 const domain = "https://senchpimy.xyz"
 
 func main() {
 fmt.Println("Server Start")
 http.HandleFunc("/", func(w http.ResponseWriter, r \*http.Request) {
 path := r.URL.Path
 if strings.HasSuffix(path,".css"){
 if path=="/ascci/style.css"{
 provide\_style(w,"style\_ascci.css")
 }else{
 provide\_style(w,"style.css")
 }
 }else if strings.HasSuffix(path,".html") || path=="/"{
 html:=request(path)
 fmt.Fprint(w,html+"&ltmeta name='viewport' content='width=device-widht, initial-scale=1.0'>")
 }else{
 html:=request(path)
 fmt.Fprint(w,html)
 }
 })
 
 http.ListenAndServe(":3002", nil)
 }
 
 func request(url string)(foo string){
 resp, err := http.Get(domain+url)
 if err != nil {
 fmt.Println("erro get")
 }
 defer resp.Body.Close()
 body, err := io.ReadAll(resp.Body)
 if err != nil {
 fmt.Println("erro read")
 }
 return string(body)
 }
 
 func provide\_style(w http.ResponseWriter,style\_path string){
 w.Header().Set("Content-Type", "text/css")
 data, err := ioutil.ReadFile(style\_path)
 if err != nil {
 fmt.Println(err)
 }
 style:=string(data)
 fmt.Fprint(w,style)
 }
 
```
 
 Lo que este programa hace es hacer una petición a la página especificada y cuando el programa detecta que esta peticion es la que busca los archivos este la remplaza por cualquier archivo especificado.
 


