import type { Loader, Node, Tokenizer, Tokens } from '../dist';
import { load } from '../dist';

const template =
	'this,is,one,sentence|and,{{first}},and,{{second}},are,injected,data,in,another,sentence.';

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

load(template, loader, tokenizer)
	.then((scheme) => console.log(JSON.stringify(scheme, null, 2)))
	.catch((error) => console.error(new Date(), error));
