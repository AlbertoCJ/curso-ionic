import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  componentes: Observable<Componente[]>;


  constructor(
    private platform: Platform,
    private menuCtrl: MenuController,
    private dataService: DataService
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
  ) {}

  ngOnInit(): void {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.componentes = this.dataService.getMenuOpts();
    });
  }

}
