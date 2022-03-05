import { GraphQLID, GraphQLFieldConfig, GraphQLNonNull } from "graphql";

// import { RootValue } from '../../RootValue';
import { ItemType } from "../types";
import { HooksQuery, IGraphQLQuery } from "./HooksQuery";

export class GetItemByIdQuery extends HooksQuery implements IGraphQLQuery {
	public type = ItemType;
	public allow = ["admin"];
	public args = {
		id: { type: new GraphQLNonNull(GraphQLID) },
	};

	public before(context: any, args: any): Promise<any> {
		console.log("hook before args", args);
		return Promise.resolve(args);
	}

	public async execute(root: "Asyikkk", args: any, context: any): Promise<any> {
		console.log("resolve findAuthorById(%s)", args.id);
		const item = await context.Controller.ItemController.getItemById(args.id);
		return item;
	}
}
