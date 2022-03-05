import * as express from "express";
import { graphqlHTTP } from "express-graphql";

// import { Environment, DB } from '../core';
import { Exception } from "../handler";
import { Schema } from "../schemas";
import { Context, DataLoadersContext, ControllerContext } from "../context";
import { ItemController } from "../controllers";
import { ItemServices } from "../services";

export class GraphQLRoutes {
	static map(app: express.Application): void {
		GraphQLRoutes.buildContext();

		// Add GraphQL to express route
		app.use("/graphql", (req: express.Request, res: express.Response) => {
			// Creates a GraphQLHTTP per request
			graphqlHTTP({
				schema: Schema.get(),
				rootValue: "Hello World",
				context: new Context(
					req,
					res,
					DataLoadersContext.getInstance(),
					ControllerContext.getInstance()
				),
				graphiql: true,
				customFormatErrorFn: (exception) => ({
					name: Exception.getName(exception.message),
					message: Exception.getMessage(exception.message),
					path: exception.path,
				}),
			})(req, res);
		});
	}

	private static buildContext(): void {
		ControllerContext.getInstance().setItemController(
			new ItemController(new ItemServices())
		);

		DataLoadersContext.getInstance().setItemDataLoader(
			ControllerContext.getInstance().ItemController
		);
	}
}
