import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: []
})
export class ForgotPasswordComponent implements OnInit {

  userEmail = new FormControl('', [Validators.required, Validators.email]);
  constructor(private authSvc: AuthService, private router: Router, private configAlert: NgbAlertConfig) {
    configAlert.dismissible = true;
  }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
  }

  async onReset() {
    if (this.userEmail.valid) {
      try {
        const email = this.userEmail.value;
        this.authSvc.resetPassword(email);
        document.getElementById('dos').style.display = 'block';
        setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
        // this.router.navigate(['/login']);
      } catch (error) {
        console.log(error);
      }
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}
