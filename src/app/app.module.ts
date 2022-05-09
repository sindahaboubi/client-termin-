import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ListeServicesComponent } from './Components/liste-services/liste-services.component';
import {HttpClientModule} from "@angular/common/http";

import { ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './Components/index/index.component';
import { ErrorComponent } from './Components/error/error.component';

import { CommanderComponent } from './Components/commander/commander.component';
import { ServiceComponent } from './Components/service/service.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RechercherComponent } from './Components/rechercher/rechercher.component';
import { CardServiceComponent } from './Components/card-service/card-service.component';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { ModifierServiceComponent } from './Components/modifier-service/modifier-service.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ClientComponent } from './Components/client/client.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListeServicesComponent,

    IndexComponent,
    ErrorComponent,

    CommanderComponent,
    ServiceComponent,
    RechercherComponent,
    ClientComponent,
    AuthentificationComponent,
    ModifierServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
