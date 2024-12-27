import { Node } from "../../compiler";

export function* getGraphLeaves(node: Node): Generator<Node> {
	const children = node.getChildren()
	if (!children.length) {
		yield node;
	}
	for (const generator of children.map(node => getGraphLeaves(node))) {
		yield* generator;
	} 
}