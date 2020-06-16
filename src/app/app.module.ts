import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContactoComponent } from './contacto/contacto.component';
import { WikiComponent } from './wiki/wiki.component';
import { JoyasComponent } from './joyas/joyas.component';
import { JoyaComponent } from './joya/joya.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { FooterComponent } from './footer/footer.component';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
