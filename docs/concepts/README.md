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

[**Documentation**](../README.md) > **Concepts**

---

## Architecture

**Schemed** is a template engine, an abstract one. **Content loaders**, **data tokenizers**, **Scheme transpilers** and **data injectors** are modular in Schemed.

-   Given a **Loader** function and a set of data **Tokenizer**s, **Schemed** will parse any input content to extract a **Schema**, which includes an abstract syntax tree of your input, and data **tokens**.
-   **Transpiler** transpiles your **Schema** with a given **Data** object using an **Injector** function to final output.

## Definitions

-   [Tokenizer](tokenizer.md)
-   [Loader](loader.md)
-   [Injector](injector.md)
-   [Transpiler](transpiler.md)
-   [Scheme](scheme.md)

---

< Prev Page
[Installation](../installation.md)

Next Page >
[Tokenizer](tokenizer.md)
