import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';

import { CommanService } from './service/comman.service';
import { AdsService } from './service/ads.service';

import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { File } from '@ionic-native/file/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    CommanService,
    AdMobFree,
    AdsService,
    FileTransfer,
    File,
    SocialSharing,
    VideoEditor,
    Camera,
    Clipboard,
    Market,
    Network,
    AppVersion,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
