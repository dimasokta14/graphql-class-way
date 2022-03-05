export interface InterfaceModel<Attributes, RawAttributes> {
	toJson(): Attributes;
	toDatabaseObject(): RawAttributes;
}
