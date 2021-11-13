export type Node = {
	id: string;
	attributes?: { [key: string]: any };
	children?: Node[];
	content?: string;
};

export type Loader = (template: string) => Node[] | Promise<Node[]>;
