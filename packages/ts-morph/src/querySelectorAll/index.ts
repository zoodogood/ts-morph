import { SyntaxKind } from "@ts-morph/common";
import { Selector, SelectorType } from "css-what";
import { Node, SourceFile } from "../compiler";
import { Project } from "../Project";
import { QuerySelectContext } from "./QuerySelectorContext";

function* searchIn<T extends Node>(node: Node | SourceFile | Project, context: QuerySelectContext<T>): Generator<Node> {
	if (node instanceof Node) {
		if (isValidedTarget(node, context)) {
			yield node as Node;
		}
		for (const child of node.getChildren()) {
			yield* searchIn(child, context);
		} 
	}
	if (node instanceof Project) {
		for (const element of node.getSourceFiles()) {
			yield* searchIn(element, context);
		} 
	}
}

export function* querySelectorAllInProject<T extends Node>(project: Project, selector: string) {
	const context = new QuerySelectContext(selector)
	return searchIn<T>(project, context);
}
export function* querySelectorAllInFile<T extends Node>(file: SourceFile, selector: string) {
	const context = new QuerySelectContext(selector)
	return searchIn<T>(file, context);
}

export function* querySelectorAllInNode<T extends Node>(node: Node, selector: string): Generator<Node> {
	const context = new QuerySelectContext(selector)
	return searchIn<T>(node, context);
}

export function isValidedTarget<T extends Node>(node: Node, context: QuerySelectContext<T>) {
	const { parsed_selector } = context
	let current_point: Node | undefined = node;
	return !!parsed_selector.findLast(($: Selector) => {
		switch ($.type) {
			case SelectorType.Descendant:
				while (current_point = current_point!.getParent()) {
					if (validate(current_point!, $)) {
						return false // continue to next $
					}
				} 
				return true // target is not valid
			case SelectorType.Child:
				current_point = current_point!.getParent()
				if (current_point === undefined) {
					return true // target is not valid
				}
				return !validate(current_point, $)
			default: return !validate(node, $)
		}
	})
}

function validate(node: Node, $: Selector) {
	switch ($.type) {
		case "attribute":
			switch ($.name) {
				case "name": 
					return +((node as (Node & { getName(): string })).getName?.() !== $.value) ^ +($.value !== undefined)
				default: throw new Error()
			}
		case "tag": 
			return node.getKind() === SyntaxKind[$.name]
		default: throw new Error()
	}
}