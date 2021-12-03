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

[**Documentation**](../) > [**Concepts**](README.md) > **Loaders**

---

## Explain

### Nodes

Node objects are abstract units that will describe your template:

```ts
type Node = {
	id: string;
	attributes?: { [key: string]: any };
	children?: Node[];
	content?: string;
};
```

### Loaders

Loaders are functions that will parse a template, and return an array of Nodes:

```ts
type Loader = (template: string) => Node[] | Promsise<Node[]>;
```

## Examples

```ts
const loader = (template: string) => {
	const nodes: Node[] = [];

	for (const sentence of template.split('|'))
		nodes.push({
			id: 'string',
			children: sentence.split(',').map((content) => ({
				id: 'word',
				content,
			})),
		});

	return nodes;
};
```
