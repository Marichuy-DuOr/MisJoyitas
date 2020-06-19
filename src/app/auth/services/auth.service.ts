import { Injectable } from '@angular/core';
import { RoleValidator } from './../helpers/roleValidator';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RoleValidator {

  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super();
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.createUserData(user);
      this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return await (await this.afAuth.currentUser).sendEmailVerification();
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async googleLogin(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      this.createUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  public createUserData(user: User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      role: 'CLIENT'
    };
    return userRef.set(data, { merge: true });

  }

  public getUser(documentId: string) {
    return this.afs.collection('users').doc(documentId).snapshotChanges();
  }
  /*
    async existe(documentId: string): Promise<boolean> {
    // public existe(documentId: string) {
      let band: any;
      const docRef = this.afs.collection('users').doc(documentId);
      docRef.get().subscribe(function(doc) {
          if (doc.exists) {
            band = true;
          } else {
            band = false;
          }
      });
      return band;
    }*/

  public getUsers() {
    return this.afs.collection('users').snapshotChanges();
  }

  public updateUser(documentId: string, data: any) {
    return this.afs.collection('users').doc(documentId).set(data);
  }

}
