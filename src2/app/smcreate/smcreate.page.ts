import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {
  Platform,
  AlertController,
  ActionSheetController,
} from '@ionic/angular';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { CommanService } from '../service/comman.service';
import { File } from '@ionic-native/file/ngx';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

import 'fabric';
import 'fabric-customise-controls';
import { AdsService } from '../service/ads.service';

declare let fabric: any;

@Component({
  selector: 'app-smcreate',
  templateUrl: './smcreate.page.html',
  styleUrls: ['./smcreate.page.scss'],
})
export class SmcreatePage implements OnInit, OnDestroy {
  myFrame: any;
  tmpImg: any;
  img: any;
  canvasElement: any;
  lastX: number;
  lastY: number;
  ctx: any;
  canvas: any;
  isFront: boolean = true;
  isSelection: boolean = false;

  fontStyleCount: number = 0;
  fontStyle: any = ['Bold', 'Normal', 'Italic'];
  textCount: number = 0;
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

  filterArray: any = [
    'none',
    'add',
    'diff',
    'screen',
    'lighten',
    'overlay',
    'exclusion',
    'tint',
    'Grayscale',
    'Invert',
    'RemoveColor',
    'Sepia',
    'Brownie',
    'Vintage',
  ];

  fontFamilyArray: any = [
    'Barlow Condensed',
    'Caveat',
    'Fondamento',
    'Indie Flower',
    'Merienda One',
    'Noto Sans',
    'Sacramento',
    'Tangerine',
  ];
  fontFamilyCount: number = 0;
  opacityModel: any = 10;
  isOpacity: boolean = false;

  isAddedText: boolean = false;
  isAddedEmoji: boolean = false;
  isAddedSticker: boolean = false;
  isAddedFilter: boolean = false;
  isAddedEffect: boolean = false;

  selectedFrame: any;
  spinner: boolean = true;
  stickers: any = [];
  actionSheet: any;
  downloadspinner: boolean = false;

  constructor(
    public platform: Platform,
    public renderer: Renderer2,
    public file: File,
    public fileTransfer: FileTransfer,
    public alertCtrl: AlertController,
    public comman: CommanService,
    // public socialSharing: SocialSharing,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public router: Router,
    public ads: AdsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.selectedFrame = this.router.getCurrentNavigation().extras.state.selectedFrame;
      this.transferImage();
      this.stickers = JSON.parse(
        this.router.getCurrentNavigation().extras.state.sticker
      );
    }

    if (this.comman.effects.length == 0) {
      this.comman.getEffect().then(
        (res) => {
          this.comman.effects = JSON.parse(res['result'][0]['effect']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  outsideClick() {
    this.canvas.discardActiveObject();
    this.canvas.renderAll();
  }

  // ionViewDidEnter() {
  //   this.canvas = (<any>window)._canvas = new fabric.Canvas('myCanvas', {
  //     //preserveObjectStacking: true,
  //     selection: true,
  //     uniScaleTransform: true,
  //   });

  //   var widthssss = window.innerWidth > 0 ? window.innerWidth : screen.width;

  //   this.canvas.setWidth(widthssss);
  //   this.canvas.setHeight(widthssss);

  //   this.canvas.renderAll();

  //   this.myFrame = 'assets/test.png';
  //   fabric.Image.fromURL(this.myFrame, (img) => {
  //     img.set({
  //       left: 0,
  //       top: 0,
  //       selectable: false,
  //     });
  //     img.scaleToHeight(widthssss);
  //     img.scaleToWidth(widthssss);

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

  //   fabric.Canvas.prototype.customiseControls({
  //     br: {
  //       action: 'scale',
  //       cursor: 'no-drop',
  //     },
  //     tl: {
  //       action: 'remove',
  //       cursor: 'pointer',
  //     },

  //     mtr: {
  //       action: 'rotate',
  //       cursor: 'pointer',
  //     },
  //   });

  //   fabric.Object.prototype.customiseCornerIcons(
  //     {
  //       tl: {
  //         icon: 'assets/close.svg',
  //         settings: {
  //           cornerBackgroundColor: 'transparent',
  //           cornerPadding: 25,
  //           cornerSize: 50,
  //         },
  //       },
  //       br: {
  //         icon: 'assets/expand.png',
  //         settings: {
  //           cornerBackgroundColor: 'transparent',
  //           cornerPadding: 25,
  //           cornerSize: 50,
  //         },
  //       },
  //       // only is hasRotatingPoint is not set to false
  //       mtr: {
  //         icon: 'assets/rotate.svg',
  //         settings: {
  //           cornerBackgroundColor: 'transparent',
  //           cornerPadding: 10,
  //           cornerSize: 50,
  //         },
  //       },
  //     },
  //     () => {
  //       this.canvas.renderAll();
  //     }
  //   );

  //   this.canvas.on('selection:created', () => {
  //     this.isSelection = true;
  //   });

  //   this.canvas.on('selection:cleared', () => {
  //     this.isSelection = false;
  //   });

  //   let objMoving;
  //   this.canvas.on('object:moving', () => {
  //     objMoving = this.canvas.getActiveObject();
  //     objMoving.set({
  //       opacity: 0.3,
  //     });
  //     this.canvas.renderAll();
  //   });

  //   this.canvas.on('object:moved', () => {
  //     objMoving.set({
  //       opacity: 1,
  //     });
  //     this.canvas.renderAll();
  //   });
  //   let objScaling;
  //   this.canvas.on('object:scaling', () => {
  //     objScaling = this.canvas.getActiveObject();
  //     objScaling.set({
  //       opacity: 0.3,
  //     });
  //     this.canvas.renderAll();
  //   });

  //   this.canvas.on('object:scaled', () => {
  //     objScaling.set({
  //       opacity: 1,
  //     });
  //     this.canvas.renderAll();
  //   });

  //   //
  // }

  goBack() {
    this.exit();
  }

  ngOnDestroy() {}

  exit() {
    if (this.img == null) {
      let alert = this.alertCtrl.create({
        header: 'Vibes Video Status',
        message: 'Do you want to discard changes!',
        backdropDismiss: false,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'Yes',
            handler: () => {
              this.router.navigate(['/smsubcategory']);
            },
          },
        ],
      });
      alert.then((res) => {
        res.present();
      });
    } else {
      this.router.navigate(['/smsubcategory']);
    }
  }

  transferImage() {
    var fileName = new Date().getTime() + '.png';
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    const fileURL = fileTransferDir + 'frame/' + fileName;

    fileTransfer.download(this.selectedFrame, fileURL).then(
      (entry) => {
        this.canvas = (<any>window)._canvas = new fabric.Canvas('myCanvas', {
          //preserveObjectStacking: true,
          selection: true,
          uniScaleTransform: true,
        });
        this.canvas.allowTouchScrolling = true;
        var widthssss =
          window.innerWidth > 0 ? window.innerWidth : screen.width;
        this.canvas.setWidth(widthssss);
        this.canvas.setHeight(widthssss);
        this.canvas.renderAll();

        this.myFrame = (window as any).Ionic.WebView.convertFileSrc(
          entry.nativeURL
        );
        fabric.Image.fromURL(this.myFrame, (img) => {
          img.set({
            left: 0,
            top: 0,
            selectable: false,
          });
          img.scaleToHeight(widthssss);
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

        //

        fabric.Canvas.prototype.customiseControls({
          br: {
            action: 'scale',
            cursor: 'no-drop',
          },
          tl: {
            action: 'remove',
            cursor: 'pointer',
          },

          mtr: {
            action: 'rotate',
            cursor: 'pointer',
          },
        });

        fabric.Object.prototype.customiseCornerIcons(
          {
            tl: {
              icon: 'assets/close.svg',
              settings: {
                cornerBackgroundColor: 'transparent',
                cornerPadding: 25,
                cornerSize: 50,
              },
            },
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
      },
      (error) => {
        this.spinner = false;
        console.log('error>>>>>>>>>>>>>>>>>', JSON.stringify(error));
      }
    );
  }

  save() {
    this.spinner = true;
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
      this.spinner = false;
    });
  }

  addImage() {
    // this.isOpacity = false;
    // fabric.Image.fromURL('assets/test.jpeg', (img) => {
    // 	img.set({
    // 		left: 110,
    // 		top: 200,
    // 		selectable: true,
    // 		scaleX: 100,
    // 		scaleY: 100,
    // 		fill: 'transparent'
    // 	});
    // 	img.scaleToHeight(200);
    // 	img.scaleToWidth(250);

    // 	this.canvas.add(img);
    // });

    // console.log("canvas item", this.canvas.item(1));

    // return;

    this.actionSheet = this.actionSheetCtrl.create({
      backdropDismiss: false,
      buttons: [
        {
          text: 'Take photo',
          role: 'destructive',
          icon: 'ios-camera-outline',
          handler: () => {
            this.cameraPhoto(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: 'Choose photo from Gallery',
          icon: 'ios-images-outline',
          handler: () => {
            this.cameraPhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: 'Cancel',
          icon: 'ios-close-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    this.actionSheet.then((res) => {
      res.present();
    });
  }

  cameraPhoto(sourceTp: any) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceTp,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        //this.myImage = 'data:image/jpeg;base64,' + imageData;
        fabric.Image.fromURL(
          (window as any).Ionic.WebView.convertFileSrc(imageData),
          (img) => {
            img.set({
              left: 110,
              top: 200,
              selectable: true,
              scaleX: 100,
              scaleY: 100,
            });
            img.scaleToHeight(200);
            img.scaleToWidth(250);
            this.canvas.add(img);
          }
        );

        this.canvas.renderAll();
      },
      (err) => {}
    );
  }

  addFilter(index) {
    this.isOpacity = false;
    this.tmpImg.filters = [];

    if (index == 0) {
      this.tmpImg.applyFilters();
      this.canvas.renderAll();
      return;
    }
    if (index >= 8) {
      var filter = new fabric.Image.filters[this.filterArray[index]]();
    } else {
      var filter = new fabric.Image.filters.BlendColor({
        color: '#ffffff',
        mode: this.filterArray[index],
        alpha: 0.1,
      });
    }

    this.tmpImg.filters.push(filter);
    this.tmpImg.applyFilters();
    this.canvas.renderAll();
  }

  opacityClick() {
    this.isOpacity = !this.isOpacity;
  }

  setOpicity() {
    var myObject = this.canvas.getActiveObject();

    if (this.canvas.getActiveObject()) {
      myObject.opacity =
        this.opacityModel != 10 ? '0.' + this.opacityModel : this.opacityModel;
      this.canvas.renderAll();
    } else {
      this.comman.show('Kindly select image to set opacity');
    }
  }

  unLockObject() {
    var myObject = this.canvas.getActiveObject();
    if (myObject) {
      myObject.lockMovementY = false;
      myObject.lockMovementX = false;
      myObject.lockRotation = false;
      myObject.lockScalingX = false;
      myObject.lockScalingY = false;

      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    } else {
      this.comman.show('Kindly select object to unlock');
    }
  }

  lockObject() {
    var myObject = this.canvas.getActiveObject();
    if (myObject) {
      myObject.lockMovementY = true;
      myObject.lockMovementX = true;
      myObject.lockRotation = true;
      myObject.lockScalingX = true;
      myObject.lockScalingY = true;

      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    } else {
      this.comman.show('Kindly select object to lock');
    }
  }

  setAsBack() {
    this.isOpacity = false;
    var myObject = this.canvas.getActiveObject();

    if (this.canvas.getActiveObject()) {
      if (this.isFront) {
        this.canvas.sendToBack(myObject);
      } else {
        this.canvas.bringToFront(myObject);
      }
      this.isFront = !this.isFront;
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    } else {
      if (this.isFront) this.comman.show('Kindly select image to send back');
      else this.comman.show('Kindly select image to send front');
      return;
    }
  }

  removeObject() {
    this.isOpacity = false;
    if (this.canvas.getActiveObject()) {
      this.canvas.remove(this.canvas.getActiveObject());
    } else {
      this.comman.show('Kindly select object to delete');
    }
  }

  addTextOption() {
    this.isAddedText = !this.isAddedText;
    this.isOpacity = false;
  }

  isEmojiOption() {
    this.isAddedEmoji = !this.isAddedEmoji;
    this.isOpacity = false;
  }

  isEffectOption() {
    this.isAddedEffect = !this.isAddedEffect;
    this.isOpacity = false;
  }

  isStickerOption() {
    this.isAddedSticker = !this.isAddedSticker;
    this.isOpacity = false;
  }

  isFilterOption() {
    this.isAddedFilter = !this.isAddedFilter;
    this.isOpacity = false;
  }

  addEffect(effect) {
    this.isOpacity = false;
    var fileName = new Date().getTime() + '.png';
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    const fileURL = fileTransferDir + 'frame/' + fileName;

    fileTransfer.download(effect, fileURL).then(
      (entry) => {
        var tempSticker = (window as any).Ionic.WebView.convertFileSrc(
          entry.nativeURL
        );
        fabric.Image.fromURL(tempSticker, (img) => {
          img.set({
            left: 0,
            top: 0,
            selectable: true,
          });
          img.scaleToHeight(200);
          img.scaleToWidth(200);
          this.canvas.add(img);
          this.canvas.renderAll();
        });

        this.file
          .removeFile(fileTransferDir + 'frame/', fileName)
          .then(() => {})
          .catch((e) => console.log('delete', JSON.stringify(e)));
      },
      (error) => {
        this.spinner = false;
        console.log('error>>>>>>>>>>>>>>>>>', JSON.stringify(error));
      }
    );
  }

  addSticker(sticker) {
    this.isOpacity = false;
    var fileName = new Date().getTime() + '.png';
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    const fileURL = fileTransferDir + 'frame/' + fileName;

    fileTransfer.download(sticker, fileURL).then(
      (entry) => {
        var tempSticker = (window as any).Ionic.WebView.convertFileSrc(
          entry.nativeURL
        );
        fabric.Image.fromURL(tempSticker, (img) => {
          img.set({
            left: 100,
            top: 200,
            selectable: true,
          });
          img.scaleToHeight(100);
          img.scaleToWidth(100);
          this.canvas.add(img);
          this.canvas.renderAll();
        });

        this.file
          .removeFile(fileTransferDir + 'frame/', fileName)
          .then(() => {})
          .catch((e) => console.log('delete', JSON.stringify(e)));
      },
      (error) => {
        this.spinner = false;
        console.log('error>>>>>>>>>>>>>>>>>', JSON.stringify(error));
      }
    );
  }

  addEmoji(emoji) {
    this.isOpacity = false;
    fabric.Image.fromURL(emoji, (img) => {
      img.set({
        left: 100,
        top: 200,
        selectable: true,
      });
      img.scaleToHeight(80);
      img.scaleToWidth(80);
      this.canvas.add(img);
      this.canvas.renderAll();
    });
  }

  addText() {
    this.isOpacity = false;
    var text = new fabric.IText('Tap and Type', {
      left: 50,
      top: 50,
      fontFamily: 'arial black',
      fill: '#FF00FF',
      fontSize: 50,
      lineHeight: 12,
    });

    this.canvas.add(text);

    this.canvas.renderAll();
  }

  addFont() {
    this.isOpacity = false;
    if (this.canvas.getActiveObject()) {
      this.canvas
        .getActiveObject()
        .set('fontFamily', this.fontFamilyArray[this.fontFamilyCount]);
      this.canvas.requestRenderAll();
      this.canvas.renderAll();
    } else {
      this.comman.show('Kindly select text or add text!');
      return;
    }
    if (this.fontFamilyArray.length - 1 == this.fontFamilyCount) {
      this.fontFamilyCount = 0;
    } else {
      this.fontFamilyCount += 1;
    }
  }

  addColor() {
    this.isOpacity = false;
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
      this.comman.show('Kindly select text or add text!');
    }
  }

  addStyle() {
    this.isOpacity = false;
    if (this.canvas.getActiveObject()) {
      if (this.fontStyleCount == 3) {
        this.fontStyleCount = 0;
        this.canvas
          .getActiveObject()
          .set('fontStyle', this.fontStyle[this.fontStyleCount]);
        this.canvas.renderAll();
        this.fontStyleCount += 1;
        return;
      }
      this.canvas
        .getActiveObject()
        .set('fontStyle', this.fontStyle[this.fontStyleCount]);
      this.canvas.renderAll();
      this.fontStyleCount += 1;
    } else {
      this.comman.show('Kindly select text or add text!');
    }
  }

  download() {
    this.downloadspinner = true;

    var fileName = 'StatusMaker' + new Date().getTime() + '.png';
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

  shareVia(shareVia) {
    if (shareVia == 'wp') {
      this.comman.shareWhatsapp(this.img);
    } else if (shareVia == 'share') {
      this.comman.shareAll(this.img);
    }
  }

  ngOnInit() {}
}
