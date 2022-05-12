import { GraphQLID, GraphQLObjectType, GraphQLSchema } from "graphql";
import { GraphQLErrorHandling } from "../handler";
import { ItemModel } from "../models";
import { ItemQueries } from "./queries";
import { ItemType, BookType } from "./types";

var books = [
	{ name: "Name of the Wind", genre: "Fantasy", id: "1" },
	{ name: "The Final Empire", genre: "Fantasy", id: "2" },
	{ name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

const RootQuery = new GraphQLObjectType({
	name: "RootQuery",
	description: "Root query for all schema types query",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve: (source, args) => {
				return books.find((book) => book.id === args?.id);
			},
		},
		items: ItemQueries.getAllItemQuery,
		item: ItemQueries.getItemById,
		item_without_loader: ItemQueries.getItemByIdWithoutLoader,
	},
});

export const RootSchema = new GraphQLSchema({
	query: RootQuery,
});
