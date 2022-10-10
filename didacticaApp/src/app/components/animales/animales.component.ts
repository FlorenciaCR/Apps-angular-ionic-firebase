import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.scss'],
})
export class AnimalesComponent implements OnInit {
  @Output() datoEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}
  
  reproducirSonido(animal : string)
  {
    this.datoEvent.emit(animal);
  }
}
