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

[**Documentation**](README.md) > **Installation**

---

## Distributions

Schemed is released in three different versions: [CJS](https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules), [MJS](https://nodejs.org/docs/latest/api/modules.html#the-mjs-extension), and [IIFE](https://developer.mozilla.org/en-US/docs/Glossary).

You can use CJS and MJS versions with [NodeJS](#nodejs) or with code bundlers and IIFE version with [Browsers](#browsers).

Schemed is written in [TypeScript](https://www.typescriptlang.org/), so it comes with a declaration file.

## NodeJS

### Prerequisites

To use Schemed in [NodeJS](https://nodejs.org/) applications or with bundlers, you have to install the latest version of **NodeJS** first. You can download the latest version from the following link:

[NodeJS Downloads](https://nodejs.org/en/download/)

To confirm that you have **NodeJS** and **NPM** installed on your machine, run the following commands inside a command line:

```sh
node -v
npm -v
```

### Installation

`@schemed/core` package is accessible via NPM:

```sh
npm i --save @schemed/core
```

### Usage

CommonJS:

```js
const { Schemed, createSchemedInstance } = require('@schemed/core');
```

MJS:

```js
import { Schemed, createSchemedInstance } from '@schemed/core';
```

## Browsers

### Installation

`@schemed/core` package is available on [unpkg CDN](https://unpkg.com/@schemed/core) for in-browser implementations:

```html
<script src="https://unpkg.com/@schemed/core"></script>
```

### Usage

After loading the script, it appends to the window object:

```html
<script>
	!!Schemed; // is true
	!!createSchemedInstance; // is true
</script>
```

---

< Prev Page
[Documentations](README.md)

Next Page >
[Concepts](concepts/README.md)
