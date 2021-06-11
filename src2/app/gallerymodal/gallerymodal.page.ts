import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { AlertController, IonContent, IonSlides } from '@ionic/angular';
import { AdsService } from '../service/ads.service';
import { CommanService } from '../service/comman.service';

@Component({
  selector: 'app-gallerymodal',
  templateUrl: './gallerymodal.page.html',
  styleUrls: ['./gallerymodal.page.scss'],
})
export class GallerymodalPage implements OnInit {
  images: any = [];
  index: any;

  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('slider', { static: false }) sliders: IonSlides;

  mySlideOptions = {
    initialSlide: 1,
    slidesPerView: 1,
  };
  constructor(
    public router: Router,
    public service: CommanService,
    public alertCtrl: AlertController,
    public file: File,
    public ads: AdsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.images = this.router.getCurrentNavigation().extras.state.images;
      this.index = this.router.getCurrentNavigation().extras.state.index;
      this.mySlideOptions.initialSlide = this.index;
    }
  }

  ngOnInit() {}

  async shareVia() {
    this.index = await this.sliders.getActiveIndex();
    this.service.shareAll(this.images[this.index].original);
  }

  async delete() {
    this.index = await this.sliders.getActiveIndex();
    let alert = this.alertCtrl.create({
      header: 'Vibes Video Status',
      message: 'Are you sure you want to delete?',
      backdropDismiss: false,
      mode:'ios',
      cssClass: 'my_alertCtrl',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'cancel_btn',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Yes',
          cssClass: 'oky_btn',
          handler: () => {
            var path = this.images[this.index].original;
            var ind = path.indexOf(path.split('/').pop());
            var filepath = path.substring(0, ind);
            var fileName = path.split('/').pop();

            this.file
              .removeFile(filepath, fileName)
              .then(() => {
                this.ads.showInterstitialAdMob();
                this.router.navigate(['/gallery']);
              })
              .catch((e) => console.log('delete', JSON.stringify(e)));
          },
        },
      ],
    });
    alert.then((res) => {
      res.present();
    });
  }
}
