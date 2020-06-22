import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styles: []
})
export class SendEmailComponent implements OnDestroy {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) { }

  onSendEmail() {
    this.authSvc.sendVerificationEmail();
  }

  ngOnDestroy() {
    // Descomenta para evitar que un usuario pueda usar la aplicación sin haber comprobado si correo
    // this.authSvc.logout();
  }
}
