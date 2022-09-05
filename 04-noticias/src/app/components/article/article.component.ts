import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform, ActionSheetController, ActionSheetButton } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  @Input() index: number;

  constructor( 
    private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
  ) { }

  ngOnInit() {}

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;
    }

    window.open( this.article.url, '_blank' );
    
  }

  async onOpenMenu() {

    const articleInFavorites = this.storageService.articleInFavorites(this.article);

    const normalBts: ActionSheetButton[] = [
      {
        text: articleInFavorites ? 'Remover favorito' : 'Favorito',
        icon: articleInFavorites ? 'heart' :  'heart-outline',
        handler: () => this.onToggleFavorite()
      },
      {
        text: 'Cancelar',
        icon: 'heart-outline',
        role: 'cancel'
      }
    ];

    const share: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    };

    if ( this.platform.is('capacitor') ) {
      normalBts.unshift(share);
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBts
    });

    await actionSheet.present();
  }


  onShareArticle() {

    const { title, source, url } = this.article;

    this.socialSharing.share(
      title,
      source.name,
      null,
      url
    );
  }


  onToggleFavorite() {
    this.storageService.saveRemoveArticle(this.article);
  }

}
