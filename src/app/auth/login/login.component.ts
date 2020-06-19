import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor( private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login( email, password);
      if ( user && user.emailVerified) {
        this.router.navigate(['/home']);
      } else if ( user ) {
        this.router.navigate(['/verification-email']);
      } else {
        this.router.navigate(['/register']);
      }
    } catch (error) {
      console.log(error);
    }

  }

  async onGoogleLogin() {
    try {
      const user = await this.authSvc.googleLogin();
    } catch (error) {
      console.log(error);
    }
    this.router.navigate(['/home']);
  }

}
