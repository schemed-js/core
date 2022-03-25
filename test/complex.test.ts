import type {
	Loader,
	Tokens,
	Tokenizer,
	Transpiler,
	Data,
	Injector,
} from '../src';

import { Schemed } from '../src';

type InputTemplate = { input: string };
type OutputTemplate = { output: string };
type Key = number;
type Query = { query: string };
type Node = {
	id: 'sentence';
	children: {
		id: 'word';
		content: string;
	}[];
};

const loader: Loader<InputTemplate, Node> = (template) => {
	const nodes: Node[] = [];

	for (const sentence of template.input.split('/'))
		nodes.push({
			id: 'sentence',
			children: sentence.split(' ').map((content) => ({
				id: 'word',
				content,
			})),
		});

	return nodes;
};

const tokenizer: Tokenizer<InputTemplate, Key, Query> = (template) => {
	const expression = /-\w+-/g;
	const tokens: Tokens<Key, Query> = new Map();

	let test = expression.exec(template.input);
	while (test && test[0]) {
		const label = { query: test[0] };
		const key = parseInt(label.query.slice(1, label.query.length - 1));

		if (!tokens.has(key)) tokens.set(key, label);

		test = expression.exec(template.input);
	}

	return tokens;
};

const transpiler: Transpiler<OutputTemplate, Node> = (nodes) => {
	const sentences: string[] = [];

	for (const sentence of nodes)
		sentences.push(
			sentence.children
				.map((word) => word.content.toLowerCase())
				.join('-')
		);

	return { output: sentences.join(', ') };
};

const injector: Injector<OutputTemplate, Key, Query> = async (
	template,
	tokens,
	data
) => {
	let output = template.output;

	for (const [key, value] of data.entries()) {
		const query = tokens.get(key);
		if (!query) continue;

		output = output.replace(
			new RegExp(query.query, 'g'),
			typeof value === 'string'
				? value
				: (await (value as Function)(query)).output
		);
	}

	return { output };
};

const templator = new Schemed<InputTemplate, OutputTemplate, Node, Key, Query>({
	tokenizers: [tokenizer],
	loader,
	transpiler,
	injector,
});

const template = 'Schemed Test -1-/-2- Injected';

test('Load', async () => {
	const loaded = await templator.load({ input: template });
	const tokens: Tokens<Key, Query> = new Map();

	tokens.set(1, { query: '-1-' });
	tokens.set(2, { query: '-2-' });

	const nodes: Node[] = [
		{
			id: 'sentence',
			children: [
				{ id: 'word', content: 'Schemed' },
				{ id: 'word', content: 'Test' },
				{ id: 'word', content: '-1-' },
			],
		},
		{
			id: 'sentence',
			children: [
				{ id: 'word', content: '-2-' },
				{ id: 'word', content: 'Injected' },
			],
		},
	];

	expect(loaded).toStrictEqual({ nodes, tokens });
});

test('Transpile', async () => {
	const loaded = await templator.load({ input: template });
	const data: Data<OutputTemplate, Key, Query> = new Map();

	const map = (flag: string) => (query: Query) => ({
		output: `${flag}:${query.query.replace(/-/g, '')}`,
	});

	data.set(1, map('A'));
	data.set(2, map('B'));

	expect(await templator.transpile(loaded, data)).toStrictEqual({
		output: 'schemed-test-A:1, B:2-injected',
	});
});
