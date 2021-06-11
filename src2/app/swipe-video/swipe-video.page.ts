import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, IonContent, AlertController } from '@ionic/angular';
import { CommanService } from '../service/comman.service';
import {FileTransfer,FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AdsService } from '../service/ads.service';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-swipe-video',
  templateUrl: './swipe-video.page.html',
  styleUrls: ['./swipe-video.page.scss'],
})
export class SwipeVideoPage implements OnInit {
  videoList: any = [];
  foldername: any;
  spinner: boolean = true;
  isShown: boolean = false;
  downloadspinner: boolean = false;
  sharespinner: boolean = false;
  totalrecord: number = 0;
  previousInd: any = 0;
  videoURL: any;
  isPlay: boolean = true;
  isHideShowPlay: boolean = true;
  setTimeout: any;
  slideOpts = {
    loop: false,
    direction: 'vertical',
	};
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('myVideo') myVideo: ElementRef;
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
      let videoData = this.router.getCurrentNavigation().extras.state.videoList;
      this.videoList = videoData.video;
      this.foldername = this.router.getCurrentNavigation().extras.state.foldername;
      this.videoURL = this.service.bucketUrl+this.foldername+"/"+ videoData.foldername+"/";
      this.totalrecord = 0;
      this.previousInd = 0;
      this.spinner = false;
    }
    this.adMobFree.on(this.adMobFree.events.INTERSTITIAL_CLOSE).subscribe(() => {
      let index = this.slides.getActiveIndex();
      setTimeout(() => {
        let vidId = <HTMLVideoElement>(
          document.getElementById("myVideo" + index)
        );
        if (vidId) {
          vidId.play();
        }
      }, 200);
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
    setTimeout(() => {
      let vidId = <HTMLVideoElement>document.getElementById("myVideo"+0);
      console.log("vidId???",vidId);
      if (vidId) {
        vidId.play();
      }
      this.isPlay = false;
    },200);
    this.service.checkFavVideo(this.videoURL+this.videoList[0].link);
  }

  ngOnInit() {
  }

  loadMoreData() {
    console.log("totalrecord>>>",this.totalrecord);
    if (this.totalrecord < this.videoList.length) {
      this.totalrecord += 5;
      // this.pauseVideo();
      this.ads.showInterstitialAdMob();
    }
  }
  // For Custom Play Pause
  btnHideShowFn(ind) {
    this.isPlay = !this.isPlay;
    let vidId = <HTMLVideoElement>(document.getElementById("myVideo" + ind));
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

	slideChanged() {
    this.isPlay = false;
		try {
			(<any>window).document.querySelectorAll('video').forEach(vid => {
				vid.pause();
				vid.currentTime = 0;
			});
	
			this.slides.getActiveIndex().then((index)=> {
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
  
          let vidId = <HTMLVideoElement>(
            document.getElementById("myVideo" + index)
          );
          if (vidId) {
            vidId.play();
          }
        }, 100);
			});
      
		} catch(ee) {
		}
	}

	slideNextt() {
    console.log("index");
    this.slides.getActiveIndex().then((index)=> {
      console.log("yyyyyyyy>>",index);
			this.service.checkFavVideo(this.videoURL+this.videoList[index].link);
		});
  }
  slidePrevv() {
    this.slides.getActiveIndex().then((index)=> {
      console.log("iiiiii>>",index);
			this.service.checkFavVideo(this.videoURL+this.videoList[index].link);
		});
  }

  downloadVideo(url) {
    this.downloadspinner = true;
    var fileName = 'VideoStatus' + new Date().getTime() + '.mp4';
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    console.log("fileTransferDir<<<<<<<<<>>>>"+JSON.stringify(fileTransferDir));
    const fileURL = fileTransferDir + 'Vibes Video Status/' + fileName;
    fileTransfer.download(url, fileURL).then(
      (entry) => {
        this.downloadspinner = false;
        let alert = this.alertCtrl.create({
          header: 'Vibes Video Status',
          message: 'Download Successfully!',
          mode:'ios',
          cssClass: 'my_alertCtrl',
          buttons: [
            {
              text: 'Ok',
              cssClass: 'oky_btn',
              handler: () => {
                this.ads.showInterstitialAdMob();
                (<any>window).cordova.plugins.MediaScannerPlugin.scanFile(fileURL,() => {},
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
        console.log("error>>>>>>>>>>>>>"+JSON.stringify(error));
        this.downloadspinner = false;
      }
    );
  }

  sahreVideo(url) {
    this.sharespinner = true;
    this.socialSharing.share(
        `😍 Enjoy Best Vibes Video Status App 👌.
        *👇Vibes Video Status*👇`,'',url,
        'https://play.google.com/store/apps/details?id=vibes.video.status.in').then((res) => {
          this.sharespinner = false;
        },(er) => {
          this.sharespinner = false;
        }
      );
  }

  reportVideo(url) {
    this.myVideo.nativeElement.pause();
    let alert = this.alertCtrl.create({
      header: 'Vibes Video Status',
      message: 'Do you want to Report this video?',
      backdropDismiss: false,
      mode:'ios',
      cssClass: 'my_alertCtrl',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'cancel_btn',
          handler: () => {
            this.myVideo.nativeElement.play();
          },
        },
        {
          text: 'Yes',
          cssClass: 'oky_btn',
          handler: () => {
            this.service.reportVideo(url).then(
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

  goBacks() {
    this.router.navigate(['/videocat']);
  }

}

