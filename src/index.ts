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

export type Tokenizer = (template: string) => Tokens | Promise<Tokens>;
export type Loader = (template: string) => Node[] | Promise<Node[]>;
export type Transpiler = (nodes: Node[]) => string | Promise<string>;

export async function load(
	template: string,
	loader: Loader,
	...dataTokenizers: Tokenizer[]
) {
	let tokens: Tokens = {};

	for (const tokenizer of dataTokenizers)
		tokens = { ...tokens, ...(await tokenizer(template)) };

	return <Scheme>{
		tokens,
		content: loader(template),
	};
}
