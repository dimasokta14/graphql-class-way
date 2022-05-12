import { GraphQLScalarType } from "graphql";

export const TimestampType = new GraphQLScalarType({
	name: "Timestamp",
	description: "A date and time, represented as an ISO-8601 string",
	serialize: (value: any) => value.toISOString(),
	parseValue: (value: any) => new Date(value),
	parseLiteral: (ast: any) => new Date(ast.value),
});
