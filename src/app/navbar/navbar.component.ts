import { Component, OnInit } from '@angular/core';
import { User } from './../shared/models/user';
import { AuthService } from './../auth/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor( private authSvc: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  buscarJoya(nomjoya: string) {
    this.router.navigate(['/buscador', nomjoya]);
  }

}
