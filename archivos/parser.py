import sys
import markdownify
import os

for file in os.listdir():
    if "html" in file:
        file_name = file[:-5]
        f = open(file,"r")
        html = f.read()
        h = markdownify.markdownify(html, heading_style="ATX")
        with open(file_name+".md", 'w') as f:
            f.write(f'''
---
title: "{file_name}"
---
''')
            f.write(h)
#print(h)
