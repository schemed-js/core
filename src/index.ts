export type Node = {
	id: string;
	attributes?: { [key: string]: any };
	children?: Node[];
	content?: string;
};

export type Tokens = { [key: string]: string[] };

export type Scheme = {
	content?: Node[];
	tokens?: Tokens;
};

export type StringMap = (content: string) => string | Promise<string>;

export type Data = { [key: string]: string | StringMap };

export type Tokenizer = (template: string) => Tokens | Promise<Tokens>;
export type Loader = (template: string) => Node[] | Promise<Node[]>;
export type Transpiler = (nodes: Node[]) => string | Promise<string>;

export async function load(
	template: string,
	loader: Loader,
	...dataTokenizers: Tokenizer[]
) {
	let tokens: Tokens = {};

	for (const tokenizer of dataTokenizers || [])
		tokens = { ...tokens, ...(await tokenizer(template)) };

	return <Scheme>{
		tokens,
		content: loader(template),
	};
}

export async function transpile(
	scheme: Scheme,
	transpiler: Transpiler,
	data?: Data
) {
	let transpiled = await transpiler(scheme.content);

	if (data)
		for (const [key, tags] of Object.entries(scheme.tokens)) {
			for (const search of tags) {
				transpiled = transpiled.replace(
					new RegExp(search, 'g'),
					typeof data[key] === 'function'
						? (data[key] as Function)(search)
						: data[key]
				);
			}
		}

	return transpiled;
}
