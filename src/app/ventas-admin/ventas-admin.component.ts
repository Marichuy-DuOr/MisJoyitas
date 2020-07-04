import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ventas-admin',
  templateUrl: './ventas-admin.component.html',
  styles: []
})
export class VentasAdminComponent implements OnInit {

  public ventas = [];

  public documentId = null;
  public currentStatus = 1;

  closeResult = '';

  public ventaAux;

  constructor( private firestoreService: FirestoreService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.firestoreService.getVentas().subscribe((ventasSnapshot) => {
      this.ventas = [];
      ventasSnapshot.forEach((ventaData: any) => {
        this.ventas.push({
          id: ventaData.payload.doc.id,
          data: ventaData.payload.doc.data()
        });
        console.log(ventaData.payload.doc.data());
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
