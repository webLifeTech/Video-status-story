import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CommanService } from '../service/comman.service';

@Component({
  selector: 'app-smcategory',
  templateUrl: './smcategory.page.html',
  styleUrls: ['./smcategory.page.scss'],
})
export class SmcategoryPage implements OnInit {
  isShown: boolean = false;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  constructor(public service: CommanService, public router: Router) {}

  ngOnInit() {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmCategoryPage');
  }

  goToCreateList(catId, title, emoji) {
    //this.ads.randomlyAdsShow();
    let navigationExtras: NavigationExtras = {
      state: {
        catId: catId,
        title: title,
        sticker: emoji,
      },
    };

    this.router.navigate(['/smsubcategory'], navigationExtras);
  }

  onScroll(event) {
    if (event.detail.scrollTop > 300) {
      this.isShown = true;
    } else {
      this.isShown = false;
    }
    // this.cd.detectChanges();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  goToMyCreationPage() {
    // this.ads.randomlyAdsShow();
    // this.navCtrl.push(SmCreationPage);
  }
}
