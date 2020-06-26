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
    let seleccionado: string;
    this.svg = null;
    const val = Math.random() * (4 - 0) + 0;
    if (val === 0) {
      seleccionado = 'rZpekjqqoq';
    } else if (val === 1) {
      seleccionado = 'yqnTMaIMnE';
    } else if (val === 2) {
      seleccionado = 'BVHzEaHDvZ';
    } else if (val === 3) {
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

}
