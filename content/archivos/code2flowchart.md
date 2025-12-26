---
title: "Code 2 Flowchart"
date: "25 Dec 2025"
---

Este es un programa que pense hacer
en los primeros semestres cuando me pedian
hacer un diagrama de flujo de los
programas que hacia, este programa
usa [treesitter](https://tree-sitter.github.io/tree-sitter/)
para poder obtener la syntaxis de cualquier
lenguaje. El programa lo hice en TS
para que pueda ser usado en cualquier lado

## Parsing
Instalamos el parser desde el package manager
```sh
bun add tree-sitter-c # para el caso de C
```

Ya instalados los movemos para
que se puedan usar, en este caso se hace
como script en el package.json
```js
"setup-wasm": "mkdir -p static/wasm && cp node_modules/web-tree-sitter/tree-sitter.wasm static/wasm/ && cp node_modules/tree-sitter-javascript/tree-sitter-javascript.wasm static/wasm/ && cp node_modules/tree-sitter-python/tree-sitter-python.wasm static/wasm/ && cp node_modules/tree-sitter-c/tree-sitter-c.wasm static/wasm/ && cp node_modules/tree-sitter-go/tree-sitter-go.wasm static/wasm/ && cp node_modules/tree-sitter-rust/tree-sitter-rust.wasm static/wasm/ && cp node_modules/tree-sitter-java/tree-sitter-java.wasm static/wasm/ && cp node_modules/tree-sitter-cpp/tree-sitter-cpp.wasm static/wasm/"
```

Importamos tree-sitter y cargamos el parser

```js
import { Parser, Language, type SyntaxNode } from "web-tree-sitter";

  let selectedLanguageId = "c";
  let sourceCode = exampleCodes[selectedLanguageId];
  onMount(async () => {
    try {
      await Parser.init({
        locateFile: (path) => `/wasm/${path}`,
      });
      parser = new Parser();

      await Promise.all(
        LANGUAGES.map(async (lang) => {
          loadingMessage = `Cargando gramática de ${lang.name}...`;
          const language = await Language.load(`/wasm/${lang.wasmFile}`);
          loadedLanguages.set(lang.id, language);
        }),
      );

      isLoading = false;
      await parseCode();
    } catch (error) {
      console.error("Error al inicializar Tree-sitter:", error);
      errorMessage =
        "No se pudo cargar el parser. Verifique la carpeta public/wasm/.";
      isLoading = false;
    }
  });
```

Luego podemos parserar el codigo fuente simplemente con

```ts
  var ast_Output = "";

  async function parseCode() {
    if (isLoading || !parser) return;

    const currentLanguage = loadedLanguages.get(selectedLanguageId);
    if (!currentLanguage) return;

    try {
      parser.setLanguage(currentLanguage);
      const tree = parser.parse(sourceCode);
      flowchartNodes = astToFlowNodes(tree.rootNode);
      ast_Output = tree?.rootNode.toString();
    } catch (e) {
      console.error(e);
    }
  }
```

Y luego recorremos el arbol de sintaxis de manera
recursiva, identificando cada elemento y asignandole
un tipo y un estilo para el nodo en el diagrama

```ts
function createFlowNode(
  id: string,
  text: string,
  type: FlowNode["type"],
  targets: string[],
): FlowNode {
  return { id, text, type, targets };
}

function addNode(
  id: string,
  text: string,
  type: FlowNode["type"],
  targets: string[] = [],
): FlowNode {
  const node = createFlowNode(id, text, type, targets);
  nodes.push(node);
  return node;
}

function connectNodes(sourceIds: string[], targetId: string) {
  for (const sourceId of sourceIds) {
    const sourceNode = nodes.find((n) => n.id === sourceId);
    if (sourceNode && !sourceNode.targets.includes(targetId)) {
      sourceNode.targets.push(targetId);
    }
  }
}
```

Y dependiendo del tipo del nodo se le asigna un 
estilo en especifico

```ts
      // 3. Decisions (If)
      if (
        ["if_statement", "elif_clause", "if_expression"].includes(node.type)
      ) {
        const condition = node.childForFieldName("condition");
        const consequence = node.childForFieldName("consequence");
        const alternative = node.childForFieldName("alternative");

        const decisionId = getNewId("decision");
        addNode(decisionId, cleanText(condition?.text ?? "?"), "decision");
        connectNodes(entryIds, decisionId);

        let exitPaths: string[] = [];
        if (consequence) exitPaths.push(...walk(consequence, [decisionId]));
        if (alternative) {
          exitPaths.push(...walk(alternative, [decisionId]));
        } else {
          exitPaths.push(decisionId);
        }
        return exitPaths;
      }
```

