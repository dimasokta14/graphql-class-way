import { GraphQLObjectType, GraphQLString } from "graphql";
import { TimestampType } from "./TimestampType";
import { VendorType } from "./VendorType";

const ItemDataType = new GraphQLObjectType({
	name: "ItemData",
	description: "Item Data",
	fields: () => ({
		rfid: {
			type: GraphQLString,
		},
		qrcode: {
			type: GraphQLString,
		},
		barcode: {
			type: GraphQLString,
		},
		serial_number: {
			type: GraphQLString,
		},
	}),
});

const ItemType = new GraphQLObjectType({
	name: "Item",
	description: "All Item on The Database",
	fields: () => ({
		id: {
			type: GraphQLString,
		},
		data: {
			type: ItemDataType,
		},
		vendor: {
			type: VendorType,
		},
		created_at: { type: TimestampType },
		updated_at: { type: TimestampType },
	}),
});

export { ItemType };
