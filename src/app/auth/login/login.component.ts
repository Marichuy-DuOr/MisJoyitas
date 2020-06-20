import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor( private authSvc: AuthService, private router: Router, private configAlert: NgbAlertConfig) {
    configAlert.type = 'danger';
    configAlert.dismissible = true;
  }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
  }

  async onLogin() {
    if (this.loginForm.valid) {
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
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
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

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
