import { GraphQLType, GraphQLSchema, GraphQLObjectType } from "graphql";

import { IsException } from "./Exception";

// Mark field/type/schema
export const Processed = Symbol();

export class GraphQLErrorHandling {
	public static watch(schema: GraphQLSchema): void {
		this.maskSchema(schema);
	}

	private static maskSchema(schema: GraphQLSchema): void {
		const types: any = schema.getTypeMap();
		for (const typeName in types) {
			if (!Object.hasOwnProperty.call(types, typeName)) {
				continue;
			}
			this.maskType(types[typeName]);
		}
	}

	private static maskType(type: GraphQLType): void {
		const objectType: GraphQLObjectType = <GraphQLObjectType>type;
		if (objectType[Processed] || !objectType.getFields) {
			return;
		}

		const fields: any = objectType.getFields();
		for (const fieldName in fields) {
			if (!Object.hasOwnProperty.call(fields, fieldName)) {
				continue;
			}
			this.maskField(fields[fieldName]);
		}
	}

	private static maskField(field: any): void {
		const resolveFn: any = field.resolve;
		if (field[Processed] || !resolveFn) {
			return;
		}

		field[Processed] = true;
		field.resolve = async (...args) => {
			try {
				const out = resolveFn.call(this, ...args);
				return await Promise.resolve(out);
			} catch (error) {
				throw this.handler(error);
			}
		};
	}

	private static handler(error: any): Error {
		if (error[IsException]) {
			return new Error(error.toString());
		}
		error.message = `${error.message}`;
		error.message = `InternalError:${error.message}`;
		return error;
	}
}
