import { Loader, Node, Tokenizer, Tokens, Transpiler } from '../dist';
import { load, transpile } from '../dist';

const template =
	'hey|this,is,one,sentence|and,{{first}},and,{{second}},are,injected,data,in,another,sentence';

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

const data = {
	first: 'FIRST',
	second: 'SECOND',
};

load(template, loader, tokenizer)
	.then((scheme) =>
		transpile(scheme, transpiler, data)
			.then((transpiled) => console.log(transpiled))
			.catch((error) => {
				throw error;
			})
	)
	.catch((error) => console.error(new Date(), error));
