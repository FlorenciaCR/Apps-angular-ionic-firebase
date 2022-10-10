import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.component.html',
  styleUrls: ['./numeros.component.scss'],
})
export class NumerosComponent implements OnInit {
  @Output() datoEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}

  reproducirSonido(numero : string)
  {
    this.datoEvent.emit(numero);
  }
}
