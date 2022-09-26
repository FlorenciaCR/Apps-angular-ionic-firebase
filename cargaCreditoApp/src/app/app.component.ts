import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
  timeLeft: number = 3;
  interval:any;
  cargarTerminada:boolean = false;

  ngOnInit():void{
    this.startTimer();
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else if(this.timeLeft == 0) {
        this.cargarTerminada = true;
      }
    },1000)
  }
}
