import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore ) { }

  public createProducto(data: {
    compra: string,
    descripcion: string,
    imagen: string,
    material: string,
    nombre: string,
    tipo: string,
    venta: string
  }) {
    return this.firestore.collection('productos').add(data);
  }

  public getProducto(documentId: string) {
    return this.firestore.collection('productos').doc(documentId).snapshotChanges();
  }

  public getProductos() {
    return this.firestore.collection('productos').snapshotChanges();
  }

  async getProductos2() {
    return this.firestore.collection('productos').snapshotChanges();
  }

  public updateProducto(documentId: string, data: any) {
    return this.firestore.collection('productos').doc(documentId).set(data);
  }

  public deleteProducto(documentId: string) {
    return this.firestore.collection('productos').doc(documentId).delete();
  }

  public consultaTipo(tipoJoya: string) {
    return this.firestore.collection('productos', ref => ref.where('tipo', '==', tipoJoya)).snapshotChanges();
  }

  public consultaCupon(cod: string) {
    return this.firestore.collection('Cupones', ref => ref.where('Codigo', '==', cod)).snapshotChanges();
  }

}
