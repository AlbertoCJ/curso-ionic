import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss'],
})
export class ButtonPage implements OnInit {

  estadoFavorito: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  get favorito(): string {
    return this.estadoFavorito ? 'heart' : 'heart-outline' ;
  }

  onClick() {
    this.estadoFavorito = !this.estadoFavorito;
  }

}
