import { Injectable } from "@angular/core";
import { Feathers } from "./feathers.service";

/**
 *  Abstraction layer for data management
 *  Technically this isn't needed for feathers-chat,
 *  but you will need it for more complex tasks.
 */
@Injectable()
export class DataService {
	constructor(private feathers: Feathers) {
		(<any>this.feathers.service("users")).on('created', msg => console.log("User was created", msg))

	}

	users$() {
		// just returning the observable will query the backend on every subscription
		// using some caching mechanism would be wise in more complex applications
		return (<any>this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
			.service("users"))
			.watch()
			.find();
	}

	createUser(nickname: string) {
		this.feathers.service("users").create({
			nickname,
		});
	}

	// todo
	joinGame(nickname: string, gamecode: string) {
		this.createUser(nickname);
	}

	// todo
	newGame(nickname: string) {
		this.createUser(nickname);
	}
}
