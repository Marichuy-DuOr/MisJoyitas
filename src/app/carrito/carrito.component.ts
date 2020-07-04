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

  public productos = [];
  public array;
  public elTotal = 0;
  public compraTerminada: boolean;
  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(
    private authSvc: AuthService,
    private firestoreService: FirestoreService,
    public carritoService: CarritoService
    ) {
    this.compraTerminada = false;
    this.array = this.carritoService.getCart();
    for (let item of this.array) {
      this.firestoreService.getProducto(item.idProd).subscribe((producto) => {
        const tot = Number(item.cantidad) * Number (producto.payload.data()['venta']);
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
    }
  }

  ngOnInit(): void {
  }

  pull(idProd: string) {
    const indice = this.carritoService.pullCart(idProd);
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
}

interface DatosVenta {
  nombre: string;
  idProducto: string;
  cantidad: string;
  precio: string;
  total: string;
  imagen: string;
}
