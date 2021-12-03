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

[**Documentation**](../) > [**Concepts**](README.md) > **Transpilers**

---

## Explain

### Transpilers

Loaders are functions that will transpile an abstract node array into a string:

```ts
type Transpiler = (nodes: Node[]) => string | Promise<string>;
```

## Examples

```ts
const transpiler = (nodes: Nodes[]) => {
	const sentences: string[] = [];

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

	return sentences.join('\n');
};
```
