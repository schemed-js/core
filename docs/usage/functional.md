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

[**Documentation**](../README.md) > [**Usage**](README.md) > **Functional**

---

## Explain

**Schemed** exports a function named **createSchemedInstance**. It constructs a **Schemed** instance for functional usage:

```ts
import type { Configuration, Schemed } from '@schemed/core';

function createSchemedInstance<InputTemplate, OutputTemplate, Node, Key, Query>(
	configuration: Configuration<
		InputTemplate,
		OutputTemplate,
		Node,
		Key,
		Query
	>
): Schemed<InputTemplate, OutputTemplate, Node, Key, Query>;
```

## Examples

As simple as it sounds:

```ts
import type { Scheme } from '@schemed/core';

import type {
	InputTemplate,
	OutputTemplate,
	Node,
	Key,
	Query,
} from 'your-code';

import { createSchemedInstance } from '@schemed/core';

import {
	loader,
	transpiler,
	tokenizer,
	injector,
	template,
	data,
} from 'your-code';

const engine = createSchemedInstance<
	InputTemplate,
	OutputTemplate,
	Node,
	Key,
	Query
>({
	loader,
	transpiler,
	tokenizer,
	injector,
});

const loaded: Scheme<Node, Key, Query> = await engine.load(template);
const transpiled: OutputTemplate = await engine.transpile(loaded, data);
```

---

< Prev Page
[Object Oriented](object-oriented.md)

Next Page >
[API Refrence](../api-refrence.md)
