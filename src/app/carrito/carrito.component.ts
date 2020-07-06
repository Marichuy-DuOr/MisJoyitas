import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { FirestoreService } from '../services/firestore.service';
import { User } from './../shared/models/user';
import { AuthService } from './../auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styles: []
})
export class CarritoComponent implements OnInit {

  descuento = 0;
  code = '';
  Codes = [];

  public productos = [];
  public array;
  public suma = 0;
  public elTotal = 0;
  public compraTerminada: boolean;
  public user$: Observable<User> = this.authSvc.afAuth.user;


  constructor(
    private authSvc: AuthService,
    private firestoreService: FirestoreService,
    public carritoService: CarritoService,
    ) {
    this.compraTerminada = false;
    this.array = this.carritoService.getCart();
    for (let item of this.array) {
      this.firestoreService.getProducto(item.idProd).subscribe((producto) => {
        const tot = Number(item.cantidad) * Number (producto.payload.data()['venta']);
        this.suma += tot;
        this.elTotal += tot;
        const data: DatosVenta = {
          idProducto: item.idProd,
          nombre: producto.payload.data()['nombre'],
          cantidad: item.cantidad,
          precio: producto.payload.data()['venta'],
          total: tot.toString(),
          imagen: producto.payload.data()['imagen']
        };
        this.productos.push(data);
      });
      console.log(this.productos);
    }
  }

  ngOnInit(): void {
  }

  pull(idProd: string) {
    const indice = this.carritoService.pullCart(idProd);
    this.suma -= Number(this.productos[indice].total);
    this.elTotal -= Number(this.productos[indice].total);
    this.productos.splice(indice, 1 );
  }

  venta() {
    if (this.productos != null) {
      this.user$.subscribe(val => {
        let data = {
          cliente: val.email,
          fecha: Date(),
          total: this.elTotal.toString(),
          productos: this.productos
        };
        this.firestoreService.Venta(data).then((docRef) => {
          console.log('El id-> ', docRef.id);
        }, (error) => {
          console.error(error);
        });
        this.compraTerminada = true;
        this.carritoService.newCart();
      });
    }
  }

  Canjeo() {
    this.code = document.getElementById('code').value;
    console.log (this.code);
    this.firestoreService.getCupones().subscribe((cuponesSnapshot) => {
      this.Codes = [];
      cuponesSnapshot.forEach((cuponData: any) => {
        this.Codes.push({
          id: cuponData.payload.doc.id,
          data: cuponData.payload.doc.data(),
        });
      });
      console.log (this.Codes);
      this.Codes.forEach( (codigo: any) => {
        console.log (this.code, ' === ', codigo.data.Codigo, '?');
        if (this.code === codigo.data.Codigo) {
          this.descuento = this.elTotal * codigo.data.Descuento;
          this.elTotal -= this.descuento;
        }
      });
    });
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
