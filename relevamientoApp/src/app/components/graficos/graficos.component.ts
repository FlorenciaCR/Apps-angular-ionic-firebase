import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'node_modules/chart.js'
import { FirestoreService } from 'src/app/services/firestoreService/firestore.service';
@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent implements OnInit {
  barChart: any;
  tortaChart: any;
  cosasLindas: any = [];
  cosasFeas: any = [];
  labelsFeos: any = [];
  labelsLindos: any = [];
  cantLikesFeos: any = [];
  cantLikesLindos: any = [];
  fotosFeas:any = [];
  fotosLindas:any = [];
  mostrarImagen = false;
  imagenParaMostrar:string = "";
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('torCanvas') private torCanvas: ElementRef;
  constructor(private firestore: FirestoreService) { }

  ngOnInit() {
    this.firestore.traerCosasLindas().subscribe(value => {
      this.cosasLindas = value;
      this.cosasLindas.sort(this.ordenarLista);
      this.cargarChartLindos();
    });
    this.firestore.traerCosasFeas().subscribe(value => {
      this.cosasFeas = value;
      this.cosasFeas.sort(this.ordenarLista);
      this.cargarChartFeos(); 
    });
  }

  graficoTortas() {
    this.tortaChart = new Chart(this.torCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labelsLindos,
        datasets: [{
          label: '# numero de Me gusta',
          data: this.cantLikesLindos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Cosas Lindas'
          }
        }
      },
    });
  }



  graficoBarras() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labelsFeos,
        datasets: [{
          label: '# numero de Me gusta',
          data: this.cantLikesFeos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
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

  ordenarLista(foto1: any, foto2: any) {
    let foto1Array: string[];
    let foto2Array: string[];
    let fecha1: any;
    let fecha2: any;
    let hora1: any;
    let hora2: any;

    let fechaNumeros1: number[] = [];
    let fechaNumeros2: number[] = [];
    let horaNumeros1: number[] = [];
    let horaNumeros2: number[] = [];
    foto1Array = foto1.hora.split(' ');
    foto2Array = foto2.hora.split(' ');

    fecha1 = foto1Array[0].split('/');
    fechaNumeros1.push(parseInt(fecha1[0]));
    fechaNumeros1.push(parseInt(fecha1[1]));
    fechaNumeros1.push(parseInt(fecha1[2]));
    fecha1 = fechaNumeros1;

    fecha2 = foto2Array[0].split('/');
    fechaNumeros2.push(parseInt(fecha2[0]));
    fechaNumeros2.push(parseInt(fecha2[1]));
    fechaNumeros2.push(parseInt(fecha2[2]));
    fecha2 = fechaNumeros2;

    hora1 = foto1Array[1].split(':');
    horaNumeros1.push(parseInt(hora1[0]));
    horaNumeros1.push(parseInt(hora1[1]));
    hora1 = horaNumeros1;

    hora2 = foto2Array[1].split(':');
    horaNumeros2.push(parseInt(hora2[0]));
    horaNumeros2.push(parseInt(hora2[1]));
    hora2 = horaNumeros2;

    if (fecha1[0] > fecha2[0] && fecha1[1] == fecha2[1] && fecha1[2] == fecha2[2]) {
      return -1;
    }
    else {
      if (fecha1[1] > fecha2[1] && fecha1[2] == fecha2[2]) {
        return -1;
      }
      else {
        if (fecha1[2] > fecha2[2]) {
          return -1;
        }
        else {
          if (fecha1[0] == fecha2[0] && fecha1[1] == fecha2[1] && fecha1[2] == fecha2[2]) {
            if (hora1[0] > hora2[0]) {
              return -1;
            }
            else {
              if (hora1[0] == hora2[0] && hora1[1] > hora2[1]) {
                return -1;
              }
              else {
                if (hora1[0] < hora2[0]) {
                  return 1;
                }
              }
            }
          }
        }
      }
    }

    return 0;

  }

  cargarChartFeos() {
    let tempLabels = [];
    let tempFechas = [];
    for (let i = 0; i < this.cosasFeas.length; i++) {
      tempLabels = this.cosasFeas[i].email.split('@');
      tempFechas = this.cosasFeas[i].hora.split('/');
      this.labelsFeos.push(tempLabels[0] + ' | ' + tempFechas[0] + '/' + tempFechas[1]);
      this.cantLikesFeos.push(this.cosasFeas[i].likes.length);
      this.fotosFeas.push(this.cosasFeas[i].pathFoto);
    }
    this.graficoBarras();
  }

  cargarChartLindos() {
    let tempLabels = [];
    let tempFechas = [];
    for (let i = 0; i < this.cosasLindas.length; i++) {
      tempLabels = this.cosasLindas[i].email.split('@');
      tempFechas = this.cosasLindas[i].hora.split('/');
      this.labelsLindos.push(tempLabels[0] + ' | ' + tempFechas[0] + '/' + tempFechas[1]);
      this.cantLikesLindos.push(this.cosasLindas[i].likes.length);
      this.fotosLindas.push(this.cosasLindas[i].pathFoto);
    }
    this.graficoTortas();
  }
}
