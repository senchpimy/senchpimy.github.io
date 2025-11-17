---
title: "Safetensors To GGUF"
date: "19 Jul 2024"
---

## GGML/GGUF
Ollama es un proyecto de código abierto que se utiliza para administrar, ejecutar y configurar LLMs. Especificamente se utiliza
para ejecutar modelos de forma local.

Ollama puede usar es solo un administrador, como backend utiliza **llama.cpp**, llama.cpp es un backend completo, flexible y portatil de el cual leia los modelos con el formato **GGML**, pero conforme los modelos crecian y 
agregaban nuevas características fue necesario crear un nuevo formato para mantener la conveniencia de tener un modelo en un solo archivo pues se requeria almacenar nueva información sobre el modelo.

El formato GGUF fue introducido como sucesor de GGML en agosto de 2023

## Safetensors

Los Safetensors son un formato creado por *HuggingFace*, los safetensors son más flexibles pues no solo están limitados a modelos de lenguaje, se pueden guardar cualquier tipo de tensores, pero en especifico se guardan 
tensores de pytorch

## Safetensors A GGUF

Una forma de convertir un repositorio que contenga modelos *safetensors* a un solo archivo *GGUF* es mediante esta [página](https://huggingface.co/spaces/ggml-org/gguf-my-repo)
