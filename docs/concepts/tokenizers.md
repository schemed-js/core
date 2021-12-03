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

[**Documentation**](../) > [**Concepts**](README.md) > **Tokenizers**

---

## Explain

### Tokens

Tokens object keeps a replace string with a key, to be replaced with data later with a transpiler:

```ts
type Tokens = { [key: string]: string[] };
```

### Tokenizers

Functions responsible for extracting tokens from the template are called **Tokenizers**:

```ts
type Tokenizer = (template: string) => Tokens | Promise<Tokens>;
```

## Examples

```ts
const tokenizer = (template: string) => {
	const expression = /\{\{((?!\}\})(.|\n))*\}\}/g;
	const tokens: Tokens = {};

	let test = expression.exec(template);
	while (test && test[0]) {
		const label = test[0];
		const key = label.replace('{{', '').replace('}}', '').trim();

		tokens[key] ||= [];
		tokens[key].push(label);

		test = expression.exec(template);
	}

	return tokens;
};
```
