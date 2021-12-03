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

[**Documentation**](../) > [**Usage**](README.md) > **Functional**

---

## Explain

### Schemes

Extracted nodes and tokens from a template will be stored in a Scheme object after load to be passed to a transpiler:

```ts
type Scheme = {
	content?: Node[];
	tokens?: Tokens;
};
```

### Data

Data objects contain content for each token id. It can be a string, or a function, or Promise returning a string:

```ts
type Data = { [key: string]: string | StringMap };
```

### Load

Schemed exports a `load` function that converts a template to a scheme using provided loader and tokenizers:

```ts
async function load(
	template: string,
	loader: Loader,
	...dataTokenizers: Tokenizer[]
): Scheme | Promise<Scheme>;
```

### Transpile

To export final content from a scheme with given data, you can use the `transpile` function:

```ts
export async function transpile(
	scheme: Scheme,
	transpiler: Transpiler,
	data?: Data
): string | Promise<string>;
```

## Examples

As simple as it sounds:

```ts
import { load, transpile } from '@schemed/core';

const template = `
span
    span Hello
    b {{ name }}
`;

const data = { name: 'World' };

const scheme = load(template, pugLoader, handlebarsTokenizer);

const content = transpile(scheme, data);
```
