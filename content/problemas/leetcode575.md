---
title: "Distribute Candies"
date: "07 Jul 2026"
tags: ["LeetCode", "Mathematics","Python", "Algorithms"]
katex: true
---

## Distribute Candies

Este problema consiste en dado una lista con diferentes "dulces", ver si se puede comer todos los dulces o solo la mitad

### Solución

```python
class Solution(object):
    def distributeCandies(self, candyType):
        t = set()
        for c in candyType:
            t.add(c)
        return min(len(candyType)//2,len(t))
        """
        :type candyType: List[int]
        :rtype: int
        """
        
```

