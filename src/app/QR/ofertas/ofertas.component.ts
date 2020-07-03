import { EmailService } from './../../services/email.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styles: []
})
export class OfertasComponent implements OnInit {

  public cupon = [];

  svg: SafeHtml;

  public joya: any;
  public idDoc: any;

  constructor( private firestoreService: FirestoreService, private email: EmailService, private sanitizer: DomSanitizer) {
    this.generarQR();
  }
/*
  constructor(private email: EmailService, private sanitizer: DomSanitizer) {
    this.generarQR();
  }*/

  ngOnInit(): void {
  }

  generarQR() {
    this.email.getCupon('http://localhost:3000/cupones').subscribe( (Cupones) => {
      console.log(Cupones);
      let seleccionado: string;
      this.svg = null;
      //          Math.floor(Math.random() * (max - min + 1) + min);
      const val = Math.floor(Math.random() * (4 - 0 + 1) + 0);
      console.log (val);
      for (let i = 0; i < 17; i++){
        if (val === i) {
          seleccionado = Cupones[i].Codigo + " " + Cupones[i].Texto;
        }
      }
      console.log(seleccionado);
      this.email.getQR('https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=svg&data=' + seleccionado)
      .subscribe((res: any) => {
        this.svg = this.sanitizer.bypassSecurityTrustHtml(res);
      });
    });
  }

/*
  generarQR() {
    let seleccionado: string;
    this.svg = null;
    const val = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    console.log (val);
    if (val === 1) {
      seleccionado = 'rZpekjqqoq';
    } else if (val === 2) {
      seleccionado = 'yqnTMaIMnE';
    } else if (val === 3) {
      seleccionado = 'BVHzEaHDvZ';
    } else if (val === 4) {
      seleccionado = 'oljgsqxJCb';
    } else {
      seleccionado = 'qPDVcsKCaz';
    }
    this.consultaTipo(seleccionado);
  }

  consultaTipo(elId: string) {
    this.firestoreService.consultaCupon(elId).subscribe((cuponSnapshot) => {
      cuponSnapshot.forEach((cuponData: any) => {
        this.cupon.push({
          id: cuponData.payload.doc.id,
          data: cuponData.payload.doc.data(),
        });
        const elCupon = 'Código: ' + cuponData.payload.doc.data().Codigo + ' ' + cuponData.payload.doc.data().Texto;
        this.email.getQR('https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=svg&data=' + elCupon)
        .subscribe((res: any) => {
          this.svg = this.sanitizer.bypassSecurityTrustHtml(res);
        });
      });
    });
  }
*/

}
