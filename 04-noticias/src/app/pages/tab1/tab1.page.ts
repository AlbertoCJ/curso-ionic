import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles: Article[] = [];

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getTopHeadLines()
      .subscribe(articles => this.articles.push( ...articles ) );
    
      // this.newsService.getTopHeadlinesByCategory('business')
      // .subscribe( articles => {
      //   this.articles = [ ...articles ];
      // });
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory('business', true)
      .subscribe( articles => {

        console.log(articles, this.articles);

        if ( articles.length === this.articles.length ) {
          this.infiniteScroll.disabled = true;
          console.log('infinity disabled');
          return;
        }

        this.articles = articles;
        this.infiniteScroll.complete();
        console.log('infinity completed');
      });

  }

}
