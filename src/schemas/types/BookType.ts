import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
const BookType = new GraphQLObjectType({
	name: "Book",
	description: "Book type",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: new GraphQLNonNull(GraphQLString) },
		genre: { type: GraphQLString },
	}),
});

export { BookType };
