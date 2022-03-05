import { InterfaceModel } from "./InterfaceModel";
import { models } from "../interfaces/item";

export class ItemModel
	implements InterfaceModel<models.item.Attributes, models.item.RawAttributes>
{
	private id?: string;
	private asset_id?: string;
	private parent_id?: string;
	private location_id?: string;
	private area_id?: string;
	private item_status_id?: string;
	private vendor_id?: string;
	private data?: models.item.Data;
	private date_purchases?: Date;
	private date_installation?: Date;
	private updatedAt?: Date;
	private createdAt?: Date;

	constructor(
		attributes?: models.item.Attributes | models.item.RawAttributes,
		isRaw: boolean = true
	) {
		if (attributes) {
			if (isRaw) {
				this.mapDatabaseObject(attributes);
			} else {
				this.mapJson(attributes);
			}
		}
	}

	public get Id(): string {
		return this.id;
	}

	public get Data(): models.item.Data {
		return this.data;
	}

	public setId(id: string): ItemModel {
		this.id = id;
		return this;
	}

	public setData(data: models.item.Data) {
		this.data = data;
		return this;
	}

	public mapJson(attributes: models.item.Attributes): ItemModel {
		if (attributes !== undefined) {
			this.setId(attributes.id);
			this.setData(attributes.data);
		}
		return this;
	}

	public mapDatabaseObject(attributes: models.item.RawAttributes): ItemModel {
		if (attributes !== undefined) {
			this.setId(attributes.id || "");
			this.setData(attributes.data || {});
		}
		return this;
	}

	public validate(): boolean {
		return !!this.data;
	}

	public toJson(): Item {
		return new Item(this);
	}

	public toDatabaseObject(): RawItem {
		return new RawItem(this);
	}

	public merge(model: ItemModel): ItemModel {
		this.setId(model.Id || this.Id);
		this.setData(model.Data || this.Data);
		return this;
	}
}

export class Item implements models.item.Attributes {
	public id: string;
	public asset_id?: string;
	public parent_id?: string;
	public location_id?: string;
	public area_id?: string;
	public item_status_id?: string;
	public vendor_id?: string;
	public data: models.item.Data;
	public date_purchases?: Date;
	public date_installation?: Date;
	public updatedAt?: Date;
	public createdAt?: Date;

	constructor(builder: ItemModel) {
		this.id = builder.Id;
		this.data = builder.Data;
		// this.id = builder.Id;
		// this.firstName = builder.FirstName;
		// this.lastName = builder.LastName;
		// this.updatedAt = builder.UpdatedAt;
		// this.createdAt = builder.CreatedAt;
	}
}

export class RawItem implements models.item.RawAttributes {
	public id: string;
	public asset_id?: string;
	public parent_id?: string;
	public location_id?: string;
	public area_id?: string;
	public item_status_id?: string;
	public vendor_id?: string;
	public data: models.item.Data;
	public date_purchases?: Date;
	public date_installation?: Date;
	public updatedAt?: Date;
	public createdAt?: Date;

	constructor(builder: ItemModel) {
		this.id = builder.Id;
		this.data = builder.Data;
		// this.id = builder.Id;
		// this.firstName = builder.FirstName;
		// this.lastName = builder.LastName;
		// this.updatedAt = builder.UpdatedAt;
		// this.createdAt = builder.CreatedAt;
	}
}
