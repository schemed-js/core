import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import licensePlugin from 'rollup-plugin-license';

import { resolve } from 'path';
import { readFile } from 'fs/promises';

const generateConfiguration = (module = 'iife', license = null) => ({
	input: './src/index.ts',
	plugins: [typescript({ target: module === 'mjs' ? 'ES6' : 'ES3' })].concat(
		module === 'iife'
			? [terser({ format: { comments: false } })]
			: [licensePlugin({ banner: license })]
	),
	output: [
		{
			file: 'dist/index.' + (module === 'iife' ? 'js' : module),
			format: module === 'mjs' ? 'es' : module,
			name: module === 'iife' && 'window',
			extend: module === 'iife',
		},
	],
});

export default async () => {
	const license = await readFile(resolve(__dirname, 'LICENSE'), 'utf-8');
	const configurations = [
		generateConfiguration('cjs', license),
		generateConfiguration('mjs', license),
		generateConfiguration(),
	];

	return configurations;
};
