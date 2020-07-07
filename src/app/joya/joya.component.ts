import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { CarritoService } from '../services/carrito.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-joya',
  templateUrl: './joya.component.html',
  styles: []
})
export class JoyaComponent implements OnInit {

  joya: any;
  @Input() idDoc: any;

  cantidadForm = new FormGroup({
    cantidad: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(2)])
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestoreService: FirestoreService,
    public carritoService: CarritoService,
    private configAlert: NgbAlertConfig
    ) {
    configAlert.dismissible = true;
    this.activatedRoute.params.subscribe( params => {
      this.idDoc = params['id'];
    });
  }

  ngOnInit(): void {
    this.firestoreService.getProducto(this.idDoc).subscribe((producto) => {
      this.joya = producto.payload.data();
      console.log(this.joya.imagen);
    });
  }

  push(id: string) {
    if (this.cantidadForm.valid) {

      this.firestoreService.consultas('existencias', 'idProducto', id).subscribe((existenciaSnapshot) => {
        existenciaSnapshot.forEach((existenciaData: any) => {
          const { cantidad } = this.cantidadForm.value;
          if (Number(existenciaData.payload.doc.data()['cantidad']) >= cantidad) {
            document.getElementById('dos').style.display = 'block';
            setTimeout(() => document.getElementById('dos').style.display = 'none', 1000);
            this.carritoService.pushCart(id, cantidad);
          } else {
            document.getElementById('tres').style.display = 'block';
            setTimeout(() => document.getElementById('tres').style.display = 'none', 1000);
          }
        });
      });

    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}
