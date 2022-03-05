import { ItemController } from "../controllers";

export class ControllerContext {
	static instance: ControllerContext;

	private itemController: ItemController;

	static getInstance(): ControllerContext {
		if (!ControllerContext.instance) {
			ControllerContext.instance = new ControllerContext();
		}
		return ControllerContext.instance;
	}

	public get ItemController(): ItemController {
		return this.itemController;
	}

	public setItemController(itemController: ItemController): ControllerContext {
		this.itemController = itemController;
		// log.debug("setItemController");
		return this;
	}
}
