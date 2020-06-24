import { Component, OnInit } from '@angular/core';
import { User } from './../shared/models/user';
import { AuthService } from './../auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: []
})
export class ToolbarComponent implements OnInit {

  
  synthesis: any;
  utterance: any;
  prhase: any;
  
  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router: Router) {
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
      this.utterance = new SpeechSynthesisUtterance('Que pedo');
    } else {
      console.log('Explorador no soporta speechSynthesis.');
    }
  }

  ngOnInit(): void {
  }
  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

  speak() {
    this.prhase = '';
    for (let i = 0; i < document.getElementsByClassName('accesibilidad').length; i++) {
      this.prhase = this.prhase.concat(document.getElementsByClassName('accesibilidad')[i].innerHTML);
      this.prhase = this.prhase.concat(', ');
    }
    this.utterance.text = this.prhase;
    if (this.synthesis.paused) {
      this.synthesis.resume();
    } else {
      this.synthesis.cancel();
      this.synthesis.speak(this.utterance);
    }
  }

  pause() {
    this.synthesis.pause();
  }
}
