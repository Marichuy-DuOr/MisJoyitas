import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';

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

  constructor( private firestoreService: AuthService ) {
    this.newUserForm.setValue({
      id: '',
      email: '',
      role: '',
      phoneNumber: ''
    });
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
    console.log(this.users);
  }

  public newUser(form, documentId = this.documentId) {
    console.log('sisemete');
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
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
        console.log('Documento editado exitósamente');
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

}
