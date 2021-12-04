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

[**Documentation**](../) > [**Usage**](README.md) > **Object Oreinted**

---

## Explain

Exported `load` and `transpile` functions are wrapped in a class. It asks for a loader, a transpiler, and optional tokenizers to keep and use for load or transpile functions:

```ts
type SchemedConfiguration = {
	loader: Loader;
	transpiler: Transpiler;
	tokenizers?: Tokenizer[];
};

class Schemed {
	constructor(private configuration: SchemedConfiguration): void;

	load(template: string): Scheme;
	transpile(scheme: Scheme, data: Data): string;
}
```

## Examples

Couldn't be easier:

```ts
import { Schemed } from '@schemed/core';

const templator = new Schemed({
	loader,
	transpiler,
	tokenizer,
});

const loaded = await templator.load(template);
const transpiled = await templator.transpile(loaded, data);
```
