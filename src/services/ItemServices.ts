import { anyObjectType } from "../interfaces/general_interface";
import db from "../connections/db/postgre";

export class ItemServices {
	public async getItems(): Promise<anyObjectType> {
		try {
			const query = `
        SELECT * FROM item
      `;
			const { rows } = await db.query(query, []);
			return rows;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async getItemById(item_id: string): Promise<anyObjectType> {
		try {
			const query = `
        SELECT * FROM item WHERE item.id = $1
      `;
			const { rows } = await db.query(query, [item_id]);
			return rows;
		} catch (error) {
			throw new Error(error);
		}
	}
}
