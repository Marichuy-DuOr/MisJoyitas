import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { WikiComponent } from './wiki/wiki.component';
import { JoyaComponent } from './joya/joya.component';
import { JoyasComponent } from './joyas/joyas.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { SetRoleComponent } from './auth/set-role/set-role.component';
import { SmsLoginComponent } from './auth/sms-login/sms-login.component';
import { AdminOptionsComponent } from './admin-options/admin-options.component';

import { CanGuard } from './auth/guards/can-guard';
import { CanAdminGuard } from './auth/guards/can-admin-guard';

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
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verification-email', component: SendEmailComponent},
  {path: 'sms-login', component: SmsLoginComponent},
  {path: 'set-role', component: SetRoleComponent, canActivate: [CanAdminGuard]},
  {path: 'admin-options', component: AdminOptionsComponent, canActivate: [CanAdminGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }