import { GraphQLFieldConfig, GraphQLID } from "graphql";

export class IdField {
	public type = GraphQLID;
	public name = "id";
	public description = "The ID";
	public args;
}
