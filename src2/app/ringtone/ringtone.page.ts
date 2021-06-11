import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { AlertController, IonContent } from '@ionic/angular';
import { CommanService } from '../service/comman.service';
import { File } from '@ionic-native/file/ngx';
import { AdsService } from '../service/ads.service';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-ringtone',
  templateUrl: './ringtone.page.html',
  styleUrls: ['./ringtone.page.scss'],
})
export class RingtonePage implements OnInit {
  videoList: any;
  foldername: any;

  @ViewChild('ringtoneSearch') myInput;
  isSearch: boolean = false;
  currantIndex: any;
  searchedData: any = [];
  downloadSpinner: any;
  buffer: any;
  isShown: boolean = false;
  spinner: any = true;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    public service: CommanService,
    public file: File,
    public fileTransfer: FileTransfer,
    public alertCtrl: AlertController,
    public router: Router,
    public ads: AdsService,
    public adMobFree: AdMobFree
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.videoList = this.router.getCurrentNavigation().extras.state.videoList;
      this.foldername = this.router.getCurrentNavigation().extras.state.foldername;
    }
    this.searchedData = this.videoList.video;

    this.adMobFree.on(this.adMobFree.events.INTERSTITIAL_OPEN).subscribe(() => {
      setTimeout(() => {
        this.pause();
      }, 100);
    });
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.spinner = false;
    }, 300);
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

  serchItem(ev) {
    this.videoList.video = this.searchedData;
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.videoList.video = this.videoList.video.filter((item) => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  closeButton() {
    if (!this.isSearch) {
      setTimeout(() => {
        this.myInput.setFocus();
      }, 300);
    }
    this.isSearch = !this.isSearch;
    this.videoList.video = this.searchedData;
    this.ads.randomAdsShow();
  }

  play(index) {
    let vidId = <HTMLVideoElement>document.getElementById('audio' + index);
    this.pause();
    if (vidId) {
      vidId.play();
      this.currantIndex = index;
    }

    vidId.addEventListener('waiting', () => {
      this.buffer = index;
    });

    vidId.addEventListener('progress', () => {
      var timeRanges = vidId.buffered;
      if (timeRanges && timeRanges.length > 0) {
        this.buffer = null;
      }
    });
  }

  pause() {
    this.currantIndex = null;
    (<any>window).document.querySelectorAll('audio').forEach((vid) => {
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }

  download(name, index) {
    this.downloadSpinner = index;
    let url =
      this.service.bucketUrl +
      this.foldername +
      '/' +
      this.videoList.foldername +
      '/' +
      name;

    let fileName = 'VideoStatus' + new Date().getTime() + '.mp3';
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    const fileURL = fileTransferDir + 'Vibes Video Status/' + fileName;

    fileTransfer.download(url, fileURL).then(
      (entry) => {
        let alert = this.alertCtrl.create({
          header: 'Vibes Video Status',
          message: 'Download Successfully in Vibes Video Status Folder!',
          backdropDismiss: false,
          mode:'ios',
          cssClass: 'my_alertCtrl',
          buttons: [
            {
              text: 'Ok',
              cssClass: 'oky_btn',
              handler: () => {
                this.ads.showInterstitialAdMob();
                this.downloadSpinner = null;
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
        this.downloadSpinner = null;
        console.log('error on download' + JSON.stringify(error));
      }
    );
  }

  ngOnInit() {}
}
