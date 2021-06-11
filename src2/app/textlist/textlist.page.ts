import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AdsService } from '../service/ads.service';
import { CommanService } from '../service/comman.service';

@Component({
  selector: 'app-textlist',
  templateUrl: './textlist.page.html',
  styleUrls: ['./textlist.page.scss'],
})
export class TextlistPage implements OnInit {
  videoList: any;
  foldername: any;
  isShown: boolean = false;
  spinner: any = true;
  index: any;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    public service: CommanService,
    public router: Router,
    public ads: AdsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.videoList = this.router.getCurrentNavigation().extras.state.videoList;
      this.foldername = this.router.getCurrentNavigation().extras.state.foldername;
      this.gotoVideoList(0);
    }
    if (this.service.allTextBg.length == 0) {
      for (let i = 1; i <= this.service.allVersionDetails.txtBGCount; i++) {
        this.service.allTextBg.push(
          this.service.bucketUrl + 'TextBackGround/' + i + '.webp'
        );
      }
    }
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

  ngOnInit() {}

  gotoVideoList(index) {
    this.index = index;
    //this.ads.randomAdsShow();
  }

  goToTextCreation(text) {
    this.ads.randomAdsShow();
    let navigationExtras: NavigationExtras = {
      state: {
        txt: text,
      },
    };
    this.router.navigate(['/textcreation'], navigationExtras);
  }
}
