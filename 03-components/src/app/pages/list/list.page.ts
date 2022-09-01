import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  usuarios: Observable<any>;

  @ViewChild(IonList) ionList: IonList;

  constructor( private dataService: DataService ) { }

  ngOnInit() {

    this.usuarios = this.dataService.getUsuarios();
  }

  favorite(user: any) {
    console.log(user);
    this.closeItems();
  }

  share(user: any) {
    console.log(user);
    this.closeItems();
  }

  delete(user: any) {
    console.log(user);
    this.closeItems();
  }

  private closeItems() {
    this.ionList.closeSlidingItems();
  }

}
