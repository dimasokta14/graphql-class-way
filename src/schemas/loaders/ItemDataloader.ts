import DataLoader from "dataloader";
import { ItemModel } from "../../models";

const batchItemLoader = async (item_id: string): Promise<any> => {
	const result = await ItemModel.getItemById(item_id);
	return result.map((data) => data[item_id]);
};

const getItemByIdLoader = new DataLoader((args: any) => batchItemLoader(args));

export { getItemByIdLoader };
