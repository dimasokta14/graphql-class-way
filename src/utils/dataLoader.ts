import DataLoader from "dataloader";
import { anyObjectType } from "../interfaces/general_interface";

export const dataLoader = async (source, args): Promise<anyObjectType> => {
	console.log("s", source);

	const initBatch = new DataLoader((keys) => source(keys));
	const result = await initBatch.load(args);
	return result;
};
