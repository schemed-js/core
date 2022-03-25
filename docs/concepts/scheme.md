<div align="center">
    <img alt="Schemed Logo" width="64" src="https://raw.githubusercontent.com/schemed-js/brand/master/dark/main-fill.svg">
    <h1>
		<a href="https://github.com/schemed-js/core">
        	@Schemed/Core
    	</a>
		<span>Documentations</span>
	</h1>
</div>

<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/schemed-js/core">

---

[**Documentation**](../README.md) > [**Concepts**](README.md) > **Scheme**

---

## Explain

**Scheme** is an object containing an array of **Node** objects, and a [tokens](tokenizer.md#tokens) object. It is the result of loading process in **Schemed**, and is the main seed for transpiling process:

```ts
import type { Tokens } from '@schemed/core';

export type Scheme<Node, Key, Query> = {
	nodes?: Node[];
	tokens?: Tokens<Key, Query>;
};
```

---

< Prev Page
[Transpiler](transpiler.md)

Next Page >
[Usage](../usage/README.md)
