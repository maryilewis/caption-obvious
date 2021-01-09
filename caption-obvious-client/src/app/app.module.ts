import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LobbyComponent } from "./lobby/lobby.component";
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from "@angular/forms";
import { DataService } from "./services/data.service";
import { Feathers } from "./services/feathers.service";

@NgModule({
	declarations: [AppComponent, LobbyComponent, LoginPageComponent],
	imports: [BrowserModule, AppRoutingModule, FormsModule],
	providers: [DataService, Feathers],
	bootstrap: [AppComponent],
})
export class AppModule {}
