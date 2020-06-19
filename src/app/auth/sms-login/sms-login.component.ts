import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { WindowService } from './../services/window.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sms-login',
  templateUrl: './sms-login.component.html',
  styles: []
})

@Injectable()

export class SmsLoginComponent implements OnInit {

  windowRef: any;

  smsForm = new FormGroup({
    cell: new FormControl(''),

  });

  codeForm = new FormGroup({
    code: new FormControl('')
  });

  user: any;

  constructor(private authSvc: AuthService, private router: Router, private win: WindowService) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode() {
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
  }

  verifyLoginCode() {
    const { code } = this.codeForm.value;
    console.log(code);
    this.windowRef.confirmationResult.confirm(code).then(result => {
      this.user = result.user;
      console.log(this.user);
      this.authSvc.createUserData(result.user);
    })
      .catch(error => console.log(error, 'Codigo incorrecto'));
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
