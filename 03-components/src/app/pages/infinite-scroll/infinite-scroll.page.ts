import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.page.html',
  styleUrls: ['./infinite-scroll.page.scss'],
})
export class InfiniteScrollPage implements OnInit {

  data: any = new Array(20);

  @ViewChild( IonInfiniteScroll ) infinityScroll: IonInfiniteScroll;

  constructor() { }

  ngOnInit() {
  }

  loadData() {

    setTimeout(() => {

      const moreData = new Array(20);
      this.data.push( ...moreData );

      this.infinityScroll.complete();

      if ( this.data.length > 50 ) {
        this.infinityScroll.disabled = true;
      }

    }, 1500);

  }

}
