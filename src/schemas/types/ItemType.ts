import { GraphQLObjectType } from "graphql";
import { IdField } from "../fields";

export const ItemType = new GraphQLObjectType({
	name: "Item",
	description: "A single data item",
	fields: () => ({
		id: new IdField(),
	}),
});
