---
title: "RAG"
date: "10 Sep 2024"
---

## Retrieval Aumented Generation

RAG consiste en proporcionar a un modelo de lenguaje información de tal manera en que la salida de estos modelos no solo sea la contenida en el
mismo modelo, si no que sea recuperada de la información que le fue proporcionada. Este metodo es muy interesante pues aumenta las capacidades
de un modelo ya existente sin la necesidad de volver a entrena o de fintunear.

## Funcionamiento
Este metodo se puede dividir en tres partes:
### Index
En está parte la información que le hes dada al modelo es dividida en n partes, cada parte después es procesada y le hes asignado un vector,
el proceso de crear el vector puede variar dependiendo la implementación, es guardado en una forma de vector para que pueda ser buscado 
de forma fácil después.
este vector es guardado en una base de vectores

### Retrieval

Dado un prompt por el usuario, este prompt es analizado y marcado como un vector, después se buscan en la base de datos creada
los vectores más cercanos a el prompt y finalmente está información que coincide es extraida. 

Esta información se puede obtener de diferentes formas, una de ellas es una busqueda lexica, es decir contar cuantas palabras coinciden entre
lo que se está buscando y la información que se tiene. También existe la busqueda semantica que es buscar por palabras/temas clave

Por lo que un modelo **BERT** que es un transformer que solo es un encoder, es capaz de codificar y encontrar similaridades semanticas entre 
los documentos/información y lo que se busca. Por lo que midiendo las distancias vectoriales podemos encontrar los documentos más relevantes
semanticamente para después pasarlos al LLM para un postprocesado.

### Generation

Esta parte consiste en que el modelo logre usar de forma efectiva el contenido de entrada y el contenido retraido de los documentos para poder
generar una respuesta consistente, clara y prescisa.


### Contras

Uno de los puntos encontra de está tecnica es que ahora existen muchos más posibles puntos de fallo en está arquictectura.

## Meta actual

### Indexing

Actualmente para generar los vectores en espacios de información en lugar de usar un LLM para divir la información de forma semantica, un 
**Trainable Embedded Model** puede ser usado para convertir el texto a vectores, de tal forma que un modelo entrenado para programar
va a tomar en cuenta la indentacion de los textos en comparación a uno de propósito general.


### Generation

Una tecnica para mejorar la genracion de resultados relevantes es no solo tomar la información más cercana en el espacio vectorial, si no retraer
*K* elementos que sean relevantes, luego estos resultados son pasados por un LLM para clasificar que resultados son los más relevantes que podrian
contestar la pregunta, y este modelo también puede ser modelado para ser especifico en un dominio.

También se puede aplciar tecnicas como dados *K* vectores relevantes eliminar resultados que no esten relacionados, este tecnica se llama **autocut**,
O también se puede hacer que se evalue que tan relevante es la información que se obtuvo de tal manera que si está no pasa cierto limite,
forza al modelo a generar una respuesta en la que dice que no posee información relevante en lugar de alucinar algún resultado.

https://github.com/explodinggradients/ragas
https://docs.llamaindex.ai/en/stable/examples/query_engine/knowledge_graph_rag_query_engine/
https://cohere.com/blog/introducing-embed-v3
https://github.com/microsoft/graphrag
https://arxiv.org/abs/2408.04948
https://arxiv.org/abs/2408.07611
https://arxiv.org/abs/2404.10981
https://arxiv.org/abs/2404.16130
https://arxiv.org/abs/2312.10997
