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

[**Documentation**](README.md) > **API Refrence**

---

## Types

```ts
type PromiseOrValue<Value> = Promise<Value> | Value;

type Tokens<Key, Query> = Map<Key, Query>;

type Tokenizer<InputTemplate, Key, Query> = (
	template: InputTemplate
) => PromiseOrValue<Tokens<Key, Query>>;

type Loader<InputTemplate, Node> = (
	template: InputTemplate
) => PromiseOrValue<Node[]>;

type Scheme<Node, Key, Query> = {
	nodes?: Node[];
	tokens?: Tokens<Key, Query>;
};

type Data<OutputTemplate, Key, Query> = Map<
	Key,
	OutputTemplate | ((query: Query) => PromiseOrValue<OutputTemplate>)
>;

type Injector<OutputTemplate, Key, Query> = (
	template: OutputTemplate,
	tokens: Tokens<Key, Query>,
	data: Data<OutputTemplate, Key, Query>
) => PromiseOrValue<OutputTemplate>;

type Transpiler<OutputTemplate, Node> = (
	nodes: Node[]
) => PromiseOrValue<OutputTemplate>;

type Configuration<InputTemplate, OutputTemplate, Node, Key, Query> = {
	loader: Loader<InputTemplate, Node>;
	transpiler: Transpiler<OutputTemplate, Node>;
	tokenizers?: Tokenizer<InputTemplate, Key, Query>[];
	injector?: Injector<OutputTemplate, Key, Query>;
};
```

## Constructors

```ts
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

## Methods

```ts
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

---

< Prev Page
[Functional](usage/functional.md)
