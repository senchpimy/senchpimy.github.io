---
title: "Llamado de funciones con Ollama"
date: "19 Jul 2024"
---

## Salida Estructurada en Llama.cpp

En un modelo de lenguaje es a veces útil poder estructurar la salida, es decir dado un prompt poder limitar la salida de tal forma que cumpla ciertas normas o formatos tal como json.

En llama.cpp existe la opción de crear una **gramática formal** mediante el formato de **GBNF**.

### Gramática Formal

Describe que cadenas de un **alfabeto** de un **Lenguaje formal** son válidas segun la sintaxis de el lenguaje.

Un lenguaje formal consiste de palabras cuyas letras son tomadas de un alfabeto y estas siguen una serie de reglas definidas por su gramática.

### Backus-Naur form

Esta notación es usada para definir la sintaxis de cualquier lenguaje formal tal como un lenguaje de programación. Esta notación se forma de símbolos, símbolos terminales y reglas
para reemplazar símbolos no-terminales con una secuencia de símbolos. la notación es la siguiente:

```
 <symbol> ::= __expression__
```

- **<symbol>**: Es una variable no terminal que siempre esta cerrada por los caracteres "<>"
- **::=**: Significa que el simbolo de la izquierda debe ser remplazado por el simbolo de la derecha
- **__expression__**: Consiste de una o varias sequencias de símbolos terminales o no-terminales donde cada secuencia es separado por un "**|**" indicando una opción para sustituir el simbolo en la derecha

### Ejemplos:
```
# `root` specifies the pattern for the overall output
`root`      `::= ` `diagnosis`
 
`diagnosis` `::=` `"arthritis"` `|` `"dengue"` `|` `"urinary` `tract` `infection"` `|` `"impetigo"` `|` `"cervical` `spondyl`
```
Este ejemplo limita el lenguaje a una serie de diagnósticos de los cuales solo son validos esos y ninguno más.

```
`root`        `::=` `jp-char+` `([` `\t\n]` `jp-char+)*`
 
`jp-char`     `::=` `hiragana` `|` `katakana` `|` `punctuation` `|` `cjk`
 
`hiragana`    `::=` `[ぁ-ゟ]`
 
`katakana`    `::=` `[ァ-ヿ]`
 
`punctuation` `::=` `[、-〾]`
 
`cjk`         `::=` `[一-鿿]`
```
Esta notación limita el lenguaje a solamente a los alfabetos japoneses.

(Ejemplos de llama.cpp)[https://github.com/ggerganov/llama.cpp/blob/master/grammars/README.md]

## Llamando funciones

Usando estas herramientas es posible usar *langchain* para limitar la salida y hacer un llamado de funciones por ejemplo:

```py
from langchain_experimental.llms.ollama_functions import OllamaFunctions

model = OllamaFunctions(model="phi3", keep_alive=-1, format="json")

model = model.bind_tools(
    tools=[
        {
            "name": "get_current_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, " "e.g. San Francisco, CA",
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                    },
                },
                "required": ["location", "unit"],
            },
        }
    ],
    function_call={"name": "get_current_weather"},
)

response = model.invoke("what is the weather in Singapore?")

print(response)
```

## EXTRA: Creando Objetos

Se supone que también se pueden generar objetos dado un prompt, por ejemplo con el código siguiente:

```py
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_experimental.llms.ollama_functions import OllamaFunctions


# Pydantic Schema for structured response
class Person(BaseModel):
    name: str = Field(description="The person's name", required=True)
    height: float = Field(description="The person's height", required=True)
    hair_color: str = Field(description="The person's hair color")


context = """Alex is 5 feet tall. 
Claudia is 1 feet taller than Alex and jumps higher than him. 
Claudia is a brunette and Alex is blonde."""

# Prompt template llama3
prompt = PromptTemplate.from_template(
    """<|begin_of_text|><|start_header_id|>system<|end_header_id|>
    You are a smart assistant take the following context and question below and return your answer in JSON.
    <|eot_id|><|start_header_id|>user<|end_header_id|>
QUESTION: {question} \n
CONTEXT: {context} \n
JSON:
<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
 """
)

# Chain
llm = OllamaFunctions(model="llama3", format="json", temperature=0)

structured_llm = llm.with_structured_output(Person)
chain = prompt | structured_llm

response = chain.invoke({"question": "Who is taller?", "context": context})

print(response)
```

Sin embargo ninguno de los mejores modelos fue capaz de completar la tarea con éxito, pues de alguna o de otra forma estos se equivocaban estos fueron los modelos que probé y de 10 intento cuantos objetos de *Person* fueron serializados con éxito:

>{'codellama:13b-code': 0, 'mistral': 0, 'phi3': 0, 'wizardlm2': 1, 'llama3':0}

Un comportamiento extraño que note fue que *wizardlm2* siempre que terminaba el programa y lo volvia a ejecutar su primer intento era correcto sin importar cuantas veces lo ejecutara pero los demás resultaban en error, pero a pesar de que realizaba
la tarea con éxito sus resultados eran erróneos pues obtenia esta salida

>name='Claudia' height=5.0 hair_color='brunette'

Aunque el modelo podía crear un json correcto no podía racionalizar que Claudia mide 6 pies. Aunque el modelo *codellama* no pudo serializar los objetos pienso que su salida fue la más concisa y útil de todas pues en sus intentos este siempre respondia con:

>{"answer": "Claudia"}

Y finalmente la salida de *llama3* puede que sea la más útil si es que se configurara el prompt:

```json
{
  "name": "Comparison",
  "type": "object",
  "properties": {
    "person1": {
      "title": "Alex",
      "description": "The first person",
      "required": true,
      "type": "string"
    },
    "height1": {
      "title": "Height of Alex",
      "description": "The height of Alex",
      "required": true,
      "type": "number"
    },
    "hair_color1": {
      "title": "Hair Color of Alex",
      "description": "The hair color of Alex",
      "required": true,
      "type": "string"
    },
    "person2": {
      "title": "Claudia",
      "description": "The second person",
      "required": true,
      "type": "string"
    },
    "height2": {
      "title": "Height of Claudia",
      "description": "The height of Claudia",
      "required": true,
      "type": "number"
    },
    "hair_color2": {
      "title": "Hair Color of Claudia",
      "description": "The hair color of Claudia",
      "required": true,
      "type": "string"
    }
  },
  "required": [
    "person1",
    "height1",
    "hair_color1",
    "person2",
    "height2",
    "hair_color2"
  ]
}
```

De cierta forma logra identificar lo que se necesita pero no es capaz de completarlo correctamente
