import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AdsService } from '../service/ads.service';
import { CommanService } from '../service/comman.service';

@Component({
  selector: 'app-videocat',
  templateUrl: './videocat.page.html',
  styleUrls: ['./videocat.page.scss'],
})
export class VideocatPage implements OnInit {
  categories: any = [];
  folderName: any;
  catName: any;
  spinner: any = true;
  isShown: boolean = false;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    public router: Router,
    public service: CommanService,
    public ads: AdsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.categories = this.router.getCurrentNavigation().extras.state.categories;
      this.catName = this.router.getCurrentNavigation().extras.state.catName;
      this.folderName = this.router.getCurrentNavigation().extras.state.folderName;
      this.spinner = false;
    }
  }

  ionViewWillEnter() {
    this.spinner = false;
  }

  ngOnInit() {}

  onScroll(event) {
    if (event.detail.scrollTop > 300) {
      this.isShown = true;
    } else {
      this.isShown = false;
    }
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  gotoVideoList(cat) {
    this.spinner = true;
    this.ads.randomAdsShow();
    let navigationExtras: NavigationExtras = {
      state: {
        videoList: cat,
        foldername: this.folderName,
      },
    };

    if (this.folderName == 'TextMessage') {
      this.service.shuffle(cat.subcategory);
      this.spinner = false;

      this.router.navigate(['/textlist'], navigationExtras);
    } else if (this.folderName == 'Ringtone') {
      this.spinner = false;
      this.router.navigate(['/ringtone'], navigationExtras);
    } else if (
      this.folderName == 'ImageStatus' ||
      this.folderName == 'FestivalAlphabets' ||
      this.folderName == 'GIF' ||
      this.folderName == 'WhatsappStricker'
    ) {
      this.spinner = false;
      this.router.navigate(['/imagelist'], navigationExtras);
    } else {
      this.service.shuffle(cat.video);
      this.spinner = false;
      // this.router.navigate(['videolist'], navigationExtras);
      this.router.navigate(['swipe-video'], navigationExtras);
    }
  }
}
