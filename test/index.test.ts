import { Loader, Node, Tokenizer, Tokens, Transpiler } from '../dist';
import { Schemed } from '../dist';

const loader: Loader = (template) => {
	const nodes: Node[] = [];

	for (const sentence of template.split('|'))
		nodes.push({
			id: 'string',
			children: sentence.split(',').map((content) => ({
				id: 'word',
				content,
			})),
		});

	return nodes;
};

const tokenizer: Tokenizer = (template) => {
	const expression = /\{\{((?!\}\})(.|\n))*\}\}/g;
	const tokens: Tokens = {};

	let test = expression.exec(template);
	while (test && test[0]) {
		const label = test[0];
		const key = label.replace('{{', '').replace('}}', '').trim();

		tokens[key] ||= [];
		tokens[key].push(label);

		test = expression.exec(template);
	}

	return tokens;
};

const transpiler: Transpiler = (nodes) => {
	const sentences: string[] = [];

	for (const sentence of nodes) {
		const [firstWord, ...words] = sentence.children.map(
			(word) => word.content
		);

		sentences.push(
			firstWord.charAt(0).toUpperCase() +
				firstWord.slice(1).toLowerCase() +
				(words && words.length > 0 ? ' ' : '') +
				(words || []).map((word) => word.toLowerCase()).join(' ') +
				'.'
		);
	}

	return sentences.join('\n');
};

const template =
	'hey|this,is,one,sentence|and,{{first}},and,{{second}},are,injected,data,in,{{second}},sentence';

const data = {
	first: 'FIRST',
	second: 'SECOND',
};

const templator = new Schemed({
	tokenizers: [tokenizer],
	loader,
	transpiler,
});

test('Load', async () =>
	expect(await templator.load(template)).toStrictEqual({
		content: [
			{
				children: [{ content: 'hey', id: 'word' }],
				id: 'string',
			},
			{
				children: [
					{ content: 'this', id: 'word' },
					{ content: 'is', id: 'word' },
					{ content: 'one', id: 'word' },
					{ content: 'sentence', id: 'word' },
				],
				id: 'string',
			},
			{
				children: [
					{ content: 'and', id: 'word' },
					{ content: '{{first}}', id: 'word' },
					{ content: 'and', id: 'word' },
					{ content: '{{second}}', id: 'word' },
					{ content: 'are', id: 'word' },
					{ content: 'injected', id: 'word' },
					{ content: 'data', id: 'word' },
					{ content: 'in', id: 'word' },
					{ content: '{{second}}', id: 'word' },
					{ content: 'sentence', id: 'word' },
				],
				id: 'string',
			},
		],
		tokens: { first: ['{{first}}'], second: ['{{second}}', '{{second}}'] },
	}));

test('Transpile', async () =>
	expect(
		await templator.transpile(await templator.load(template), data)
	).toStrictEqual('Hey.\nThis is one sentence.\nAnd FIRST and SECOND are injected data in SECOND sentence.'));
