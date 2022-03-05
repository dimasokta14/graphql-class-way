import { Context } from "../../context";
import { Item } from "../../models";

import { HooksField, IGraphQLField } from "./HooksField";
import { ItemType } from "../types";

export class ItemField extends HooksField implements IGraphQLField {
	public type = ItemType;
	public name = "author";
	public description = "The author of this book";
	public args;

	public execute(source: any, args: any, context: Context<any>): Promise<any>;
	public execute(source: any, args: any, context: Context<any>): Promise<any> {
		// Repo way
		// return context.getRepositories().getAuthorRepository().findAuthorById(source.authorId);
		// DataLoader
		return context.DataLoaders.ItemDataLoader.load(source?.id);
		// Benchmark with 1000 Authors and per Author 10 Books
		// With Loaders => ca. 2s
		// Without Loaders => ca. 4s
	}
}
