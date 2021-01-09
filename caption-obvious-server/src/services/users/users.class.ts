import { Params } from "@feathersjs/feathers";
import { RealTimeConnection } from "@feathersjs/transport-commons/lib/channels/channel/base";
import { Service, NedbServiceOptions } from "feathers-nedb";
import { Application } from "../../declarations";

export class Users extends Service {
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	constructor(options: Partial<NedbServiceOptions>, app: Application) {
		super(options);
	}

	// not necessary if just doing the default?
	create (data: Partial<UserData>, params: Params): Promise<any> {
		data.connection = params.connection;
		console.log("Creating new user: ", data.nickname);
		// Call the original `create` method with existing `params` and new data
		return super.create(data, params);
	}

}

export interface UserData {
	nickname: string,
	connection: RealTimeConnection
}