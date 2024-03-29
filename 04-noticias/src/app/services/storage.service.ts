import { Injectable } from '@angular/core';
import { Article } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

  get getLocalArticles(): Article[] {
    return [ ...this._localArticles ];
  }
  

  async saveRemoveArticle( article: Article ) {

    const exists = this._localArticles.find( localArticle => localArticle.title === article.title );

    if ( exists ) {
      this._localArticles = this._localArticles.filter( localArticle => localArticle.title === article.title );
    } else {
      this._localArticles = [article, ...this._localArticles];
    }

    this._storage.set('articles', this._localArticles);
  }

  async loadFavorites() {

    try {

      const articles = await this._storage.get('articles');
      this._localArticles = articles || [];

    } catch (error) {

    }

  }

  articleInFavorites( article: Article ): boolean {
    return !!this._localArticles.find( localArticle => localArticle.title === article.title );
  }

}
