import DataLoader from "dataloader";

import { ItemController } from "../controllers";

export class DataLoadersContext {
	static instance: DataLoadersContext;

	private itemDataLoader: DataLoader<any, any>;

	static getInstance(): DataLoadersContext {
		if (!DataLoadersContext.instance) {
			DataLoadersContext.instance = new DataLoadersContext();
		}
		return DataLoadersContext.instance;
	}

	public get ItemDataLoader(): DataLoader<any, any> {
		return this.itemDataLoader;
	}
	public setItemDataLoader(itemController: ItemController): DataLoadersContext {
		const batchItems: any = async (id: string) => {
			const items = await itemController.getItemById(id);
			return items.map((data) => data.toJson());
		};
		const _itemLoader: any = new DataLoader(batchItems);
		console.log("set Item dataloader");
		return _itemLoader;
	}
}
