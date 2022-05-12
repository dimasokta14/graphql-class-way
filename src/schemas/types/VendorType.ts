import {
	GraphQLBoolean,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { TimestampType } from "./TimestampType";

const VendorDataType = new GraphQLObjectType({
	name: "VendorData",
	description: "Vendor data type",
	fields: () => ({
		name: { type: GraphQLString },
		address: { type: GraphQLString },
		phone_number: { type: GraphQLString },
	}),
});

const VendorPICDataType = new GraphQLObjectType({
	name: "VendorPICData",
	description: "Vendor PIC data type",
	fields: () => ({
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		position: { type: GraphQLString },
		is_default: { type: GraphQLBoolean },
		phone_number: { type: GraphQLString },
	}),
});

const VendorType = new GraphQLObjectType({
	name: "Vendor",
	description: "Vendor type",
	fields: () => ({
		id: { type: GraphQLID },
		is_active: { type: GraphQLBoolean },
		company_id: { type: GraphQLID },
		data: { type: VendorDataType },
		vendor_pic_data: {
			type: new GraphQLList(new GraphQLNonNull(VendorPICDataType)),
		},
		default_vendor: {
			type: VendorPICDataType,
			resolve: (vendor, _) => {
				return vendor.vendor_pic_data;
			},
		},
		created_at: {
			type: TimestampType,
		},
		updated_at: { type: TimestampType },
	}),
});

export { VendorDataType, VendorPICDataType, VendorType };
