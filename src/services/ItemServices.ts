import { anyObjectType } from "../interfaces/general_interface";
import db from "../connections/db/postgre";

const getItems = async (): Promise<anyObjectType> => {
	try {
		const query = `
			SELECT 
				item.*,
				location.data AS location,
				area.data AS area,
				item_status.data AS item_status,
				JSON_BUILD_OBJECT('data', vendor.data, 'vendor_pic_data', vendor.pic_data) AS vendor
			FROM item
			LEFT JOIN public.location location ON location.id = item.location_id
			LEFT JOIN public.area area ON area.id = item.area_id
			LEFT JOIN item_status ON item_status.id = item.item_status_id
			LEFT JOIN vendor ON vendor.id = item.vendor_id
		`;
		const { rows } = await db.query(query, []);
		return rows;
	} catch (error) {
		throw new Error(error);
	}
};

const getItemById = async (item_id: string): Promise<anyObjectType> => {
	console.log("asd", item_id);

	try {
		const query = `
		SELECT 
			item.*,
			location.data AS location,
			area.data AS area,
			item_status.data AS item_status,
			JSON_BUILD_OBJECT('data', vendor.data, 'vendor_pic_data', vendor.pic_data) AS vendor
		FROM item
		LEFT JOIN public.location location ON location.id = item.location_id
		LEFT JOIN public.area area ON area.id = item.area_id
		LEFT JOIN item_status ON item_status.id = item.item_status_id
		LEFT JOIN vendor ON vendor.id = item.vendor_id 
		WHERE item.id = ANY($1)
		`;
		const { rows } = await db.query(query, [item_id]);
		return rows;
	} catch (error) {
		throw new Error(error);
	}
};

export { getItems, getItemById };
