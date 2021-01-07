import { Component, OnInit } from '@angular/core';
import { WebSocketService as WebSocketService } from '../websocket/websocket.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
	public username = "";
	public gamecode = "";

  constructor(private ws: WebSocketService ) { }

  ngOnInit(): void {
  }
  send() {
	  this.ws.send({name: this.username, code: this.gamecode});
  }

  newGame() {
	this.ws.send({name: this.username, new: true});
  }

}
