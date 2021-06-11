import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'fabric';
import 'fabric-customise-controls';
import { CommanService } from '../service/comman.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';
import { AdsService } from '../service/ads.service';

declare let fabric: any;
@Component({
  selector: 'app-textcreation',
  templateUrl: './textcreation.page.html',
  styleUrls: ['./textcreation.page.scss'],
})
export class TextcreationPage implements OnInit {
  canvas: any;
  myFrame: any;
  tmpImg: any;
  img: any;
  isSelection: boolean = false;
  spinner: boolean = true;
  text: any;
  textCount: number = 0;
  downloadspinner: boolean = false;
  textColor: any = [
    '#FFFFFF',
    '#049FA4',
    '#A0184A',
    '#309C29',
    '#FD7808',
    '#ADD8C7',
    '#E6E264',
    '#F1DAD4',
    '#000000',
    '#79C9A4',
    '#FFD0A4',
    '#101052',
    '#FFCC00',
    '#000080',
    '#FF00FF',
    '#800080',
  ];

  constructor(
    public router: Router,
    public service: CommanService,
    public clipboard: Clipboard,
    public fileTransfer: FileTransfer,
    public file: File,
    public alertCtrl: AlertController,
    public ads: AdsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.text = this.router.getCurrentNavigation().extras.state.txt;
    }
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.canvas = (<any>window)._canvas = new fabric.Canvas('myCanvas', {
      selection: true,
    });

    var widthssss = window.innerWidth > 0 ? window.innerWidth : screen.width;

    this.canvas.setWidth(widthssss);
    this.canvas.setHeight(widthssss + 100);

    fabric.Canvas.prototype.customiseControls({
      br: {
        action: 'scale',
        cursor: 'no-drop',
      },

      mtr: {
        action: 'rotate',
        cursor: 'pointer',
      },
    });

    fabric.Object.prototype.customiseCornerIcons(
      {
        br: {
          icon: 'assets/expand.png',
          settings: {
            cornerBackgroundColor: 'transparent',
            cornerPadding: 25,
            cornerSize: 50,
          },
        },
        // only is hasRotatingPoint is not set to false
        mtr: {
          icon: 'assets/rotate.svg',
          settings: {
            cornerBackgroundColor: 'transparent',
            cornerPadding: 10,
            cornerSize: 50,
          },
        },
      },
      () => {
        this.canvas.renderAll();
      }
    );

    this.canvas.on('selection:created', () => {
      this.isSelection = true;
    });

    this.canvas.on('selection:cleared', () => {
      this.isSelection = false;
    });

    let objMoving;
    this.canvas.on('object:moving', () => {
      objMoving = this.canvas.getActiveObject();
      objMoving.set({
        opacity: 0.3,
      });
      this.canvas.renderAll();
    });

    this.canvas.on('object:moved', () => {
      objMoving.set({
        opacity: 1,
      });
      this.canvas.renderAll();
    });
    let objScaling;
    this.canvas.on('object:scaling', () => {
      objScaling = this.canvas.getActiveObject();
      objScaling.set({
        opacity: 0.3,
      });
      this.canvas.renderAll();
    });

    this.canvas.on('object:scaled', () => {
      objScaling.set({
        opacity: 1,
      });
      this.canvas.renderAll();
    });
    //this.addFabricfromLocal(this.service.allTextBg[0]);
    this.transferImage(this.service.allTextBg[0]);
  }

  transferImage(background) {
    this.spinner = true;
    this.canvas.discardActiveObject();
    this.canvas.renderAll();
    var fileName = new Date().getTime() + '.png';
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    const fileURL = fileTransferDir + 'frame/' + fileName;

    fileTransfer.download(background, fileURL).then(
      (entry) => {
        //
        var widthssss =
          window.innerWidth > 0 ? window.innerWidth : screen.width;

        this.myFrame = (window as any).Ionic.WebView.convertFileSrc(
          entry.nativeURL
        );
        fabric.Image.fromURL(this.myFrame, (img) => {
          img.set({
            left: 0,
            top: 0,
            selectable: false,
          });
          img.scaleToHeight(widthssss + 100);
          img.scaleToWidth(widthssss);

          this.canvas.setBackgroundImage(
            img,
            this.canvas.renderAll.bind(this.canvas),
            {
              scaleX: this.canvas.width / img.width,
              scaleY: this.canvas.height / img.height,
            }
          );

          this.tmpImg = img;
          this.canvas.add(img);
          this.addText(this.text);
          this.spinner = false;

          this.file
            .removeFile(fileTransferDir + 'frame/', fileName)
            .then(() => {})
            .catch((e) => console.log('delete', JSON.stringify(e)));

          this.canvas.on('object:selected', (o) => {
            var activeObj = o.target;
            activeObj.set({
              //'borderColor': 'red', 'cornerColor': 'red', 'cornerSize': 22,
              transparentCorners: false,
            });

            this.canvas.renderAll();
          });
        });
        this.canvas.renderAll();
      },
      (error) => {
        this.spinner = false;
        console.log('error>>>>>>>>>>>>>>>>>', JSON.stringify(error));
      }
    );
  }

  // addFabricfromLocal(frame) {
  //   this.canvas.discardActiveObject();
  //   this.canvas.renderAll();

  //   var widthssss = window.innerWidth > 0 ? window.innerWidth : screen.width;
  //   this.myFrame = frame;
  //   fabric.Image.fromURL(this.myFrame, (img) => {
  //     img.set({
  //       left: 0,
  //       top: 0,
  //       selectable: false,
  //     });
  //     img.scaleToHeight(widthssss);
  //     img.scaleToWidth(widthssss + 100);

  //     this.canvas.setBackgroundImage(
  //       img,
  //       this.canvas.renderAll.bind(this.canvas),
  //       {
  //         scaleX: this.canvas.width / img.width,
  //         scaleY: this.canvas.height / img.height,
  //       }
  //     );

  //     this.tmpImg = img;
  //     this.canvas.add(img);
  //     this.addText(this.text);

  //     this.spinner = false;

  //     this.canvas.on('object:selected', (o) => {
  //       var activeObj = o.target;
  //       activeObj.set({
  //         transparentCorners: false,
  //       });

  //       this.canvas.renderAll();
  //     });
  //   });

  //   this.canvas.renderAll();

  //   //
  // }

  addText(text) {
    var t1 = new fabric.Textbox(text, {
      width: 250,
      top: 180,
      left: 80,
      fontSize: 22,
      textAlign: 'center',
      fontFamily: 'arial black',
      fill: '#FFFFFF',
    });

    this.canvas.add(t1);

    this.canvas.renderAll();
  }

  addColor() {
    if (this.canvas.getActiveObject()) {
      if (this.textCount == 16) {
        this.textCount = 0;
        this.canvas
          .getActiveObject()
          .set('fill', this.textColor[this.textCount]);

        this.canvas.renderAll();
        this.textCount += 1;
        return;
      }
      this.canvas.getActiveObject().set('fill', this.textColor[this.textCount]);
      this.canvas.renderAll();
      this.textCount += 1;
    } else {
      this.service.show('Kindly select text to change color!');
    }
  }

  copyText() {
    this.clipboard.copy(this.text).then(
      (res) => {
        this.service.show('Copied Text to clipboard!!');
      },
      (er) => {
        this.service.show('Error While Copying Text!!');
      }
    );
  }

  saveAndAddWaterMark(isShare) {
    if (isShare) {
      this.spinner = true;
    } else {
      this.downloadspinner = true;
    }

    fabric.Image.fromURL('assets/water.png', (img) => {
      img.set({
        left: 0,
        top: 3,
        selectable: true,
        scaleX: 100,
        scaleY: 100,
      });
      img.scaleToHeight(10);
      img.scaleToWidth(55);
      this.canvas.add(img);

      this.img = this.canvas.toDataURL({ format: 'png', multiplier: 4 });
      this.canvas.renderAll();
      if (isShare) {
        this.shareVia();
      } else {
        this.download();
      }
    });
  }

  shareVia() {
    this.service.shareAll(this.img);
    this.spinner = false;
  }

  download() {
    this.downloadspinner = true;

    var fileName = 'vibestext' + new Date().getTime() + '.png';
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    const fileURL = fileTransferDir + 'Vibes Video Status/' + fileName;

    fileTransfer.download(this.img, fileURL).then(
      (entry) => {
        this.downloadspinner = false;
        const alert = this.alertCtrl.create({
          header: 'Vibes Video Status',
          message: 'Download Successfully!',
          mode:'ios',
          cssClass: 'my_alertCtrl',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              cssClass: 'oky_btn',
              handler: () => {
                this.ads.showInterstitialAdMob();
                (<any>window).cordova.plugins.MediaScannerPlugin.scanFile(
                  fileURL,
                  () => {},
                  (errr) => {}
                );
                console.log('Cancel clicked');
                return true;
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
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr' + error);
      }
    );
  }
}
