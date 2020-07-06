import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { FirestoreService } from './../services/firestore.service';

@Component({
  selector: 'app-productos-graf',
  templateUrl: './productos-graf.component.html',
  styles: []
})
export class ProductosGrafComponent implements OnInit {

  ctx: any;
  ctx2: any;
  ctx3: any;

  public productos = [];
  public productosVendidos = [];
  public ventas = [];
  public oro = 0;
  public plata = 0;

  public Anillos = 0;
  public Colgantes = 0;
  public Pulseras = 0;
  public Collares = 0;
  public Broches = 0;
  public Cadenas = 0;
  public Pendientes = 0;
  public AnillosCompromiso = 0;
  public Alianzas = 0;
  public Gemelos = 0;
  public CollaresHombre = 0;
  public CadenasHombre = 0;
  public PendientesHombre = 0;
  public EsclavasHombre = 0;
  public AnillosHombre = 0;
  public AnillosNino = 0;
  public PulserasNno = 0;
  public ColgantesNino = 0;
  public PendientesNino = 0;

  constructor(private firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
    this.consultas();
    this.productos.forEach(element => console.log(element));
    console.log('gg');
  }

  consultas() {
    this.firestoreService.getProductos().subscribe((productosSnapshot) => {
      this.productos = [];
      productosSnapshot.forEach((productoData: any) => {
        this.productos.push({
          id: productoData.payload.doc.id,
          data: productoData.payload.doc.data(),
        });
        this.productosVendidos.push({
          id: productoData.payload.doc.id,
          cantidad: 0,
          total: 0,
        });
        this.contarMaterial(productoData.payload.doc.data().material);
        this.contarTipo(productoData.payload.doc.data().tipo);
      });
      this.crearPie();
      this.crearBarras();
    });

    this.firestoreService.getVentas().subscribe( ( ventasSnapshot ) => {
      ventasSnapshot.forEach( ( ventasData: any ) => {
        this.ventas.push({
          id: ventasData.payload.doc.id,
          data: ventasData.payload.doc.data()
        });
        this.CalculoVentas(ventasData.payload.doc.data().productos);
      });
      console.log (this.ventas);
      this.crearVentas();
    });
  }

  crearPie() {
    this.ctx = document.getElementById('pie');
    this.ctx.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [
          'Oro',
          'Plata'
        ],
        datasets: [{
          label: 'Material de las Joyas',
          data: [this.oro, this.plata],
          backgroundColor: [
            'rgba(212, 175, 55, 0.2)',
            'rgba(192, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(212, 175, 55, 1)',
            'rgba(192, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  crearVentas() {
    this.ctx3 = document.getElementById('sales');
    this.ctx3.getContext('2d');
    const myChart = new Chart(this.ctx3, {
      type: 'bar',
      data: {
        labels: [
          this.productos[0].data.nombre,
          this.productos[1].data.nombre,
          this.productos[2].data.nombre,
          this.productos[3].data.nombre,
          this.productos[4].data.nombre,
          this.productos[5].data.nombre,
          this.productos[6].data.nombre,
          this.productos[7].data.nombre,
          this.productos[8].data.nombre,
          this.productos[9].data.nombre,
        ],
        datasets: [{
          label: 'Productos',
          data: [
            this.productosVendidos[0].cantidad,
            this.productosVendidos[1].cantidad,
            this.productosVendidos[2].cantidad,
            this.productosVendidos[3].cantidad,
            this.productosVendidos[4].cantidad,
            this.productosVendidos[5].cantidad,
            this.productosVendidos[6].cantidad,
            this.productosVendidos[7].cantidad,
            this.productosVendidos[8].cantidad,
            this.productosVendidos[9].cantidad
          ],
          backgroundColor: [
            'rgba(255, 195, 18, 0.2)',
            'rgba(18, 203, 196, 0.2)',
            'rgba(237, 76, 103, 0.2)',
            'rgba(163, 203, 56, 0.2)',
            'rgba(217, 128, 250, 0.2)',
            'rgba(238, 90, 36, 0.2)',
            'rgba(6, 82, 221, 0.2)',
            'rgba(131, 52, 113, 0.2)',
            'rgba(234, 32, 39, 0.2)',
            'rgba(27, 20, 100, 0.2)',
          ],
          borderColor: [
            'rgba(255, 195, 18, 1)',
            'rgba(18, 203, 196, 1)',
            'rgba(237, 76, 103, 1)',
            'rgba(163, 203, 56, 1)',
            'rgba(217, 128, 250, 1)',
            'rgba(238, 90, 36, 1)',
            'rgba(6, 82, 221, 1)',
            'rgba(131, 52, 113, 1)',
            'rgba(234, 32, 39, 1)',
            'rgba(27, 20, 100, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  crearBarras() {
    this.ctx2 = document.getElementById('bar');
    this.ctx2.getContext('2d');
    const myChart = new Chart(this.ctx2, {
      type: 'bar',
      data: {
        labels: [
          'Anillos',
          'Colgantes',
          'Pulseras',
          'Collares',
          'Broches',
          'Cadenas',
          'Pendientes',
          'Anillos de compromiso',
          'Alianzas',
          'Gemelos',
          'Collares Hombre',
          'Cadenas Hombre',
          'Pendientes Hombre',
          'Esclavas Hombre',
          'Anillos Hombre',
          'Pendientes Niño',
          'Anillos Niño',
          'Colgantes Niño',
          'Pendientes Niño'
        ],
        datasets: [{
          label: 'Tipo de productos',
          data: [
            this.Anillos,
            this.Colgantes,
            this.Pulseras,
            this.Collares,
            this.Broches,
            this.Cadenas,
            this.Pendientes,
            this.AnillosCompromiso,
            this.Alianzas,
            this.Gemelos,
            this.CollaresHombre,
            this.CadenasHombre,
            this.PendientesHombre,
            this.EsclavasHombre,
            this.AnillosHombre,
            this.AnillosNino,
            this.PulserasNno,
            this.ColgantesNino,
            this.PendientesNino,
          ],
          backgroundColor: [
            'rgba(255, 195, 18, 0.2)',
            'rgba(18, 203, 196, 0.2)',
            'rgba(237, 76, 103, 0.2)',
            'rgba(163, 203, 56, 0.2)',
            'rgba(217, 128, 250, 0.2)',
            'rgba(238, 90, 36, 0.2)',
            'rgba(6, 82, 221, 0.2)',
            'rgba(131, 52, 113, 0.2)',
            'rgba(234, 32, 39, 0.2)',
            'rgba(27, 20, 100, 0.2)',
            'rgba(111, 30, 81, 0.2)',
            'rgba(196, 229, 56, 0.2)',
            'rgba(253, 167, 223, 0.2)',
            'rgba(247, 159, 31, 0.2)',
            'rgba(18, 137, 167, 0.2)',
            'rgba(181, 52, 113, 0.2)',
            'rgba(0, 148, 50, 0.2)',
            'rgba(153, 128, 250, 0.2)',
            'rgba(87, 88, 187, 0.2)'
          ],
          borderColor: [
            'rgba(255, 195, 18, 1)',
            'rgba(18, 203, 196, 1)',
            'rgba(237, 76, 103, 1)',
            'rgba(163, 203, 56, 1)',
            'rgba(217, 128, 250, 1)',
            'rgba(238, 90, 36, 1)',
            'rgba(6, 82, 221, 1)',
            'rgba(131, 52, 113, 1)',
            'rgba(234, 32, 39, 1)',
            'rgba(27, 20, 100, 1)',
            'rgba(111, 30, 81, 1)',
            'rgba(196, 229, 56, 1)',
            'rgba(253, 167, 223, 1)',
            'rgba(247, 159, 31, 1)',
            'rgba(18, 137, 167, 1)',
            'rgba(181, 52, 113, 1)',
            'rgba(0, 148, 50, 1)',
            'rgba(153, 128, 250, 1)',
            'rgba(87, 88, 187, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  contarMaterial(material: string) {
    if (material === 'oro') {
      this.oro++;
    } else {
      this.plata++;
    }
  }

  contarTipo(tipo: string) {
    switch (tipo) {
      case '2':
        this.Anillos++;
        break;
      case '3':
        this.Colgantes++;
        break;
      case '4':
        this.Pulseras++;
        break;
      case '5':
        this.Collares++;
        break;
      case '6':
        this.Broches++;
        break;
      case '7':
        this.Cadenas++;
        break;
      case '8':
        this.Pendientes++;
        break;
      case '9':
        this.AnillosCompromiso++;
        break;
      case '10':
        this.Alianzas++;
        break;
      case '12':
        this.Gemelos++;
        break;
      case '13':
        this.CollaresHombre++;
        break;
      case '14':
        this.CadenasHombre++;
        break;
      case '15':
        this.PendientesHombre++;
        break;
      case '16':
        this.EsclavasHombre++;
        break;
      case '17':
        this.AnillosHombre++;
        break;
      case '19':
        this.AnillosNino++;
        break;
      case '20':
        this.PulserasNno++;
        break;
      case '21':
        this.ColgantesNino++;
        break;
      case '22':
        this.PendientesNino++;
        break;
    }
  }

  CalculoVentas(listado) {
    console.log (listado);
    for (let i = 0; i < listado.length; i ++) {
      for (let j = 0; j < this.productosVendidos.length; j++) {
        if (listado[i].idProducto === this.productosVendidos[j].id) {
          this.productosVendidos[j].cantidad = this.productosVendidos[j].cantidad + parseInt(listado[i].cantidad, 10);
        }
      }
    }
  }

}
