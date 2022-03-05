import { ItemServices } from "../services/ItemServices";
import { ItemModel } from "../models/ItemModel";
import { NotFoundException } from "../handler";

export class ItemController {
	constructor(private itemService: ItemServices) {}

	public async getAllItem(): Promise<ItemModel[]> {
		console.log("Get All Item");
		const result = await this.itemService.getItems();
		return result.map((res) => new ItemModel(res));
	}

	public async getItemById(id: string): Promise<ItemModel[]> {
		console.log("Get Item By Id");
		const result = await this.itemService.getItemById(id);
		return result.map((res) => new ItemModel(res));
	}
}
