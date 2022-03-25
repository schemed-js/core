import type {
	Loader,
	Tokens,
	Tokenizer,
	Transpiler,
	Data,
	Injector,
} from '../src';

import { Schemed } from '../src';

type Template = string;
type Key = string;
type Query = string;
type Node = {
	id: 'sentence';
	children: {
		id: 'word';
		content: string;
	}[];
};

const loader: Loader<Template, Node> = (template) => {
	const nodes: Node[] = [];

	for (const sentence of template.split('/'))
		nodes.push({
			id: 'sentence',
			children: sentence.split(' ').map((content) => ({
				id: 'word',
				content,
			})),
		});

	return nodes;
};

const tokenizer: Tokenizer<Template, Key, Query> = (template) => {
	const expression = /-\w+-/g;
	const tokens: Tokens<Key, Query> = new Map();

	let test = expression.exec(template);
	while (test && test[0]) {
		const label = test[0];
		const key = label.slice(1, label.length - 1);

		if (!tokens.has(key)) tokens.set(key, label);

		test = expression.exec(template);
	}

	return tokens;
};

const transpiler: Transpiler<Template, Node> = (nodes) => {
	const sentences: string[] = [];

	for (const sentence of nodes)
		sentences.push(sentence.children.map((word) => word.content).join('-'));

	return sentences.join(', ');
};

const injector: Injector<Template, Key, Query> = async (
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

const templator = new Schemed<Template, Template, Node, Key, Query>({
	tokenizers: [tokenizer],
	loader,
	transpiler,
	injector,
});

const template = 'Schemed Test -firstData-/-secondData- Injected';

test('Load', async () => {
	const loaded = await templator.load(template);
	const tokens = new Map();

	tokens.set('firstData', '-firstData-');
	tokens.set('secondData', '-secondData-');

	expect(loaded).toStrictEqual({
		nodes: [
			{
				id: 'sentence',
				children: [
					{ id: 'word', content: 'Schemed' },
					{ id: 'word', content: 'Test' },
					{ id: 'word', content: '-firstData-' },
				],
			},
			{
				id: 'sentence',
				children: [
					{ id: 'word', content: '-secondData-' },
					{ id: 'word', content: 'Injected' },
				],
			},
		],
		tokens,
	});
});

test('Transpile', async () => {
	const loaded = await templator.load(template);
	const data: Data<Template, Key, Query> = new Map();

	data.set(
		'firstData',
		(label: string) => `firstFlag:${label.replace(/-/g, '')}`
	);
	data.set(
		'secondData',
		(label: string) => `secondFlag:${label.replace(/-/g, '')}`
	);

	expect(await templator.transpile(loaded, data)).toStrictEqual(
		'Schemed-Test-firstFlag:firstData, secondFlag:secondData-Injected'
	);
});
