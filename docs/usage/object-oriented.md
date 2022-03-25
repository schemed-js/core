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

[**Documentation**](../README.md) > [**Usage**](README.md) > **Object Oreinted**

---

## Explain

**Schemed** exports a constructor, which asks for a [Loader](../concepts/loader.md), a [Transpiler](../concepts/transpiler.md) and optional [injector](../concepts/injector.md) and [tokenizer](../concepts/tokenizer.md)s and will give you a **load** and a **transpile** function:

```ts
import type {
	Loader,
	Transpiler,
	Tokenizer,
	Injector,
	Scheme,
} from '@schemed/core';

type Configuration<InputTemplate, OutputTemplate, Node, Key, Query> = {
	loader: Loader<InputTemplate, Node>;
	transpiler: Transpiler<OutputTemplate, Node>;
	tokenizers?: Tokenizer<InputTemplate, Key, Query>[];
	injector?: Injector<OutputTemplate, Key, Query>;
};

class Schemed<InputTemplate, OutputTemplate, Node, Key, Query> {
	constructor(
		private configuration: Configuration<
			InputTemplate,
			OutputTemplate,
			Node,
			Key,
			Query
		>
	): void;

	load(template: InputTemplate): Promise<Scheme<Node, Key, Query>>;

	transpile(
		scheme: Scheme<Node, Key, Query>,
		data?: Data<OutputTemplate, Key, Query>
	): Promise<OutputTemplate>;
}
```

## Examples

Couldn't be easier:

```ts
import type { Scheme } from '@schemed/core';

import type {
	InputTemplate,
	OutputTemplate,
	Node,
	Key,
	Query,
} from 'your-code';

import { Schemed } from '@schemed/core';

import {
	loader,
	transpiler,
	tokenizer,
	injector,
	template,
	data,
} from 'your-code';

const engine = new Schemed<InputTemplate, OutputTemplate, Node, Key, Query>({
	loader,
	transpiler,
	tokenizer,
});

const loaded: Scheme<Node, Key, Query> = await engine.load(template);
const transpiled: OutputTemplate = await engine.transpile(loaded, data);
```

---

< Prev Page
[Usage](README.md)

Next Page >
[Functional](functional.md)
