import express from "express";
import { graphqlHTTP } from "express-graphql";
// import cors from "cors";
import dotEnv from "./config";
import { RootSchema } from "./src/schemas";
import { RootValue } from "./src/utils/RootValue";

dotEnv();

const app = express();
app.use(express.json());

// app.use("/graphql", (req: express.Request, res: express.Response) => {
// 	graphqlHTTP({
// 		schema: RootSchema,
// 		rootValue: new RootValue(),
// 	})(req, res);
// });

app.use(
	"/graphql",
	graphqlHTTP({
		schema: RootSchema,
		graphiql: true,
	})
);

app.listen(process.env.GRAPHQL_PORT, () => {
	console.log(
		`Server is running at http://localhost:${process.env.GRAPHQL_PORT} ${process.env.GRAPHQL_PATH}`
	);
});
