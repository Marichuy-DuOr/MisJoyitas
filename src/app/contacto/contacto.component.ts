import { EmailService } from './../services/email.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styles: []
})
export class ContactoComponent implements OnInit {

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    comment: new FormControl('', Validators.required)
  });

  constructor(private email: EmailService, private configAlert: NgbAlertConfig) {
    configAlert.type = 'danger';
    configAlert.dismissible = true;
  }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
  }

  send() {
    if (this.contactForm.valid) {
      const { name, email, comment } = this.contactForm.value;
      const user = {name, email, comment};
      this.email.send( 'http://localhost:3000/send', user).subscribe(data => {
        let res: any = data;
        console.log(`${user.name} a mandado feedback`);

      });
      console.log('Send email');

  } else {
    document.getElementById('uno').style.display = 'block';
    setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
  }
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
