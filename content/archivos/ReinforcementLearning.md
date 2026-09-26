---
title: "Reinforcement Learning"
date: "15 Jul 2025"
tags: ["Machine Learning", "Reinforcement Learning", "Algorithms", "AI"]
---
En este ejemplo se va a resolver el pendulo y el aterrizaje lunar

## Continuous Action Spaces

En el aprendizaje por refuerzo un espacion de acciones continuo es
un conjunto de acciones posibles infinitamente divisibles y no discretas. Es decir
el agente puedelegir valores reales dentro de un rango continuo en lugar 
de un numero finito de acciones predefinidas.

| Tipo de Espacio | Ejemplo                                | Descripción                                       |                                                                  |
| --------------- | -------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| **Discreto**    | `["izquierda", "derecha", "quedarse"]` | El agente elige una acción de un conjunto finito. |                                                                  |
| **Continuo**    | \`\[a ∈ ℝ                              | -1 ≤ a ≤ 1]\`                                     | El agente puedelegir cualquier número real dentro de un rango. |

Muchas aplicaciones en el mundo real requieren un agente que seleccioné acciones dentro de un 
espacio continuo.

### Pendulo

El ejemplo del pendulo se trata de un problema el cual se intenta mantener un pendulo sin friccion
centrado en la parte superior.

```python
import gymnasium as gym

env = gym.make("Pendulum-v1", render_mode="human")
observation, _ = env.reset(seed=43)
print(observation) # [ 0.5760367   0.8174238  -0.91244936]
```
La entrada consiste en en tres observaciones [según la documentacion](https://github.com/openai/gym/wiki/Pendulum-v1)
siendo el angulo definido como theta las entradas son cos(theta), sin(theta), theta dot
el esfuerzo consiste en un valor en el rango de -2 - +2, y la ecuacion de recompensa se define como: -(theta^2 + 0.1*theta_dt^2 + 0.001*action^2)
Theta es normalizado entre -pi y pi. Por lo que la menor recompensa es -(pi^2 + 0.1*8^2 + 0.001*2^2) = -16.2736044 y la mayor es 0

### Lunar Lander

```python
import gymnasium as gym

env = gym.make("LunarLander-v3", render_mode="human")
observation, _ = env.reset(seed=43)
print(observation) # [-0.00353403  1.4049611  -0.35797688 -0.26485512  0.00410186  0.08108699  0.          0.        ]
```
La entrada consiste en 8 datos:
- La coordenada x
- La coordenada y
- La velocidad horizontal
- La velocidad vertical
- La orientacion (theta)
- La velocidad angular
- Pata izquierda y derecha tocando el suelo (booleano cada uno)

