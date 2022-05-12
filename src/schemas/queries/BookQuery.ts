import {
	GraphQLObjectType,
	GraphQLSpecifiedByDirective,
	GraphQLField,
	GraphQLID,
	buildSchema,
} from "graphql";
import { BookType } from "../types";

var books = [
	{ name: "Name of the Wind", genre: "Fantasy", id: "1" },
	{ name: "The Final Empire", genre: "Fantasy", id: "2" },
	{ name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

const BookQuery = new GraphQLObjectType({
	name: "BookQuery",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve: (source, args) => {
				return books.find((book) => book.id === args?.id);
			},
		},
	},
});

export { BookQuery };
