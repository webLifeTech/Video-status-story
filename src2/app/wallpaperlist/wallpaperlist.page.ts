import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AdsService } from '../service/ads.service';
import { CommanService } from '../service/comman.service';

@Component({
  selector: 'app-wallpaperlist',
  templateUrl: './wallpaperlist.page.html',
  styleUrls: ['./wallpaperlist.page.scss'],
})
export class WallpaperlistPage implements OnInit {
  @ViewChild('wallPaperSearch') myInput;
  isSearch: boolean = false;
  isNotFound: any = false;
  spinner: any = true;
  isShown: boolean = false;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    public service: CommanService,
    public router: Router,
    public ads: AdsService
  ) {}

  ngOnInit() {}

  onScroll(event) {
    if (event.detail.scrollTop > 300) {
      this.isShown = true;
    } else {
      this.isShown = false;
    }
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.spinner = false;
    }, 300);
    console.log('ionViewDidLoad WallpaperPage');
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  serchItem(event) {
    this.ads.showInterstitialAdMob();
    var val = event.target.value;
    if (val && val.trim() != '') {
      this.service.searchAllWallpaper(val).then(
        (res) => {
          if (res['total_results'] != 0) {
            this.isNotFound = false;
            this.service.holeWallpapers = res['photos'];
          } else {
            this.isNotFound = true;

            console.log('serch not found');
          }
        },
        (err) => {
          console.log('errr', err);
        }
      );
    }
  }

  clickTag(text) {
    this.ads.randomAdsShow();
    this.service.searchAllWallpaper(text).then(
      (res) => {
        if (res['total_results'] != 0) {
          this.service.holeWallpapers = res['photos'];
        }
      },
      (err) => {
        console.log('errr', err);
      }
    );
  }

  closeButton() {
    if (!this.isSearch) {
      setTimeout(() => {
        this.myInput.setFocus();
      }, 300);
    }
    this.isSearch = !this.isSearch;
    this.isNotFound = false;
  }

  presentProfileModal(ind) {
    let navigationExtras: NavigationExtras = {
      state: {
        images: this.service.holeWallpapers,
        index: ind,
      },
    };

    this.router.navigate(['/wallpapermodal'], navigationExtras);
  }
}
