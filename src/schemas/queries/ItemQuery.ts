import DataLoader from "dataloader";
import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { ItemModel } from "../../models";
import { dataLoader } from "../../utils/dataLoader";
import { getItemByIdLoader } from "../loaders/ItemDataloader";
import { ItemType } from "../types";

const getAllItemQuery = {
	type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ItemType))),
	resolve: async () => {
		return await ItemModel.getItems();
	},
};

const getItemById = {
	type: ItemType,
	args: { item_id: { type: new GraphQLList(GraphQLID) } },
	resolve: async (_, args) => {
		const result = await getItemByIdLoader.load(args.item_id);
		return result;
	},
};

const getItemByIdWithoutLoader = {
	type: ItemType,
	args: { item_id: { type: GraphQLID } },
	resolve: async (_, args) => {
		const result = await ItemModel.getItemById(args.item_id);
		return result[0];
	},
};

export { getAllItemQuery, getItemById, getItemByIdWithoutLoader };
