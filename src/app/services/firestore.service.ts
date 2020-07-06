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

  public consultas(tabla: string, atributo: string, nombre: string) {
    return this.firestore.collection(tabla, ref => ref.where(atributo, '==', nombre)).snapshotChanges();
  }

  public consultaCupon(cod: string) {
    return this.firestore.collection('Cupones', ref => ref.where('Codigo', '==', cod)).snapshotChanges();
  }


  public Venta(data: {
    cliente: string,
    fecha: string,
    total: string,
    productos: DatosVenta[]
  }) {
    return this.firestore.collection('ventas').add(data);
  }

  public getVentas() {
    return this.firestore.collection('ventas').snapshotChanges();
  }


  public getCupones() {
    return this.firestore.collection('Cupones').snapshotChanges();
  }
  public Compra(data: {
    cantidad: number,
    idProducto: string
  }) {
    return this.firestore.collection('compras').add(data);
  }

  public getCompra(documentId: string) {
    return this.firestore.collection('compras').doc(documentId).snapshotChanges();
  }

  public getCompras() {
    return this.firestore.collection('compras').snapshotChanges();
  }

  public updateCompra(documentId: string, data: any) {
    return this.firestore.collection('compras').doc(documentId).set(data);
  }

  public deleteCompra(documentId: string) {
    return this.firestore.collection('compras').doc(documentId).delete();
  }

  public Existencias(data: {
    id: string,
    cantidad: number,
    idProducto: string,
    imagen: string,
    nombre: string
  }) {
    return this.firestore.collection('existencias').add(data);
  }

  public getExistencias() {
    return this.firestore.collection('existencias').snapshotChanges();
  }

  public getExistencia(documentId: string) {
    return this.firestore.collection('existencias').doc(documentId).snapshotChanges();
  }

  public updateExistencia(documentId: string, data: any) {
    return this.firestore.collection('existencias').doc(documentId).set(data);

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
