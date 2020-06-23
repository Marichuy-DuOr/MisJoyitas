import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContactoComponent } from './contacto/contacto.component';
import { WikiComponent } from './wiki/wiki.component';
import { JoyasComponent } from './joyas/joyas.component';
import { JoyaComponent } from './joya/joya.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { SetRoleComponent } from './auth/set-role/set-role.component';
import { SmsLoginComponent } from './auth/sms-login/sms-login.component';

import { CanGuard } from './auth/guards/can-guard';
import { CanAdminGuard } from './auth/guards/can-admin-guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminOptionsComponent } from './admin-options/admin-options.component';
import { ProductosComponent } from './productos/productos.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CarritoComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ToolbarComponent,
    ContactoComponent,
    WikiComponent,
    JoyasComponent,
    JoyaComponent,
    BuscadorComponent,
    FooterComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    SendEmailComponent,
    SetRoleComponent,
    SmsLoginComponent,
    AdminOptionsComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    AngularFireAuthModule,
    NgbModule
  ],
  providers: [
    CanGuard,
    CanAdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
