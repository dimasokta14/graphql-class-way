export type anyObjectType = Record<string, any>;
export type unknownObjectType = Record<string, unknown>;

export type responseType = {
	is_show: false;
	type: "success" | "warning" | "error";
	message: "";
};

export type filterType = Record<string, Array<string | number>>;
export const filter_init: filterType = {};

export type serviceType = "rms" | "ams" | "hms";
export type statusDataType = {
	name: string;
};
