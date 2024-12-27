
import { parse } from "css-what";
import { Node } from "../compiler";
export class QuerySelectContext<T extends Node> {
	selector: string
	parsed_selector: ReturnType<typeof parse>
	constructor(selector: string) {
		this.selector = selector
		this.parsed_selector = parse(selector)
	}
}