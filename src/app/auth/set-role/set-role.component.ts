import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-set-role',
  templateUrl: './set-role.component.html',
  styles: []
})
export class SetRoleComponent implements OnInit {

  public users = [];

  public documentId = null;
  public currentStatus = 1;
  public newUserForm = new FormGroup({
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  constructor( private firestoreService: AuthService, private configAlert: NgbAlertConfig ) {
    this.newUserForm.setValue({
      id: '',
      email: '',
      role: '',
      phoneNumber: ''
    });
    configAlert.type = 'danger';
    configAlert.dismissible = true;
  }

  ngOnInit(): void {
    this.firestoreService.getUsers().subscribe((usersSnapshot) => {
      this.users = [];
      usersSnapshot.forEach((userData: any) => {
        this.users.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
      });
    });
    // console.log(this.users);

    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
  }

  public newUser(form, documentId = this.documentId) {
    console.log('sisemete');
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);

    } else {
      const data = {
        email: form.email,
        role: form.role,
        phoneNumber: form.phoneNumber
      };
      this.firestoreService.updateUser(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newUserForm.setValue({
          email: '',
          role: '',
          phoneNumber: '',
          id: ''
        });
        // console.log('Documento editado exitósamente');
        document.getElementById('dos').style.display = 'block';
        setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
      }, (error) => {
        console.log(error);
      });
    }
  }

  public editUser(documentId) {
    const editSubscribe = this.firestoreService.getUser(documentId).subscribe((user) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newUserForm.setValue({
        id: documentId,
        email: user.payload.data()['email'],
        phoneNumber: user.payload.data()['phoneNumber'],
        role: user.payload.data()['role']
      });
      editSubscribe.unsubscribe();
    });
  }
  
  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
