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

[**Documentation**](../) > **Concepts**

---

## Architecture

Schemed is a string template engine, an abstract one. Loaders, Tokenizers, and Transpilers are modular in Schemed.

-   Using a **Loader** function, and a set of data **Tokenizer** functions, you can parse the content to extract a **Schema**, which includes an abstract syntax tree, and data tokens.
-   **Transpiler** transpiles your **Schema** with a given **Data** object to final content.

## Definitions

-   [Tokenizers](tokenizers.md)
-   [Loaders](loaders.md)
-   [Transpilers](transpilers.md)
