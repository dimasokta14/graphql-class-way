import express from "express";
import { buildSchema } from "graphql";
import helmet from "helmet";
import cors from "cors";
import dotEnv from "./config";
import { DefaultRoutes, GraphQLRoutes } from "./src/routes";

dotEnv();
const app = express();

app.use(helmet());
app.use(helmet.noSniff());
app.use(
	helmet.hsts({
		maxAge: 31536000,
		includeSubDomains: true,
	})
);
app.use(cors());
DefaultRoutes.map(app);
GraphQLRoutes.map(app);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
