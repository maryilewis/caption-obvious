import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";

@Component({
	selector: "app-login-page",
	templateUrl: "./login-page.component.html",
	styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
	public username = "";
	public gamecode = "";

	constructor(private data: DataService) {}

	ngOnInit(): void {}

	joinGame() {
		this.data.joinGame(this.username, this.gamecode);
	}

	newGame() {
		this.data.newGame(this.username);
	}
}
