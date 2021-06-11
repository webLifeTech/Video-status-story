import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { CommanService } from '../service/comman.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AdsService } from '../service/ads.service';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('myVideo') myVideo: ElementRef;
  slideOpts = {
    loop: false,
    direction: 'vertical',
  };
  totalrecord: any = 0;
  previousInd: any = 0;
  downloadspinner: boolean = false;
  sharespinner: boolean = false;
  isPlay: boolean = true;
  isHideShowPlay: boolean = true;
  setTimeout: any;
  constructor(
    public mc: ModalController,
    public alertCtrl: AlertController,
    public service: CommanService,
    public router: Router,
    public fileTransfer: FileTransfer,
    public file: File,
    public socialSharing: SocialSharing,
    public ads: AdsService,
    public adMobFree: AdMobFree
  ) {
    console.log("this.myFavVideos>>>", this.service.myFavVideos);
    this.adMobFree.on(this.adMobFree.events.INTERSTITIAL_CLOSE).subscribe(() => {
      let index = this.slides.getActiveIndex();
      setTimeout(() => {
        let vidId = <HTMLVideoElement>(
          document.getElementById("myVideo" + index)
        );
        if (vidId) {
          vidId.play();
        }
      }, 100);
    });

    this.adMobFree.on(this.adMobFree.events.INTERSTITIAL_OPEN).subscribe(() => {
      let index = this.slides.getActiveIndex();
      setTimeout(() => {
        let vidId = <HTMLVideoElement>(
          document.getElementById("myVideo" + index)
        );
        if (vidId) {
          vidId.pause();
        }
      }, 200);
    });
    if (this.service.myFavVideos.length) {
      console.log("jjjjjjjjjjjj");
      setTimeout(() => {
        let vidId = <HTMLVideoElement>document.getElementById("myVideo"+0);
        console.log("vidId???",vidId);
        if (vidId) {
          vidId.play();
        }
      }, 200);
      this.isPlay = false;
    }
  }

  // For Custom Play Pause
  btnHideShowFn(ind) {
    this.isPlay = !this.isPlay;
    let vidId = <HTMLVideoElement>(document.getElementById("myVideo" + ind));
    console.log("myVideo" + ind);
    
    if (vidId) {
      if (this.isPlay) {
        vidId.pause();
        this.isHideShowPlay = false;
      } else {
        vidId.play();
        this.isHideShowPlay = true;
      }
    }
  }

  ngOnInit() {
  }

  loadMoreData() {
    if (this.totalrecord < this.service.myFavVideos.length) {
      this.totalrecord += 5;
      this.ads.showInterstitialAdMob();
    }
  }

  slideChanged() {
    this.isPlay = false;
    try {
      (<any>window).document.querySelectorAll('video').forEach(vid => {
        vid.pause();
        vid.currentTime = 0;
      });

      this.slides.getActiveIndex().then((index) => {
        if (index == 1) {
          this.totalrecord += 1;
        }
        setTimeout(() => {
          if (index > this.previousInd) {
            let vidId = <HTMLVideoElement>(
              document.getElementById("myVideo" + (index - 1))
            );
            if (vidId) {
              vidId.pause();
            }
          } else {
            let vidId = <HTMLVideoElement>(
              document.getElementById("myVideo" + (index + 1))
            );
            if (vidId) {
              vidId.pause();
            }
          }
          this.previousInd = index;
          // this.isHideShowPlay = false;
          let vidId = <HTMLVideoElement>(
            document.getElementById("myVideo" + index)
          );
          if (vidId) {
            vidId.play();
          }
        }, 100);
      });

    } catch (ee) {
    }
  }

  slideNextt() {
    console.log("index");
    this.slides.getActiveIndex().then((index) => {
      console.log("yyyyyyyy>>", index);
    });
  }
  slidePrevv() {
    this.slides.getActiveIndex().then((index) => {
      console.log("iiiiii>>", index);
    });
  }

  downloadVideo(url) {
    this.downloadspinner = true;
    var fileName = 'VideoStatus' + new Date().getTime() + '.mp4';
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    console.log("fileTransferDir<<<<<<<<<>>>>" + JSON.stringify(fileTransferDir));
    const fileURL = fileTransferDir + 'Vibes Video Status/' + fileName;
    fileTransfer.download(url, fileURL).then(
      (entry) => {
        this.downloadspinner = false;
        let alert = this.alertCtrl.create({
          header: 'Vibes Video Status',
          message: 'Download Successfully!',
          mode: 'ios',
          cssClass: 'my_alertCtrl',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Ok',
              cssClass: 'oky_btn',
              handler: () => {
                this.ads.showInterstitialAdMob();
                (<any>window).cordova.plugins.MediaScannerPlugin.scanFile(fileURL, () => { },
                  (errr) => { }
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
        console.log("error>>>>>>>>>>>>>" + JSON.stringify(error));
        this.downloadspinner = false;
      }
    );
  }

  sahreVideo(url) {
    this.sharespinner = true;
    this.socialSharing.share(
      `😍 Enjoy Best Vibes Video Status App 👌.
      *👇Vibes Video Status*👇`, '', url,
      'https://play.google.com/store/apps/details?id=vibes.video.status.in').then((res) => {
        this.sharespinner = false;
      }, (er) => {
        this.sharespinner = false;
      }
      );
  }

  async favDeleteAlt(url, index) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete ??',
      mode: 'ios',
      cssClass: 'my_alertCtrl',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel_btn',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          cssClass: 'oky_btn',
          handler: () => {
            let vidId;
            this.service.removeFavVideo(url);
            setTimeout(() => {
              console.log("this.length<<<", this.service.myFavVideos.length);
              console.log("index<<<", index);

              if (this.service.myFavVideos.length > index) {
                console.log("1111");
                vidId = <HTMLVideoElement>document.getElementById("myVideo" + index);
              } else {
                console.log("2222");
                vidId = <HTMLVideoElement>document.getElementById("myVideo" + (index - 1));
              }
              if (vidId) {
                vidId.play();
              }
            }, 300);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  goBacks() {
    this.router.navigate(['/home/Home']);
  }

}
