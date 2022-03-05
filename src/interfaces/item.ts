export namespace models {
	export namespace item {
		export interface Data {
			rfid?: string;
			price?: {
				value?: string;
				currency?: string;
			};
			qr_code?: string;
			barcode?: string;
			serial_number?: string;
		}
		export interface Attributes {
			id: string;
			asset_id?: string;
			parent_id?: string;
			location_id?: string;
			area_id?: string;
			item_status_id?: string;
			vendor_id?: string;
			data: Data;
			date_purchases?: Date;
			date_installation?: Date;
			updatedAt?: Date;
			createdAt?: Date;
		}

		export interface RawAttributes {
			id: string;
			asset_id?: string;
			parent_id?: string;
			location_id?: string;
			area_id?: string;
			item_status_id?: string;
			vendor_id?: string;
			data: Data;
			date_purchases?: Date;
			date_installation?: Date;
			updatedAt?: Date;
			createdAt?: Date;
		}
	}
}
