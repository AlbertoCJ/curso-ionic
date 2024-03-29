import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
  }

  async mostrarModal() {
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {
        nombre: 'Alberto',
        pais: 'España'
      }
    });
    modal.present();

    /* Ocurre tras cerrar completamente el modal */
    // const { data } = await modal.onDidDismiss();

    /* Ocurre mientras se cierra el modal */
    const { data } = await modal.onWillDismiss();

    console.log( data );
  }


}
