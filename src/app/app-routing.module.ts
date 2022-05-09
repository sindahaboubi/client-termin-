import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RechercherComponent } from './Components/rechercher/rechercher.component';
import { ServiceComponent } from './Components/service/service.component';
import { ErrorComponent } from './Components/error/error.component';
import { IndexComponent } from './Components/index/index.component';
import { ListeServicesComponent } from './Components/liste-services/liste-services.component';
import { CommanderComponent } from './Components/commander/commander.component';
import { ClientComponent } from './Components/client/client.component';
const routes: Routes = [
  {path:'index', component:IndexComponent},
  {path:'liste', component:ListeServicesComponent},
  {path:'service',component:ServiceComponent},
  {path:'search',component:RechercherComponent},
  {path:'liste/:id', component:ServiceComponent},
  {path:'clients/:id', component:ClientComponent},
  {path:'commander', component:CommanderComponent},
  {path:'', redirectTo:'', pathMatch:'full'},
  {path:'**', component:ErrorComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
