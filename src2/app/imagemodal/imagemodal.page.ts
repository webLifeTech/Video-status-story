import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonSlides } from '@ionic/angular';
import { CommanService } from '../service/comman.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { AdsService } from '../service/ads.service';

@Component({
  selector: 'app-imagemodal',
  templateUrl: './imagemodal.page.html',
  styleUrls: ['./imagemodal.page.scss'],
})
export class ImagemodalPage implements OnInit {
  images: any;
  index: any;
  isShown: boolean = false;
  foldername: any;
  sharespinner: any = false;
  downloadspinner: any;

  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('slider', { static: false }) sliders: IonSlides;

  mySlideOptions = {
    initialSlide: 1,
    slidesPerView: 1,
  };

  constructor(
    public router: Router,
    public service: CommanService,
    public socialSharing: SocialSharing,
    public fileTransfer: FileTransfer,
    public file: File,
    public alertCtrl: AlertController,
    public ads: AdsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.images = this.router.getCurrentNavigation().extras.state.images;
      this.index = this.router.getCurrentNavigation().extras.state.index;
      this.foldername = this.router.getCurrentNavigation().extras.state.foldername;
    }

    this.mySlideOptions.initialSlide = this.index;
  }

  async share() {
    this.index = await this.sliders.getActiveIndex();
    let url =
      this.service.bucketUrl +
      this.foldername +
      '/' +
      this.images.foldername +
      '/' +
      this.images.image[this.index]['link'];

    this.sharespinner = true;
    this.socialSharing.share(
      `😍 Enjoy Best Vibes Video Status App 👌.
      *👇Vibes Video Status*👇`,
      '',
      url,
      'https://play.google.com/store/apps/details?id=vibes.video.status.in'
    ).then((res) => {
      this.ads.showInterstitialAdMob();
      this.sharespinner = false;
    },(er) => {
      this.sharespinner = false;
    });
  }

  async download() {
    this.index = await this.sliders.getActiveIndex();
    this.downloadspinner = true;
    let url =
      this.service.bucketUrl +
      this.foldername +
      '/' +
      this.images.foldername +
      '/' +
      this.images.image[this.index]['link'];

    let ext = this.images.image[this.index]['link'].split('.').pop();

    var fileName = 'VideoStatus' + new Date().getTime() + '.' + ext;
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    const fileURL = fileTransferDir + 'Vibes Video Status/' + fileName;

    fileTransfer.download(url, fileURL).then(
      (entry) => {
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
                this.downloadspinner = false;
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

  ngOnInit() {}
}
