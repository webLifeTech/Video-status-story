import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CommanService } from '../service/comman.service';

@Component({
  selector: 'app-smsubcategory',
  templateUrl: './smsubcategory.page.html',
  styleUrls: ['./smsubcategory.page.scss'],
})
export class SmsubcategoryPage implements OnInit {
  isShown: boolean = false;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  spinner: boolean = true;
  categoryId: any;
  title: any;
  sticker: any;

  constructor(public service: CommanService, public router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.categoryId = this.router.getCurrentNavigation().extras.state.catId;
      this.title = this.router.getCurrentNavigation().extras.state.title;
      this.sticker = this.router.getCurrentNavigation().extras.state.sticker;

      this.getSubCat(this.categoryId);
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

  getSubCat(id) {
    this.categoryId = id;
    if (id == 'new') {
      this.service.custSubCategoryList[id] = this.service.custLatestList;
      this.spinner = false;
      return;
    }
    if (
      this.service.custSubCategoryList[id] &&
      this.service.custSubCategoryList[id].length
    ) {
      this.spinner = false;
      return;
    } else {
      this.service.getCustsubCatByCategory(id).then(
        (res) => {
          this.service.custSubCategoryList[id] = [];
          this.service.custSubCategoryList[id] = res['result'];
          this.spinner = false;
        },
        (err) => {
          console.log(err);
          this.spinner = false;
        }
      );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateListPage');
  }

  goToCreateCust(image) {
    //this.ads.randomlyAdsShow();

    let navigationExtras: NavigationExtras = {
      state: { selectedFrame: image, sticker: this.sticker },
    };
    this.router.navigate(['/smcreate'], navigationExtras);
  }

  ngOnInit() {}
}
