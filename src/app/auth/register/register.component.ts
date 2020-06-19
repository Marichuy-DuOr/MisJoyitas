import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordVerf: new FormControl('')
  });

  constructor(private authSvc: AuthService, private router: Router) { }

  async onRegister() {
    const { email, password, passwordVerf } = this.registerForm.value;

    try {
      const user = await this.authSvc.register( email, password);
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
      this.authSvc.googleLogin();
    } catch (error) {
      console.log(error);
    }
    this.router.navigate(['/home']);
  }

}
