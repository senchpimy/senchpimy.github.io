---
date: "24 Nov 2025"
title: "Longest Palindromic Substring"
katex: true
tags: ["LeetCode", "String", "Dynamic Programming", "Algorithms"]
---
## Longest Palindromic Substring

Este problema consiste en que, dado un string, se regrese el substring que sea el palíndromo más grande en el string original.
 
### Solución

Existen varias formas de resolverlo; la más fácil sería mediante fuerza bruta, revisando todos los posibles substrings, pero esto nos daría una complejidad de $$n^3$$,
pues para revisar cada string sería una *n*, y como esto se tiene que hacer por cada substring se agrega otra *n*, y como se tienen que contar los substrings entonces se agrega una *n*
final. Esta solución ineficiente se vería de la siguiente forma:

```go

```

{{< chart >}}
{
    "type": "bar",
    "data": {
        "labels": ["Lunes", "Martes", "Miércoles", "Jueves"],
        "datasets": [{
            "label": "Visitantes",
            "data": [120, 190, 30, 50]
        }]
    }
}
{{< /chart >}}

{{< chart >}}
{
    "type": "pie",
    "data": {
        "labels": ["Rojo", "Azul", "Amarillo"],
        "datasets": [{
            "data": [300, 50, 100]
        }]
    }
}
{{< /chart >}}

{{< chart >}}
{
    "type": "line",
    "data": {
        "labels": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
        "datasets": [
            {
                "label": "Tráfico Orgánico",
                "data": [65, 59, 80, 81, 56, 55],
                "tension": 0.4,
                "fill": false
            },
            {
                "label": "Tráfico Pagado",
                "data": [28, 48, 40, 19, 86, 27],
                "tension": 0.4,
                "fill": false
            }
        ]
    }
}
{{< /chart >}}

{{< chart >}}
{
    "type": "bar",
    "data": {
        "labels": ["Desarrollo Web Fullstack", "Diseño UI/UX Avanzado", "Marketing Digital", "Ciencia de Datos"],
        "datasets": [{
            "label": "Horas dedicadas",
            "data": [150, 90, 45, 120]
        }]
    },
    "options": {
        "indexAxis": "y"
    }
}
{{< /chart >}}

{{< chart >}}
{
    "type": "doughnut",
    "data": {
        "labels": ["Escritorio", "Móvil", "Tablet"],
        "datasets": [{
            "data": [300, 150, 50],
            "hoverOffset": 4
        }]
    }
}
{{< /chart >}}

{{< chart >}}
{
    "type": "radar",
    "data": {
        "labels": ["Velocidad", "Potencia", "Resistencia", "Diseño", "Precio"],
        "datasets": [{
            "label": "Modelo A",
            "data": [65, 59, 90, 81, 56],
            "fill": true,
            "backgroundColor": "rgba(54, 162, 235, 0.2)",
            "borderColor": "rgb(54, 162, 235)",
            "pointBackgroundColor": "rgb(54, 162, 235)"
        }, {
            "label": "Modelo B",
            "data": [28, 48, 40, 19, 96],
            "fill": true,
            "backgroundColor": "rgba(255, 99, 132, 0.2)",
            "borderColor": "rgb(255, 99, 132)",
            "pointBackgroundColor": "rgb(255, 99, 132)"
        }]
    },
    "options": {
        "elements": {
            "line": { "borderWidth": 3 }
        }
    }
}
{{< /chart >}}


{{< chart >}}
{
    "type": "bar",
    "data": {
        "labels": ["Q1", "Q2", "Q3", "Q4"],
        "datasets": [{
            "type": "line",
            "label": "Objetivo",
            "data": [50, 50, 55, 60],
            "borderColor": "#333333",
            "borderWidth": 2,
            "borderDash": [5, 5],
            "fill": false
        }, {
            "type": "bar",
            "label": "Ventas Reales",
            "data": [45, 52, 48, 64]
        }]
    }
}
{{< /chart >}}
