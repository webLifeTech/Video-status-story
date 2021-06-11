import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { AdsService } from '../service/ads.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  myImages: any = [];
  spinner: boolean = true;

  constructor(
    public file: File,
    public ads: AdsService,
    public router: Router
  ) {}

  ionViewWillEnter() {
    this.myImages = [];
    this.readImageFromFolder(
      this.file.externalRootDirectory,
      'Vibes Video Status'
    );
  }

  readImageFromFolder(path, dirName) {
    this.file
      .listDir(path, dirName)
      .then((entries) => {
        for (let i of entries) {
          if (
            i['nativeURL'].split('.').pop() != 'mp4' &&
            i['nativeURL'].split('.').pop() != 'mp3' &&
            i['nativeURL'].split('.').pop() != 'webm'
          ) {
            let image = (window as any).Ionic.WebView.convertFileSrc(
              i['nativeURL']
            );
            this.myImages.push({ image: image, original: i['nativeURL'] });
          }
        }
        this.spinner = false;
      })
      .catch((e) => {
        console.log('While reading pdf getting errors' + JSON.stringify(e));
        this.spinner = false;
      });
  }

  presentProfileModal(ind) {
    this.ads.randomAdsShow();

    let navigationExtras: NavigationExtras = {
      state: {
        images: this.myImages,
        index: ind,
      },
    };
    this.router.navigate(['/gallerymodal'], navigationExtras);
  }

  ngOnInit() {}
}
