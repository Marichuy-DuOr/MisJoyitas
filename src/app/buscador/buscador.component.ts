import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit {

  joyas: any [] = [];
  bandera: boolean;
  nomjoya: string;

  constructor( private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService ) {

    this.activatedRoute.params.subscribe( params => {
      this.nomjoya = params['nomjoya'];
      this.joyas = [];
      this.bandera = false;
      this.buscarart();
    });

  }

  buscarart() {
    this.firestoreService.consultas('productos', 'nombre', this.nomjoya).subscribe((productosSnapshot) => {
      productosSnapshot.forEach((productoData: any) => {
        this.joyas.push({
          id: productoData.payload.doc.id,
          data: productoData.payload.doc.data(),
        });
        this.bandera = true;
      });
    });
  }

  ngOnInit(): void {
  }

}
