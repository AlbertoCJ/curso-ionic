import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Article, NewsResponse } from '../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticlesByCategoryAndPage } from '../interfaces';

const urlDomain = environment.urlDomain;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {}


  constructor( private http: HttpClient) { }


  getTopHeadLines(): Observable<Article[]> {
    return this.http.get<NewsResponse>(`${ urlDomain }/top-headlines`, {
      params: {
        apiKey,
        country: 'us',
        category: 'business'
      }
    }).pipe(
      map( ({ articles }) => articles )
    );
  }

  getTopHeadlinesByCategory( category: string, loadMore: boolean = false): Observable<Article[]> {

    if ( loadMore ) {
      return this.getArticlesByCategory( category );  
    }

    if ( this.articlesByCategoryAndPage[category] ) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    console.log('Petition HTTP');

    return this.getArticlesByCategory( category );
  }

  private getArticlesByCategory( category: string ): Observable<Article[]> {

    if ( Object.keys( this.articlesByCategoryAndPage ).includes(category) ) {
      // Ya existe
      // this.articlesByCategoryAndPage[category].page += 0;
    } else {
      // No existe
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      };
    }


    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.http.get<NewsResponse>(`${ urlDomain }/top-headlines`, {
      params: {
        apiKey,
        page,
        category
      }
    }).pipe(
      map( ({ articles }) => {
        
        if ( articles.length === 0 ) return this.articlesByCategoryAndPage[category].articles;

        this.articlesByCategoryAndPage[category] = {
          page,
          articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles ]
        }

        return this.articlesByCategoryAndPage[category].articles;

      })
    );

  }


}
