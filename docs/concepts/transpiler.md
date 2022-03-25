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

[**Documentation**](../README.md) > [**Concepts**](README.md) > **Transpilers**

---

## Explain

**Transpiler** is a function that will receive a custom **Node** array and is expected to return a **Template** object:

```ts
import type { PromiseOrValue } from '@schemed/core';

type Transpiler<OutputTemplate, Node> = (
	nodes: Node[]
) => PromiseOrValue<OutputTemplate>;
```

## Examples

Following example will transpile a custom node type to a normalized string:

```ts
import type { Transpiler } from '@schemed/core';

type OutputTemplate = string;
type Node = {
	id: 'sentence';
	children: {
		id: 'word';
		content: string;
	}[];
};

const transpiler: Transpiler<OutputTemplate, Node> = (nodes: Nodes[]) => {
	const sentences: Template[] = [];

	for (const sentence of nodes) {
		const [firstWord, ...words] = sentence.children.map(
			(word) => word.content
		);

		sentences.push(
			firstWord.charAt(0).toUpperCase() +
				firstWord.slice(1).toLowerCase() +
				(words && words.length > 0 ? ' ' : '') +
				(words || []).map((word) => word.toLowerCase()).join(' ') +
				'.'
		);
	}

	return sentences.join(' ');
};

const transpiled: OutputTemplate = transpiler([
	{
		id: 'sentence',
		children: [
			{ id: 'word', content: 'hello' },
			{ id: 'word', content: '{{name}}!' },
		],
	},
	{
		id: 'sentence',
		children: [
			{ id: 'word', content: 'welcome' },
			{ id: 'word', content: 'to' },
			{ id: 'word', content: '{{page-id}}' },
		],
	},
]);

/*
transpiled will be 'Hello {{name}}! Welcome to {{page-id}}.'
*/
```

---

< Prev Page
[Loader](loader.md)

Next Page >
[Scheme](scheme.md)
