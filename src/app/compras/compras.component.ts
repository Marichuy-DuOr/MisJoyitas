import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../services/firestore.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: []
})
export class ComprasComponent implements OnInit {

  public productos = [];
  public compras = [];

  public documentId = null;
  public currentStatus = 1;
  public bandera = 0;

  public newCompraForm = new FormGroup({
    idProducto: new FormControl('', Validators.required),
    cantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    id: new FormControl('')
  });

  constructor(private firestoreService: FirestoreService, private configAlert: NgbAlertConfig) { 
    configAlert.dismissible = true;
    this.newCompraForm.setValue({
      id: '',
      idProducto: '',
      cantidad: ''
    });
  }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    this.firestoreService.getProductos().subscribe((productosSnapshot) => {
      this.productos = [];
      productosSnapshot.forEach((productoData: any) => {
        this.productos.push({
          id: productoData.payload.doc.id,
          data: productoData.payload.doc.data()
        });
      });
    });

    this.firestoreService.getCompras().subscribe((comprasSnapshot) => {
      this.compras = [];
      comprasSnapshot.forEach((compraData: any) => {
        this.compras.push({
          id: compraData.payload.doc.id,
          data: compraData.payload.doc.data()
        });
      });
    });

  }

  public newCompra(form, documentId = this.documentId) {
    if (this.newCompraForm.valid) {

      console.log(`Status: ${this.currentStatus}`);
      if (this.currentStatus == 1) {
        this.bandera = 0;
        let data = {
          cantidad: form.cantidad,
          idProducto: form.idProducto
        }

        this.firestoreService.Compra(data).then(() => {
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
          this.newCompraForm.setValue({
            id: '',
            cantidad: '',
            idProducto: ''
          });
        }, (error) => {
          console.error(error);
        });
      } else {
        this.bandera = 1;
        let data = {
          cantidad: form.cantidad,
          idProducto: form.idProducto
        }
        this.firestoreService.updateCompra(documentId, data).then(() => {
          this.currentStatus = 1;
          this.newCompraForm.setValue({
            id: '',
            cantidad: '',
            idProducto: ''
          });
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
        }, (error) => {
          console.log(error);
        });
      }
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
      this.bandera = 2;
    }

    if(this.bandera == 0){
      let b = 1;
      let imagen;
      let nombre;
      for(let p of this.productos){
        if(p.id == form.idProducto){
           imagen = p.data.imagen; 
           nombre = p.data.nombre;
        }
      }

      for(let c of this.compras){
        if(c.data.idProducto == form.idProducto){
          b = 0;
          let cantidad = Number(c.data.cantidad) + Number(form.cantidad);
          let data = {
            cantidad: cantidad, 
            idProducto: form.idProducto, 
            imagen: imagen, 
            nombre: nombre
          }
          this.firestoreService.updateExistencia(form.idProducto, data); 
        }
      }

      if(b == 1){
        let existencia = {
          cantidad: form.cantidad, 
          idProducto: form.idProducto, 
          imagen: imagen, 
          nombre: nombre
        }
        this.firestoreService.updateExistencia(form.idProducto, existencia); 
      }
    }
  }

  public editCompra(documentId) {
    let editSubscribe = this.firestoreService.getCompra(documentId).subscribe((compra) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newCompraForm.setValue({
        id: documentId,
        idProducto: compra.payload.data()['idProducto'],
        cantidad: compra.payload.data()['cantidad']
      });
      editSubscribe.unsubscribe();
    });
  }

  public deleteCompra(documentId) {
    this.firestoreService.deleteCompra(documentId).then(() => {
      document.getElementById('tres').style.display = 'block';
      setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
    }, (error) => {
      console.error(error);
    });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}


