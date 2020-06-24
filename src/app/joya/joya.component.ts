import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-joya',
  templateUrl: './joya.component.html',
  styles: []
})
export class JoyaComponent implements OnInit {

  public joya: any;
  public idDoc: any;

  constructor(private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService) {
    this.activatedRoute.params.subscribe( params => {
      this.idDoc = params['id'];
      const editSubscribe = this.firestoreService.getProducto(params['id']).subscribe((producto) => {
        this.joya = producto.payload.data();
        console.log(this.joya.imagen);
        // editSubscribe.unsubscribe();
      });
    });
  }

  ngOnInit(): void {
  }

}
