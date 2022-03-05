import { dbErrorHandler } from "../../handler/errorHandler";
import { Pool, QueryResult } from "pg";

import * as general_interface from "../../interfaces/general_interface";

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;

const pool = new Pool({
	host: PGHOST,
	user: PGUSER,
	database: PGDATABASE,
	password: PGPASSWORD,
	port: Number(PGPORT),
});

type paramType = Array<
	| string
	| string[]
	| boolean
	| null
	| number
	| number[]
	| general_interface.unknownObjectType
	| any
>;
type queryResultType = QueryResult<general_interface.unknownObjectType>;

pool.on("connect", (client) => {
	client.query("SET SEARCH_PATH TO ams");
});

const query = async (
	text: string,
	params: paramType
): Promise<queryResultType> => {		
	return await pool
		.query(text, params)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			dbErrorHandler(err);
			throw new Error(err);
		});
};

const client = async (
	text: string,
	params: paramType
): Promise<queryResultType> => {
	return await pool.connect().then(async (client) => {
		return await client
			.query(text, params)
			.then((res) => {
				client.release();
				return res;
			})
			.catch((err) => {
				client.release();
				dbErrorHandler(err.stack);
				throw new Error(err.stack);
			});
	});
};

// query in map [{query, params}]
const transaction = async (
	allQueries: general_interface.unknownObjectType[]
): Promise<boolean | queryResultType> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		allQueries.map(async (queries: general_interface.anyObjectType) => {
			try {
				await client.query(queries.query, queries.params || []);
			} catch (e: any) {
				dbErrorHandler(e);
				// throw new Error(e); //
			}
		});
		await client.query("COMMIT");
		return true;
	} catch (e: any) {
		await client.query("ROLLBACK");
		dbErrorHandler(e);
		throw new Error(e);
	} finally {
		client.release();
	}
};

pool.on("error", (err, client) => {
	console.error("Unexpected error on idle client", client, err);
	process.exit(-1);
});

export default {
	query,
	client,
	transaction,
};
