import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';
import { CommanService } from '../service/comman.service';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { AdsService } from '../service/ads.service';
declare let window: any;

@Component({
  selector: 'app-wallpapermodal',
  templateUrl: './wallpapermodal.page.html',
  styleUrls: ['./wallpapermodal.page.scss'],
})
export class WallpapermodalPage implements OnInit {
  images: any = [];
  index: any;
  sharespinner: any = false;
  downloadspinner: any = false;

  @ViewChild('slider', { static: false }) sliders: IonSlides;

  mySlideOptions = {
    initialSlide: 1,
    slidesPerView: 1,
  };
  constructor(
    public comman: CommanService,
    public file: File,
    public alertCtrl: AlertController,
    public router: Router,
    public socialSharing: SocialSharing,
    public fileTransfer: FileTransfer,
    public ads: AdsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.images = this.router.getCurrentNavigation().extras.state.images;
      this.index = this.router.getCurrentNavigation().extras.state.index;
    }

    this.mySlideOptions.initialSlide = this.index;
  }

  ngOnInit() {}

  async share() {
    this.index = await this.sliders.getActiveIndex();
    let url = this.images[this.index]['src']['portrait'];
    this.sharespinner = true;
    this.socialSharing
      .share(
        `😍 Enjoy Best Vibes Video Status App 👌.
		*👇Vibes Video Status*👇
			`,
        '',
        url,
        'https://play.google.com/store/apps/details?id=vibes.video.status.in'
      )
      .then(
        (res) => {
          this.ads.showInterstitialAdMob();
          this.sharespinner = false;
        },
        (er) => {
          this.sharespinner = false;
        }
      );
  }

  async download() {
    this.index = await this.sliders.getActiveIndex();
    this.downloadspinner = true;
    let url = this.images[this.index]['src']['portrait'];

    var fileName = 'VideoStatus' + new Date().getTime() + '.jpg';
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    const fileURL = fileTransferDir + 'Vibes Video Status/' + fileName;

    fileTransfer.download(url, fileURL).then(
      (entry) => {
        this.downloadspinner = false;
        let alert = this.alertCtrl.create({
          header: 'Vibes Video Status',
          message: 'Download Successfully!',
          backdropDismiss: false,
          mode:'ios',
          cssClass: 'my_alertCtrl',
          buttons: [
            {
              text: 'Ok',
              cssClass: 'oky_btn',
              handler: () => {
                this.ads.showInterstitialAdMob();
                (<any>window).cordova.plugins.MediaScannerPlugin.scanFile(
                  fileURL,
                  () => {},
                  (errr) => {}
                );
              },
            },
          ],
        });
        alert.then((res) => {
          res.present();
        });
      },
      (error) => {
        this.downloadspinner = false;
      }
    );
  }

  async setAsWallpaper(wallp) {
    this.index = await this.sliders.getActiveIndex();
    let url = this.images[this.index]['src']['portrait'];
    window.plugins.wallpaper.setImageHttp(url, wallp, (error) => {
      if (error) {
        let alert = this.alertCtrl.create({
          header: 'Vibes Video Status',
          message: 'Something went Wrong!',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.ads.randomAdsShow();
              },
            },
          ],
        });
        alert.then((res) => {
          res.present();
        });
        console.error('eeeeeeeeeeeeeeeeeeeee' + error);
      } else {
        let alert = this.alertCtrl.create({
          header: 'Vibes Video Status',
          message: 'Wallpaper Set Successfully!',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.ads.showInterstitialAdMob();
              },
            },
          ],
        });
        alert.then((res) => {
          res.present();
        });
        console.log('Success setting wallpaper.' + error);
      }
    });
  }
}
