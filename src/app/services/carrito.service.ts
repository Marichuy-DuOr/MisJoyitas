import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public cart = [];

  constructor() { }

  public getCart() {
    return this.cart;
  }

  public pushCart(idProducto: string, cant: string) {
    const data: DatosCart = {
      idProd: idProducto,
      cantidad: cant
    };
    this.cart.push(data);
  }

  public pullCart(idProducto: string) {
    let i = 0;
    for ( i ; i < this.cart.length; i++) {
      if (this.cart[i].idProd == idProducto) {
        this.cart.splice( i , 1 );
        break;
      }
    }
    return i;
  }

  public newCart() {
    this.cart = [];
  }
}

interface DatosCart {
  idProd: string;
  cantidad: string;
}

