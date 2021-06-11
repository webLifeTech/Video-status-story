import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CommanService } from '../service/comman.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title: any;
  spinner: any = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    public service: CommanService,
    public router: Router
  ) {}

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.paramMap.get('id');
    this.spinner = false;
  }

  goToWPStatusSaver() {
    this.router.navigate(['/statussaver']);
  }
  goToGallery() {
    this.router.navigate(['/gallery']);
  }

  goToStatusMaker() {
    this.spinner = true;
    if (this.service.custCategoryList.length == 0) {
      this.service.getCustCategory().then(
        (res) => {
          this.service.custCategoryList = res['result'];
          this.spinner = false;
          this.router.navigate(['/smcategory']);
        },(err) => {
          console.log(err);
          this.spinner = false;
        }
      );
    } else {
      this.spinner = false;
      this.router.navigate(['/smcategory']);
    }
  }
}
