import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';
import { FirestoreService } from 'src/app/services/firestoreService/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  @Input() perfil : number;
  cosasLindas : any = [];
  cosasFeas: any = [];
  misFotos : any = [];
  constructor(private firestore : FirestoreService, private authService : AuthService) 
  { 

  }

  ngOnInit() {
    this.firestore.traerCosasLindas().subscribe(value =>{
      this.cosasLindas = value;
      this.firestore.traerCosasFeas().subscribe(value =>{
        this.cosasFeas = value;
        this.cargarMisFotos();
        
      });
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
    foto1Array = foto1.datos.hora.split(' ');
    foto2Array = foto2.datos.hora.split(' ');
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

  cargarMisFotos()
  {
    for(let item of this.cosasLindas)
    {
      if(item.email == this.authService.actualEmail)
      {
        let itemLindo = {
          datos: item,
          tipo: 'linda',
        }
        this.misFotos.push(itemLindo);
      }
    }

    for(let item of this.cosasFeas)
    {
      if(item.email == this.authService.actualEmail)
      {
        let itemFeo = {
          datos: item,
          tipo: 'fea',
        }
        this.misFotos.push(itemFeo);
      }
    }
    this.misFotos.sort(this.ordenarLista);
  }

}
