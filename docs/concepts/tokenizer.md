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

[**Documentation**](../README.md) > [**Concepts**](README.md) > **Tokenizer**

---

## Explain

### Tokens

**Tokens** is a Javascript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object, where each key contains a search query, and these keys and queries will be uesd to inject [Data](injector.md#data) while [Transpiling](transpiler.md) a [Scheme](scheme.md):

```ts
type Tokens<Key, Query> = Map<Key, Query>;
```

### Tokenizer

A **Tokenizer** is a function which will extract **Tokens** from a **Template**:

```ts
import type { PromiseOrValue, Tokens } from '@schemed/core';

type Tokenizer<InputTemplate, Key, Query> = (
	template: InputTemplate
) => PromiseOrValue<Tokens<Key, Query>>;
```

## Examples

Following example is a simple [Mustache](https://mustache.github.io/) like tokenizer:

```ts
import type { Tokens, Tokenizer } from '@schemed/core';

type InputTemplate = string;
type Key = string;
type Query = string;

const tokenizer: Tokenizer<InputTemplate, Key, Query> = (template) => {
	const expression = /\{\{((?!\}\})(.|\n))*\}\}/g;
	const tokens: Tokens<Key, Query> = new Map();

	let test = expression.exec(template);
	while (test && test[0]) {
		const label = test[0];
		const key = label.replace('{{', '').replace('}}', '').trim();

		if (!tokens.has(key)) tokens.set(key, label);

		test = expression.exec(template);
	}

	return tokens;
};

const template: InputTemplate = 'Hello {{name}}! Welcome to {{page-id}}.';
const tokens: Tokens<Key, Query> = tokenizer(template);

/*
tokens will be Map(2) {'name' => '{{name}}', 'page-id' => '{{page-id}}'}
*/
```

---

< Prev Page
[Concepts](README.md)

Next Page >
[Loader](loader.md)
