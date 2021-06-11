import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CommanService } from '../service/comman.service';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.page.html',
  styleUrls: ['./videolist.page.scss'],
})
export class VideolistPage implements OnInit {
  videoList: any;
  foldername: any;
  spinner: boolean = true;
  isShown: boolean = false;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(public router: Router, public service: CommanService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.videoList = this.router.getCurrentNavigation().extras.state.videoList;
      this.foldername = this.router.getCurrentNavigation().extras.state.foldername;
      this.spinner = false;
    }
  }
  ngOnInit() {}

  ionViewWillEnter() {
    this.spinner = false;
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

  openVideo(index) {
    //this.ads.randomlyAdsShow();
    let navigationExtras: NavigationExtras = {
      state: {
        index,
        data: this.videoList,
        foldername: this.foldername,
      },
    };
    this.router.navigate(['videoplay'], navigationExtras);
  }
}
