import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CommanService } from '../service/comman.service';

@Component({
  selector: 'app-imagelist',
  templateUrl: './imagelist.page.html',
  styleUrls: ['./imagelist.page.scss'],
})
export class ImagelistPage implements OnInit {
  videoList: any;
  foldername: any;
  spinner: any = true;
  isShown: boolean = false;
  isRagulerGrid: boolean = false;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(public router: Router, public service: CommanService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.videoList = this.router.getCurrentNavigation().extras.state.videoList;
      this.foldername = this.router.getCurrentNavigation().extras.state.foldername;
    }

    // For RagulerGrid
    if(this.foldername == 'FestivalAlphabets'){
      this.isRagulerGrid = true;
      return;
    }
    if(this.foldername == 'ImageStatus' && (this.videoList.foldername == 'Hindi' || this.videoList.foldername == 'Gujarati')){
      this.isRagulerGrid = true;
      return;
    }
  }

  onScroll(event) {
    if (event.detail.scrollTop > 300) {
      this.isShown = true;
    } else {
      this.isShown = false;
    }
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.spinner = false;
    }, 300);
    console.log('ionViewDidLoad WallpaperPage');
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  ngOnInit() {}

  presentProfileModal(ind) {
    //this.ads.randomlyAdsShow();

    let navigationExtras: NavigationExtras = {
      state: {
        images: this.videoList,
        index: ind,
        foldername: this.foldername,
      },
    };
    this.router.navigate(['/imagemodal'], navigationExtras);
  }
}
