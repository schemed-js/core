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

[**Documentation**](../README.md) > [**Concepts**](README.md) > **Loader**

---

## Explain

**Loader** is a functions which is expected to recive a custom **Template** object, and return an array of custom **Node** objects:

```ts
import type { PromiseOrValue } frin '@schemed/core';

type Loader<InputTemplate, Node> = (template: InputTemplate) => PromiseOrValue<Node[]>;
```

## Examples

Following loader will break a string to a custom node type:

```ts
import type { Loader } from '@schemed/core';

type InputTemplate = string;
type Node = {
	id: 'sentence';
	children: {
		id: 'word';
		content: string;
	}[];
};

const loader: Loader<InputTemplate, Node> = (template: string) => {
	return template
		.trim()
		.split('.')
		.filter((sentence) => sentence.length > 0)
		.map((sentence) => ({
			id: 'sentence',
			children: sentence
				.trim()
				.split(' ')
				.filter((word) => sentence.length > 0)
				.map((word) => ({
					id: 'word',
					content: word,
				})),
		}));
};

const loaded: Node[] = loader(
	'Hello {{name}}! Welcome to {{page-id}}.'
);

/*
loaded will be [
	{
		id: 'sentence',
		children: [
			{ id: 'word', content: 'Hello' },
			{ id: 'word', content: '{{name}}!' }
		]
	},
	{
		id: 'sentence',
		children: [
			{ id: 'word', content: 'Welcome' },
			{ id: 'word', content: 'to' },
			{ id: 'word', content: '{{page-id}}.' }
		]
	},
]
*/
```

---

< Prev Page
[Tokenizer](tokenizer.md)

Next Page >
[Injector](injector.md)
