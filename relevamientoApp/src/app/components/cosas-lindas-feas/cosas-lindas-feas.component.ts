import { Component,Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authService/auth.service';
import { FirestoreService } from 'src/app/services/firestoreService/firestore.service';
import { ImagenesService } from 'src/app/services/imagenesService/imagenes.service';

@Component({
  selector: 'app-cosas-lindas-feas',
  templateUrl: './cosas-lindas-feas.component.html',
  styleUrls: ['./cosas-lindas-feas.component.scss'],
})
export class CosasLindasFeasComponent implements OnInit {
  @Input() opcion : number;
  otraClase : boolean = false;
  cosasLindas : any = [];
  cosasFeas: any = [];
  constructor(private firestore : FirestoreService, public authService : AuthService, private imageStore : ImagenesService, private ts : ToastController) { }

  ngOnInit() {
    this.firestore.traerCosasLindas().subscribe(value =>{
      this.cosasLindas = value;
      this.cosasLindas.sort(this.ordenarLista); 
    });

    this.firestore.traerCosasFeas().subscribe(value =>{
      this.cosasFeas = value;
      this.cosasFeas.sort(this.ordenarLista); 
    });
  }

  ordenarLista(foto1 : any,foto2 : any)
  {
    let foto1Array : string[];
    let foto2Array : string[];
    let fecha1 : any;
    let fecha2 : any;
    let hora1 : any;
    let hora2 : any;

    let fechaNumeros1 : number[] = [];
    let fechaNumeros2 : number[] = [];
    let horaNumeros1 : number[] = [];
    let horaNumeros2 : number[] = [];
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

    if(fecha1[0] > fecha2[0] && fecha1[1] == fecha2[1] && fecha1[2] == fecha2[2])
    {
      return -1;
    }
    else
    {
      if(fecha1[1] > fecha2[1] && fecha1[2] == fecha2[2])
      {
        return -1;
      }
      else
      {
        if(fecha1[2] > fecha2[2])
        {
          return -1;
        }
        else
        {
          if(fecha1[0] == fecha2[0] && fecha1[1] == fecha2[1] && fecha1[2] == fecha2[2])
          {
            if(hora1[0] > hora2[0])
            {
              return -1;
            }
            else
            {
              if(hora1[0] == hora2[0] && hora1[1] > hora2[1])
              {
                return -1;
              }
              else
              {
                if(hora1[0] < hora2[0])
                {
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

  cambiarLike(foto : any,i : any)
  {
    if(this.opcion == 1)
    {
      this.modificarFoto('cosasLindas',foto,i);
    }
    else
    {
      if(this.opcion == 2)
      {
        this.modificarFoto('cosasFeas',foto,i);
      }
    }
  }

  modificarFoto(coleccion : string,foto : any, i : any)
  {
    let element = document.getElementById(i);

    let elementStyle = window.getComputedStyle(element);
    let elementColor = elementStyle.getPropertyValue('color');
    
    if(elementColor == "rgb(209, 37, 37)")
    {
      foto.likes = foto.likes.filter((like : string) => like != this.authService.actualEmail);   
    }
    else
    {
      foto.likes.push(this.authService.actualEmail);
    }

    this.firestore.modificarFoto(foto,foto.id,coleccion);
  } 

}
