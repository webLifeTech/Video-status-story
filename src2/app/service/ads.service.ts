import { Injectable } from '@angular/core';
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
} from '@ionic-native/admob-free/ngx';
import { Platform, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  loading: any;
  isOpenAdRequest: any = false;
  constructor(
    public admobFree: AdMobFree,
    public platform: Platform,
    public loadingController: LoadingController
  ) {
    this.platform.ready().then(() => {
      this.prepareInterstitialAd();
    });
    this.admobFree
      .on(this.admobFree.events.INTERSTITIAL_CLOSE)
      .subscribe(() => {
        this.prepareInterstitialAd();
      });
    this.admobFree.on(this.admobFree.events.INTERSTITIAL_LOAD).subscribe(() => {
      if (this.isOpenAdRequest) {
        this.admobFree.interstitial.show();
      }
    });
    this.admobFree.on(this.admobFree.events.INTERSTITIAL_OPEN).subscribe(() => {
      this.isOpenAdRequest = false;
    });
  }

  showInterstitialAdMob() {
    this.presentLoading().then(() => {
      this.isOpenAdRequest = true;
      this.admobFree.interstitial
        .isReady()
        .then((ready) => {
          if (ready) {
            this.admobFree.interstitial.show();
          }
          if (this.loading) {
            this.loading.dismiss();
          }
        })
        .catch((err) => {
          if (this.loading) {
            this.loading.dismiss();
          }
        });
    });

    this.admobFree.on(this.admobFree.events.INTERSTITIAL_OPEN).subscribe(() => {
      if (this.loading) {
        this.loading.dismiss();
      }
    });

    this.admobFree
      .on(this.admobFree.events.INTERSTITIAL_LOAD_FAIL)
      .subscribe(() => {
        if (this.loading) {
          this.loading.dismiss();
        }
      });
  }

  showAdmobBannerAdMob() {
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-3903946942966834/1224525526',
      autoShow: true,
      isTesting: true,
      bannerAtTop: false,
      overlap: false,
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner
      .prepare()
      .then(() => {})
      .catch((e) => {});
  }

  prepareInterstitialAd() {
    const InterstitialConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-3903946942966834/2346035507',
      autoShow: false,
      isTesting: true,
    };
    this.admobFree.interstitial.config(InterstitialConfig);
    this.admobFree.interstitial
      .prepare()
      .then(() => {})
      .catch((e) => {});
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    await loading.present();
  }

  randomAdsShow() {
    var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16];
    var item = items[Math.floor(Math.random() * items.length)];

    if (item == 2 || item == 10 || item == 15) {
      this.showInterstitialAdMob();
    }
    return true;
  }
}
