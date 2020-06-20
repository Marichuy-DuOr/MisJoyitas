import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { WindowService } from './../services/window.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sms-login',
  templateUrl: './sms-login.component.html',
  styles: []
})

@Injectable()

export class SmsLoginComponent implements OnInit {

  windowRef: any;

  smsForm = new FormGroup({
    cell: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)])
  });

  codeForm = new FormGroup({
    code: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$')])
  });

  user: any;

  constructor(private authSvc: AuthService, private router: Router, private win: WindowService, private configAlert: NgbAlertConfig) {
    configAlert.type = 'danger';
    configAlert.dismissible = true;
   }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
  }

  sendLoginCode() {
    
    if (this.smsForm.valid) {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const { cell } = this.smsForm.value;
    console.log('Cell->', cell);

    let lada = '+52';

    lada = lada.concat(cell.toString());
    console.log('Lada->', lada);

    firebase.auth().signInWithPhoneNumber(lada, appVerifier)
      .then(result => {

        this.windowRef.confirmationResult = result;

      })
      .catch(error => console.log(error));
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }
  }

  verifyLoginCode() {
    if (this.codeForm.valid) {
      const { code } = this.codeForm.value;
      console.log(code);
      this.windowRef.confirmationResult.confirm(code).then(result => {
        this.user = result.user;
        console.log(this.user);
        this.authSvc.createUserData(result.user);
      })
        .catch(error => console.log(error, 'Codigo incorrecto'));

    } else {
      document.getElementById('dos').style.display = 'block';
      setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
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
