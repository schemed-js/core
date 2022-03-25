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

[**Documentation**](../README.md) > [**Concepts**](README.md) > **Injector**

---

## Explain

### Data

**Data** object is a javascript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), which each key will containing a strict value, or a value generator function, and the resulting value will be replaced with the query string stored in with the same key in [Tokens](tokenizer.md#tokens) object. Notice the type of value generator function:

```ts
import type { PromiseOrValue } from '@schemed/core';

type Data<OutputTemplate, Key, Query = never> = Map<
	Key,
	OutputTemplate | ((query: Query) => PromiseOrValue<OutputTemplate>)
>;
```

### Injector

**Injector** is a function responsible for injecting given **Data** object to a **Template** using a **Tokens** object:

```ts
import type { PromiseOrValue, Tokens, Data }

type Injector<OutputTemplate, Key, Query> = (
	template: OutputTemplate,
	tokens: Tokens<Key, Query>,
	data: Data<OutputTemplate, Key, Query>
) => PromiseOrValue<OutputTemplate>;
```

## Exmaple

Following example is a simple string data injector:

```ts
Import type { Tokens, Data, Injector } from '@schemed/core';

type OutputTemplate = string;
type Key = string;
type Query = string | RegExp;

const injector: Injector<OutputTemplate, Key, Query> = async (
	template,
	tokens,
	data
) => {
	for (const [key, value] of data.entries()) {
		const query = tokens.get(key);
		if (!query) continue;

		template = template.replace(
			new RegExp(query, 'g'),
			typeof value === 'string' ? value : await value(query)
		);
	}

	return template;
};

const tokens: Tokens<Key, Query>  = new Map([
    ['name', '{{ name }}'],
    ['page-id', '{{ page-id }}'],
]);

const data: Data<OutputTemplate, Key, Query> = new Map([
    ['name', 'world'],
    ['page-id', 'landing']
]);

const template: OutputTemplate = 'Hello {{name}}! Welcome to {{page-id}}.';

const injected: OutputTemplate = injector(template, tokens, data);

/*
injected will be 'Hello world! Welcome to landing.';
*/
```

---

< Prev Page
[Loader](loader.md)

Next Page >
[Transpiler](transpiler.md)
