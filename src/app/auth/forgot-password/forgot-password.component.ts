import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from './../services/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: []
})
export class ForgotPasswordComponent implements OnInit {

  userEmail = new FormControl('');
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onReset() {
    try {
      const email = this. userEmail.value;
      this.authSvc.resetPassword(email);
      window.alert('Te mandamos el email, revisa tu inbox');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }


}
