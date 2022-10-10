import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.scss'],
})
export class ColoresComponent implements OnInit {
  @Output() datoEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}
  reproducirSonido(color : string)
  {
    this.datoEvent.emit(color);
  }
}
