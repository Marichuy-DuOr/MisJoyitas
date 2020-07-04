import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../shared/models/user';
import { AuthService } from './../auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styles: []
})
export class MisComprasComponent implements OnInit {
  public ventas = [];
  public documentId = null;
  public currentStatus = 1;
  public ventaAux;

  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor( private firestoreService: FirestoreService, private modalService: NgbModal, private authSvc: AuthService ) { }

  ngOnInit(): void {

    this.user$.subscribe(val => {
      this.firestoreService.consultas('ventas', 'cliente', val.email).subscribe((ventasSnapshot) => {
        this.ventas = [];
        ventasSnapshot.forEach((ventaData: any) => {
          this.ventas.push({
            id: ventaData.payload.doc.id,
            data: ventaData.payload.doc.data()
          });
          console.log(ventaData.payload.doc.data());
        });
      });
    });
  }

  open(content, datos) {
    // console.log(datos);
    this.ventaAux = datos;

    this.modalService.open(content, { size: 'xl' });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

interface DatosVenta {
  nombre: string;
  idProducto: string;
  cantidad: string;
  precio: string;
  total: string;
  imagen: string;
}

