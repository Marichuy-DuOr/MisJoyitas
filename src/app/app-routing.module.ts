import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { WikiComponent } from './wiki/wiki.component';
import { JoyaComponent } from './joya/joya.component';
import { JoyasComponent } from './joyas/joyas.component';
import { BuscadorComponent } from './buscador/buscador.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent}, 
  {path: 'about', component: AboutComponent},
  {path: 'joyas/:id', component: JoyasComponent},
  {path: 'joya/:id', component: JoyaComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'buscador', component: BuscadorComponent},
  {path: 'wiki', component: WikiComponent},
  {path: '', pathMatch: 'full', redirectTo:'home'}, 
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
