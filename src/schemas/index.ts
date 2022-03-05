import { GraphQLObjectType, GraphQLSchema } from "graphql";

// import { GraphQLErrorHandling } from "../core";
import { GetItemByIdQuery } from "./queries";
// import {
//     CreateAuthorMutation,
//     DeleteAuthorMutation,
//     UpdateAuthorMutation
// } from './mutations';

export class Schema {
	private static instance: Schema;

	private rootQuery: GraphQLObjectType = new GraphQLObjectType({
		name: "Query",
		fields: {
			getItem: new GetItemByIdQuery(),
		},
	});

	// private rootMutation: GraphQLObjectType = new GraphQLObjectType({
	// 	name: "Mutation",
	// 	fields: {
	// 		createAuthor: new CreateAuthorMutation(),
	// 		updateAuthor: new UpdateAuthorMutation(),
	// 		deleteAuthor: new DeleteAuthorMutation(),
	// 	},
	// });

	private schema: GraphQLSchema = new GraphQLSchema({
		query: this.rootQuery,
		// mutation: this.rootMutation,
	});

	static get(): GraphQLSchema {
		if (!Schema.instance) {
			Schema.instance = new Schema();
			// GraphQLErrorHandling.watch(Schema.instance.schema);
			console.error(Schema.instance.schema);
		}
		return Schema.instance.schema;
	}
}
