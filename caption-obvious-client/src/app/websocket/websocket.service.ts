import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { map, filter, switchMap, retryWhen, delay, tap } from "rxjs/operators";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Injectable({
	providedIn: "root",
})
export class WebSocketService {
	

	constructor() {
		// disseminate the different kinds of messages to the appropriate components
		// TODO actual multiplexing https://rxjs-dev.firebaseapp.com/api/webSocket/webSocket
		this.connect().subscribe(messages => {
			if (messages.hasOwnProperty("players")) {
				this._players.next(messages.players);
			}
		});
	}

	get players$(): Observable<string []> {
		return this._players.asObservable();
	}


	private _players = new Subject<string[]>();

	connection$: WebSocketSubject<any>;
	RETRY_SECONDS = 10;
	connect(): Observable<any> {
		return of("http://localhost:1337").pipe(
			tap(msg => console.log("MARY in tap", msg)),
			filter((apiUrl) => !!apiUrl),
			// https becomes wws, http becomes ws
			map((apiUrl: string) => apiUrl.replace(/^http/, "ws") + "/stream"),
			switchMap((wsUrl) => {
				if (this.connection$) {
					return this.connection$;
				} else {
					this.connection$ = webSocket(wsUrl);
					return this.connection$;
				}
			}),
			retryWhen((errors) => errors.pipe(delay(this.RETRY_SECONDS)))
		);
	}

	send(data: any) {
		if (this.connection$) {
			this.connection$.next(data);
		} else {
			console.error("Did not send data, open a connection first");
		}
	}

	closeConnection() {
		if (this.connection$) {
			this.connection$.complete();
			this.connection$ = null;
		}
	}
	ngOnDestroy() {
		this.closeConnection();
	}
}
