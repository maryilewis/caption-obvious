import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { WebSocketService } from "../websocket/websocket.service";

@Component({
	selector: "app-lobby",
	templateUrl: "./lobby.component.html",
	styleUrls: ["./lobby.component.scss"],
})
export class LobbyComponent implements OnInit, OnDestroy {
	constructor(private ws: WebSocketService) {}
	get players(): string[] {
		return this._players;
	}
	destroyed$ = new Subject();
	private _players: string[] = [];
	ngOnInit(): void {
		this.ws.players$.subscribe(players => {
			this._players = players;
		});
	}
	ngOnDestroy() {
		this.destroyed$.next();
	}
}
