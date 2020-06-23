import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  public updateProducto(documentId: string, data: any) {
    return this.firestore.collection('productos').doc(documentId).set(data);
  }

  public deleteProducto(documentId: string) {
    return this.firestore.collection('productos').doc(documentId).delete();
  }
}
