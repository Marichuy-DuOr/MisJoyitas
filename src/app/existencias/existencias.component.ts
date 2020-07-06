import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../services/firestore.service';

@Component({
  selector: 'app-existencias',
  templateUrl: './existencias.component.html',
  styles: []
})
export class ExistenciasComponent implements OnInit {

  public existencias = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getExistencias().subscribe((existenciasSnapshot) => {
      this.existencias = [];
      existenciasSnapshot.forEach((existenciaData: any) => {
        this.existencias.push({
          id: existenciaData.payload.doc.id,
          data: existenciaData.payload.doc.data()
        });
      });
    });
  }

}
