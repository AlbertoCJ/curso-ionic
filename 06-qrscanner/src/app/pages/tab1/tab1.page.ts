import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(private barcodeScanner: BarcodeScanner,
              private dataLocalService: DataLocalService) {}


  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter');
  // }

  // ionViewDidLeave() {
  //   console.log('ionViewDidLeave');
  // }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad');
  // }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter');
    this.scan();
  }

  // ionViewWillLeave() {
  //   console.log('ionViewWillLeave');
  // }

  // ionViewWillUnload() {
  //   console.log('ionViewWillUnload');
  // }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      if ( !barcodeData.cancelled ) {
        this.dataLocalService.guardarRegistro(barcodeData.format, barcodeData.text);
      }

     }).catch(err => {
         console.log('Error', err);

         /*
           Mock para desarrollo, ya que se necesita un dispositivo para probar correctamente
         */
        //  this.dataLocalService.guardarRegistro('QRCode', 'https://ionicframework.com/docs/native/barcode-scanner');
         this.dataLocalService.guardarRegistro('QRCode', 'geo:40.73151796986687,-74.06087294062502');

     });
  }

}
