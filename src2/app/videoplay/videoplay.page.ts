import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';
import { CommanService } from '../service/comman.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AdsService } from '../service/ads.service';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-videoplay',
  templateUrl: './videoplay.page.html',
  styleUrls: ['./videoplay.page.scss'],
})
export class VideoplayPage implements OnInit {
  @ViewChild('myVideo') myVideo: ElementRef;
  data: any;
  index: any;
  url: any;
  poster: any;
  foldername: any;
  adsNo: any = [];
  downloadspinner: boolean = false;
  sharespinner: boolean = false;
  isFavVideo: boolean = false;

  constructor(
    public router: Router,
    public service: CommanService,
    public alertCtrl: AlertController,
    public fileTransfer: FileTransfer,
    public file: File,
    public socialSharing: SocialSharing,
    public ads: AdsService,
    public adMobFree: AdMobFree
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.index = this.router.getCurrentNavigation().extras.state.index;
      this.data = this.router.getCurrentNavigation().extras.state.data;
      this.foldername = this.router.getCurrentNavigation().extras.state.foldername;
    }

    this.url =
      this.service.bucketUrl +
      this.foldername +
      '/' +
      this.data.foldername +
      '/' +
      this.data.video[this.index]['link'];
    this.poster =
      this.service.bucketUrl +
      this.foldername +
      '/' +
      this.data.foldername +
      '/' +
      this.data.video[this.index]['thumb'];
    var x = 0;
    var b = 4;
    var d = 4;
    var n = this.data.video.length - 1;
    for (x += b; x <= n; x += d) {
      this.adsNo.push(x);
    }

    this.adMobFree.on(this.adMobFree.events.INTERSTITIAL_OPEN).subscribe(() => {
      setTimeout(() => {
        this.myVideo.nativeElement.pause();
      }, 100);
    });

    this.checkFavVideo();
  }

  goBack() {
    this.router.navigate(['/videolist']);
  }

  checkFavVideo() {
    this.isFavVideo = false;

    for (let i in this.service.myfavposes) {
      if (this.service.myfavposes[i].url == this.url) {
        this.isFavVideo = true;
      }
    }
  }

  reportVideo() {
    this.myVideo.nativeElement.pause();
    let alert = this.alertCtrl.create({
      header: 'Vibes Video Status',
      message: 'Do you want to Report this video?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.myVideo.nativeElement.play();
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.service.reportVideo(this.url).then(
              (res) => {
                this.service.show('Reported Successfully!');
                this.myVideo.nativeElement.play();
              },
              (er) => {
                console.log('error while report', er);
              }
            );
          },
        },
      ],
    });
    alert.then((res) => {
      res.present();
    });
  }

  slideChanged() {}

  slide(i) {
    try {
      if (i == 0) {
        if (this.index == 0) {
          this.index = this.data.video.length - 1;
        } else {
          this.index -= 1;
        }
      }
      if (i == 1) {
        if (this.index == this.data.video.length - 1) {
          this.index = 0;
        } else {
          this.index += 1;
        }
      }
      if (this.adsNo.indexOf(this.index) != -1) {
        this.ads.showInterstitialAdMob();
      } else {
        this.url =
          this.service.bucketUrl +
          this.foldername +
          '/' +
          this.data.foldername +
          '/' +
          this.data.video[this.index]['link'];

        this.poster =
          this.service.bucketUrl +
          this.foldername +
          '/' +
          this.data.foldername +
          '/' +
          this.data.video[this.index]['thumb'];

        this.myVideo.nativeElement.setAttribute('src', this.url);
      }

      this.checkFavVideo();
    } catch (r) {}
    return true;
  }

  download() {
    this.downloadspinner = true;

    var fileName = 'VideoStatus' + new Date().getTime() + '.mp4';
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    const fileURL = fileTransferDir + 'Vibes Video Status/' + fileName;

    fileTransfer.download(this.url, fileURL).then(
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

  setFavourite() {
    this.ads.randomAdsShow();
    this.service.myfavposes.push({
      url: this.url,
      poster: this.poster,
    });
    window.localStorage.setItem(
      'myFavVideos',
      JSON.stringify(this.service.myfavposes)
    );
    this.checkFavVideo();
  }

  unFavourite() {
    this.ads.randomAdsShow();
    for (let i in this.service.myfavposes) {
      if (this.service.myfavposes[i].url == this.url) {
        this.service.myfavposes.splice(i, 1);
      }
    }
    window.localStorage.setItem(
      'myFavVideos',
      JSON.stringify(this.service.myfavposes)
    );
    this.checkFavVideo();
  }

  share() {
    this.sharespinner = true;
    this.socialSharing
      .share(
        `😍 Enjoy Best Vibes Video Status App 👌.
      *👇Vibes Video Status*👇
        `,
        '',
        this.url,
        'https://play.google.com/store/apps/details?id=vibes.video.status.in'
      )
      .then(
        (res) => {
          this.ads.randomAdsShow();
          this.sharespinner = false;
        },
        (er) => {
          this.sharespinner = false;
        }
      );
  }

  ngOnInit() {}
}
