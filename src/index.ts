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
