export type PromiseOrValue<Value> = Promise<Value> | Value;

export type Loader<InputTemplate, Node> = (
	template: InputTemplate
) => PromiseOrValue<Node[]>;

export type Tokens<Key, Query> = Map<Key, Query>;

export type Tokenizer<InputTemplate, Key, Query> = (
	template: InputTemplate
) => PromiseOrValue<Tokens<Key, Query>>;

export type Scheme<Node, Key, Query> = {
	nodes?: Node[];
	tokens?: Tokens<Key, Query>;
};

export type Transpiler<OutputTemplate, Node> = (
	nodes: Node[]
) => PromiseOrValue<OutputTemplate>;

export type Data<OutputTemplate, Key, Query> = Map<
	Key,
	OutputTemplate | ((query: Query) => PromiseOrValue<OutputTemplate>)
>;

export type Injector<OutputTemplate, Key, Query> = (
	template: OutputTemplate,
	tokens: Tokens<Key, Query>,
	data: Data<OutputTemplate, Key, Query>
) => PromiseOrValue<OutputTemplate>;

export type Configuration<InputTemplate, OutputTemplate, Node, Key, Query> = {
	loader: Loader<InputTemplate, Node>;
	transpiler: Transpiler<OutputTemplate, Node>;
	tokenizers?: Tokenizer<InputTemplate, Key, Query>[];
	injector?: Injector<OutputTemplate, Key, Query>;
};

export class Schemed<InputTemplate, OutputTemplate, Node, Key, Query> {
	private loader: Loader<InputTemplate, Node>;
	private transpiler: Transpiler<OutputTemplate, Node>;
	private tokenizers: Tokenizer<InputTemplate, Key, Query>[];
	private injector: Injector<OutputTemplate, Key, Query>;

	constructor(
		configuration: Configuration<
			InputTemplate,
			OutputTemplate,
			Node,
			Key,
			Query
		>
	) {
		this.loader = configuration.loader;
		this.transpiler = configuration.transpiler;
		this.tokenizers = configuration.tokenizers || [];
		this.injector = configuration.injector;
	}

	async load(template: InputTemplate) {
		let tokens: Tokens<Key, Query> = new Map();

		for (const tokenizer of this.tokenizers) {
			const extractedTokens = await tokenizer(template);
			for (const [key, value] of Array.from(extractedTokens.entries()))
				tokens.set(key, value);
		}

		const scheme: Scheme<Node, Key, Query> = {
			tokens,
			nodes: await this.loader(template),
		};

		return scheme;
	}

	async transpile(
		scheme: Scheme<Node, Key, Query>,
		data: Data<OutputTemplate, Key, Query>
	) {
		const transpiled = await this.transpiler(scheme.nodes);
		return data && scheme.tokens && this.injector
			? await this.injector(transpiled, scheme.tokens, data)
			: transpiled;
	}
}

export function createSchemedInstance<
	InputTemplate,
	OutputTemplate,
	Node,
	Key,
	Query
>(
	configuration: Configuration<
		InputTemplate,
		OutputTemplate,
		Node,
		Key,
		Query
	>
) {
	return new Schemed(configuration);
}
