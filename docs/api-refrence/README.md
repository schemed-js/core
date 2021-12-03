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

[**Documentation**](../) > **API Refrence**

---

## Types

```ts
type AsyncReturn<ReturnType> = ReturnType | Promise<ReturnType>;
type StringMap = (content: string) => AsyncReturn<string>;

type Node = {
	id: string;
	attributes?: { [key: string]: any };
	children?: Node[];
	content?: string;
};

type Tokens = { [key: string]: string[] };

type Scheme = {
	content?: Node[];
	tokens?: Tokens;
};

type Data = { [key: string]: string | StringMap };

type Tokenizer = (template: string) => AsyncReturn<Tokens>;
type Loader = (template: string) => AsyncReturn<Node[]>;
type Transpiler = (nodes: Node[]) => AsyncReturn<string>;

type SchemedConfiguration = {
	loader: Loader;
	transpiler: Transpiler;
	tokenizers?: Tokenizer[];
};
```

## Functions

```ts
async function load(
	template: string,
	loader: Loader,
	...dataTokenizers: Tokenizer[]
): Promise<Scheme>;

async function transpile(
	scheme: Scheme,
	transpiler: Transpiler,
	data?: Data
): Promise<string>;
```

## Constructors

```ts
export class Schemed {
	constructor(private configuration: SchemedConfiguration): void;

	load(template: string): Promise<Scheme>;
	transpile(scheme: Scheme, data: Data): Promise<string>;
}
```
