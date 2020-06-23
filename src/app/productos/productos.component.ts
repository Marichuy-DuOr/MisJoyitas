import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../services/firestore.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  public productos = [];

  public documentId = null;
  public currentStatus = 1;

  public newProductoForm = new FormGroup({
    compra: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    material: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    venta: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    id: new FormControl('')
  });

  constructor(
    private firestoreService: FirestoreService, private configAlert: NgbAlertConfig) {
    configAlert.dismissible = true;
    this.newProductoForm.setValue({
      id: '',
      compra: '',
      descripcion: '',
      imagen: '',
      material: '',
      nombre: '',
      tipo: '',
      venta: ''
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
  }

  public newProducto(form, documentId = this.documentId) {
    if (this.newProductoForm.valid) {

      console.log(`Status: ${this.currentStatus}`);
      if (this.currentStatus == 1) {
        let data = {
          compra: form.compra,
          descripcion: form.descripcion,
          imagen: form.imagen,
          material: form.material,
          nombre: form.nombre,
          tipo: form.tipo,
          venta: form.venta
        }
        this.firestoreService.createProducto(data).then(() => {
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
          this.newProductoForm.setValue({
            compra: '',
            descripcion: '',
            imagen: '',
            material: '',
            nombre: '',
            tipo: '',
            venta: '',
            id: ''
          });
        }, (error) => {
          console.error(error);
        });
      } else {
        let data = {
          compra: form.compra,
          descripcion: form.descripcion,
          imagen: form.imagen,
          material: form.material,
          nombre: form.nombre,
          tipo: form.tipo,
          venta: form.venta
        }
        this.firestoreService.updateProducto(documentId, data).then(() => {
          this.currentStatus = 1;
          this.newProductoForm.setValue({
            compra: '',
            descripcion: '',
            imagen: '',
            material: '',
            nombre: '',
            tipo: '',
            venta: '',
            id: '',
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
    }
  }

  public editProducto(documentId) {
    let editSubscribe = this.firestoreService.getProducto(documentId).subscribe((producto) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newProductoForm.setValue({
        id: documentId,
        compra: producto.payload.data()['compra'],
        descripcion: producto.payload.data()['descripcion'],
        imagen: producto.payload.data()['imagen'],
        material: producto.payload.data()['material'],
        nombre: producto.payload.data()['nombre'],
        tipo: producto.payload.data()['tipo'],
        venta: producto.payload.data()['venta']

      });
      editSubscribe.unsubscribe();
    });
  }

  public deleteProducto(documentId) {
    this.firestoreService.deleteProducto(documentId).then(() => {
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
