import { Component, OnInit, ViewChild } from '@angular/core';
import { CommanService } from '../service/comman.service';
import { File } from '@ionic-native/file/ngx';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { AlertController, IonContent } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AdsService } from '../service/ads.service';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-statussaver',
  templateUrl: './statussaver.page.html',
  styleUrls: ['./statussaver.page.scss'],
})
export class StatussaverPage implements OnInit {
  modal: any = 'images';
  isShown: boolean = false;
  sharespinner: boolean = false;
  downloadspinner: boolean = false;
  spinIndex: any;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    private file: File,
    public service: CommanService,
    public fileTransfer: FileTransfer,
    public alertCtrl: AlertController,
    public socialSharing: SocialSharing,
    public ads: AdsService,
    public adMobFree: AdMobFree
  ) {}

  ngOnInit() {}

  ionViewDidLoad() {
    this.adMobFree.on(this.adMobFree.events.INTERSTITIAL_OPEN).subscribe(() => {
      this.pauseAllVideo();
    });
  }

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

  getWhatsappImage() {
    this.modal = 'images';
  }

  getWhatsappVideo() {
    this.modal = 'videocam';
  }

  pauseAllVideo() {
    (<any>window).document.querySelectorAll('video').forEach((vid) => {
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }

  download(fileNM, isImage, isBusinessWP,ind) {
    // this.spinIndex = fileNM;
    this.downloadspinner = true;
    // return
    let path = '';
    if (isBusinessWP) {
      path =
        this.file.externalRootDirectory + 'WhatsApp Business/Media/.Statuses/';
    } else {
      path = this.file.externalRootDirectory + 'WhatsApp/Media/.Statuses/';
    }
    let fileName = '';
    if (isImage) {
      fileName = 'VideoStatus' + new Date().getTime() + '.jpg';
    } else {
      fileName = 'VideoStatus' + new Date().getTime() + '.mp4';
    }
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    const fileURL = fileTransferDir + 'Vibes Video Status/' + fileName;

    fileTransfer.download(path + fileNM, fileURL).then(
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
        console.log('error on download' + JSON.stringify(error));
      }
    );
  }

  share(fileName, isBusinessWP) {
    let path = '';
    if (isBusinessWP) {
      path =
        this.file.externalRootDirectory + 'WhatsApp Business/Media/.Statuses/';
    } else {
      path = this.file.externalRootDirectory + 'WhatsApp/Media/.Statuses/';
    }
    this.sharespinner = true;
    this.socialSharing.share(
      `😍 Enjoy Best Vibes Video Status App 👌.
      *👇Vibes Video Status*👇`,
      '',
      path + fileName,
      'https://play.google.com/store/apps/details?id=vibes.video.status.in'
    ).then((res) => {
      this.sharespinner = false;
      this.ads.showInterstitialAdMob();
    },(er) => {
      this.sharespinner = false;
      console.log('error on sharing' + JSON.stringify(er));
    });
  }
}
