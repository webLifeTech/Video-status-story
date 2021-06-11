import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ModalController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { from } from 'rxjs';
import { CommanService } from './service/comman.service';
import { Network } from '@ionic-native/network/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { File } from '@ionic-native/file/ngx';
import { AdsService } from './service/ads.service';
import { FavoritePage } from './favorite/favorite.page';

declare let window: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  maintenancePopup: any;
  public alertShown: boolean = false;
  internetPopup: any;
  public alertInShown: boolean = false;
  public alertDiscard: boolean = false;

  constructor(
    public service: CommanService,
    public router: Router,
    public platform: Platform,
    public alertCtrl: AlertController,
    public mc: ModalController,
    public menuCtrl: MenuController,
    private _location: Location,
    public network: Network,
    public appVersion: AppVersion,
    public fcm: FCM,
    public file: File,
    public ads: AdsService
  ) {
    try {
      this.platform.ready().then((res) => {
        if (this.network.type == 'none') {
          if (this.alertInShown == false) {
            this.noInternetConfirm();
          }
        }
        this.listenConnection();
        // this.service.getAllVideos().then((res) => {
        //   this.service.videoList = res['result'];
        //   console.log("service.videoList>>>>>>>>>>", this.service.videoList);
        // }, (err) => {
        //   console.log("err===============", err);
        // });
        this.file.createDir(this.file.externalRootDirectory, 'Vibes Video Status', true)
          .then((result) => { })
          .catch((err) => { });

        try {
          window.cordova.plugins.firebase.config
            .fetch(1)
            .then((isfetch: any) => {
              window.cordova.plugins.firebase.config
                .fetchAndActivate()
                .then((res: any) => {
                  window.cordova.plugins.firebase.config
                    .getString('Token')
                    .then((urlRes: any) => {
                      this.service.allVersionDetails = JSON.parse(urlRes);

                      this.service.getAllVideos().then(
                        (res) => {
                          this.service.videoList = res['result'];
                        },
                        (err) => {}
                      );

                      this.appVersion.getVersionNumber().then(
                        (versionNumber) => {
                          this.service.bucketUrl = this.service.allVersionDetails[
                            'newBucketUrl'
                          ];

                          this.service.statusMakerBucketUrl = this.service.allVersionDetails[
                            'statusMakerBucketUrl'
                          ];

                          if (
                            this.service.allVersionDetails['flag'] == '0' ||
                            this.service.allVersionDetails['flag'] == false
                          ) {
                            this.underMaintanceConfirm();
                            return;
                          }
                          if (
                            this.service.allVersionDetails['version'] !=
                            versionNumber
                          ) {
                            this.updatePopup();
                          }
                        },
                        (err) => {}
                      );
                    })
                    .catch((error: any) => console.error(error));
                });
            })
            .catch((err) => {
              console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' + err);
            });

        this.initialFCMNotification();
        this.service.readWhatsappMedia();
        this.ads.showAdmobBannerAdMob();
        } catch (ex) {}
      }, err => console.log("eeeeeeeeeeeeeeeeeeee" + err));

      this.platform.backButton.subscribeWithPriority(10, () => {
        if (this.router.url == '' || this.router.url == '/home/Home') {
          this.alertExit();
        } else {
          this._location.back();
        }
      });
    } catch (ex) { }
  }

  async underMaintanceConfirm() {
    this.maintenancePopup = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Vibes Video Status',
      message: `We're undergoing a bit of scheduled maintenance!`,
      backdropDismiss: false,
    });
    await this.maintenancePopup.present();
  }

  async alertExit() {
    const alert = await this.alertCtrl.create({
      header: 'Vibes Video Status',
      message: 'Are you sure you want to exit this app?',
      backdropDismiss: false,
      mode:'ios',
      cssClass: 'my_alertCtrl',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'cancel_btn',
          handler: () => { },
        },
        {
          text: 'Yes',
          cssClass: 'oky_btn',
          handler: () => {
            navigator['app'].exitApp();
          },
        },
      ],
    });
    await alert.present();
  }

  async updatePopup() {
    let alert = await this.alertCtrl.create({
      header: 'Vibes Video Status',
      message: 'New Update Available',
      backdropDismiss: false,
      mode:'ios',
      cssClass: 'my_alertCtrl',
      buttons: [
        {
          text: 'Ignore',
          role: 'cancel',
          cssClass: 'cancel_btn',
          handler: () => { },
        },
        {
          text: 'Update',
          cssClass: 'oky_btn',
          handler: () => {
            this.service.rateUs('vibes.video.status.in');
          },
        },
      ],
    });
    await alert.present();
  }

  async listenConnection() {
    this.network.onDisconnect().subscribe(() => {
      if (this.alertInShown == false) {
        this.noInternetConfirm();
      }
    });

    this.network.onConnect().subscribe(() => {
      if (this.internetPopup) {
        this.internetPopup.then((res) => {
          res.dismiss();
        });
        this.alertInShown = false;
      }
    });
  }

  initialFCMNotification() {
    try {
      this.fcm.getToken().then((token) => { });

      this.fcm.onNotification().subscribe((data) => {
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      });
    } catch (erer) {
      console.log('FCM', erer);
    }
  }

  noInternetConfirm() {
    this.internetPopup = this.alertCtrl.create({
      header: 'Vibes Video Status',
      message: 'No Internet Connection!',
      backdropDismiss: false,
      mode:'ios',
      cssClass: 'my_alertCtrl',
    });
    this.internetPopup.then((res) => {
      res.present();
      this.alertInShown = true;
    });
  }

  async viewFavorite() {
    this.router.navigate(['/favorite']);
    // const modal = await this.mc.create({
    //   component: FavoritePage,
    //   cssClass: 'my-custom-class'
    // });
    // return await modal.present();
  }

  goToGallery() {
    this.router.navigate(['/gallery']);
  }
}
