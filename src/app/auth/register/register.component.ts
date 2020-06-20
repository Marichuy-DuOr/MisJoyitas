import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordVerf: new FormControl('', Validators.required)
  });

  constructor(private authSvc: AuthService, private router: Router, private configAlert: NgbAlertConfig) {
    configAlert.dismissible = true;
   }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const { email, password, passwordVerf } = this.registerForm.value;

      if (password == passwordVerf) {
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
      } else {
        document.getElementById('dos').style.display = 'block';
        setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
      }
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
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

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
