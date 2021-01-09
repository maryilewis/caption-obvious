import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { DataService } from "../services/data.service";

@Component({
	selector: "app-lobby",
	templateUrl: "./lobby.component.html",
	styleUrls: ["./lobby.component.scss"],
})
export class LobbyComponent implements OnInit {
	messages$: Observable<any[]>;
	users$: Observable<any[]>;

	constructor(private data: DataService) {}

	ngOnInit() {
		// get users from data service
		this.users$ = this.data.users$().pipe(
			// our data is paginated, so map to .data
			map((users: any) => users.data.map(data => data.nickname))
		);
	}
}
