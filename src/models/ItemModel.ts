import { anyObjectType } from "../interfaces/general_interface";
import { ItemService } from "../services";

const getItems = async (): Promise<anyObjectType> => {
	try {
		const result = await ItemService.getItems();
		return result;
	} catch (error) {
		throw new Error(error);
	}
};

const getItemById = async (item_id: string): Promise<anyObjectType> => {
	try {
		const result = await ItemService.getItemById(item_id);
		console.log("iet", result);
		return result;
	} catch (error) {
		throw new Error(error);
	}
};

export { getItems, getItemById };

// const  async getItemById(item_id: string): Promise<anyObjectType> {
// 	try {
// 		const result = await this.getItemById(item_id);
// 		return result;
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// }
