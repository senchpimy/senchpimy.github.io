---
title: "Excel Sheet Column Name"
date: "20 Jun 2024"
tags: ["LeetCode", "Linked List", "Ruby", "Algorithms"]
---

```py
class Solution:
    def convertToTitle(self, n: int) -> str:
        fin = ""
        while n > 0:
            n-=1
            l = n % 26
            res = n // 26
            c = chr(65+l)
            fin += c
            n = res
            #n-=1
        return fin[::-1]
```
