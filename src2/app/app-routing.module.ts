import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/Home',
    pathMatch: 'full',
  },
  {
    path: 'home/:id',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'videocat',
    loadChildren: () =>
      import('./videocat/videocat.module').then((m) => m.VideocatPageModule),
  },
  {
    path: 'videolist',
    loadChildren: () =>
      import('./videolist/videolist.module').then((m) => m.VideolistPageModule),
  },
  {
    path: 'videoplay',
    loadChildren: () =>
      import('./videoplay/videoplay.module').then((m) => m.VideoplayPageModule),
  },
  {
    path: 'statussaver',
    loadChildren: () =>
      import('./statussaver/statussaver.module').then(
        (m) => m.StatussaverPageModule
      ),
  },
  {
    path: 'smcategory',
    loadChildren: () =>
      import('./smcategory/smcategory.module').then(
        (m) => m.SmcategoryPageModule
      ),
  },
  {
    path: 'smsubcategory',
    loadChildren: () =>
      import('./smsubcategory/smsubcategory.module').then(
        (m) => m.SmsubcategoryPageModule
      ),
  },
  {
    path: 'smcreate',
    loadChildren: () =>
      import('./smcreate/smcreate.module').then((m) => m.SmcreatePageModule),
  },
  {
    path: 'wallpaperlist',
    loadChildren: () =>
      import('./wallpaperlist/wallpaperlist.module').then(
        (m) => m.WallpaperlistPageModule
      ),
  },
  {
    path: 'wallpapermodal',
    loadChildren: () =>
      import('./wallpapermodal/wallpapermodal.module').then(
        (m) => m.WallpapermodalPageModule
      ),
  },
  {
    path: 'imagelist',
    loadChildren: () =>
      import('./imagelist/imagelist.module').then((m) => m.ImagelistPageModule),
  },
  {
    path: 'ringtone',
    loadChildren: () =>
      import('./ringtone/ringtone.module').then((m) => m.RingtonePageModule),
  },
  {
    path: 'imagemodal',
    loadChildren: () =>
      import('./imagemodal/imagemodal.module').then(
        (m) => m.ImagemodalPageModule
      ),
  },
  {
    path: 'textlist',
    loadChildren: () =>
      import('./textlist/textlist.module').then((m) => m.TextlistPageModule),
  },
  {
    path: 'textcreation',
    loadChildren: () => import('./textcreation/textcreation.module').then( m => m.TextcreationPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'gallerymodal',
    loadChildren: () => import('./gallerymodal/gallerymodal.module').then( m => m.GallerymodalPageModule)
  },
  {
    path: 'swipe-video',
    loadChildren: () => import('./swipe-video/swipe-video.module').then( m => m.SwipeVideoPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('./favorite/favorite.module').then( m => m.FavoritePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
