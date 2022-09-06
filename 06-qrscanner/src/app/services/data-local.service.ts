import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Registro } from '../models/registro.model';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService implements OnInit {

  guardados: Registro[] = [];

  constructor(private storage: Storage,
              private navController: NavController,
              private iab: InAppBrowser,
              private file: File,
              private emailComposer: EmailComposer) {}

  async ngOnInit() {
    await this.storage.create();
    await this.cargarStorage();
  }

   async cargarStorage() {
    this.guardados = await this.storage.get('registros') || [];
   }

  async guardarRegistro( format: string, text: string ) {

    await this.storage.create();
    await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift( nuevoRegistro );

    await this.storage.set('registros', this.guardados);

    this.abrirRegistro(nuevoRegistro);
  }


  abrirRegistro( registro: Registro ) {

    this.navController.navigateForward('/tabs/tab2');
    
    switch ( registro.type ) {
      case 'http':
        this.iab.create(registro.text, '_system');
        break;
      case 'geo':
        this.navController.navigateForward(`/tabs/tab2/mapa/${ registro.text }`);
        break;
    }

  }

  enviarCorreo() {

    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';

    arrTemp.push(titulos);

    this.guardados.forEach( r => {

      const linea = `${ r.type },${ r.format },${ r.created },${ r.text.replace(',', ' ') }\n`;
      arrTemp.push(linea);

    });

    this.crearArchivoFisico( arrTemp.join('') );

  }

  crearArchivoFisico( text: string ) {
    this.file.checkFile( this.file.dataDirectory, 'registros.csv' )
      .then( existe => {
        console.log('Existe archivo?', existe);
        return this.escribirEnArchivo( text );
      })
      .catch( err => {
        return this.file.createFile( this.file.dataDirectory, 'registros.csv', false )
          .then( creado => this.escribirEnArchivo( text ) )
          .catch( err2 => console.log('No se pudo crear el archivo', err2) );
      });
  }

  async escribirEnArchivo( text: string ) {
    await this.file.writeExistingFile( this.file.dataDirectory, 'registros.csv', text );

    const archivo = `${this.file.dataDirectory}'registros.csv'`;
    
    let email = {
      to: '',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        archivo
      ],
      subject: 'Backup de scans',
      body: 'Aquí tienen sus backups de los scans - <strong>ScanApp</strong>',
      isHtml: true
    };

    this.emailComposer.open(email);

  }

}
