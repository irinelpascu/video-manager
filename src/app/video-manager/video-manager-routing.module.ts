import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { VideoManagerComponent } from './containers/video-manager/video-manager.component';
import { VideoPageComponent } from './containers/video-page/video-page.component';
import { LoadDataGuard } from './guards/load-data.guard';

const routes: Routes = [
  {
    path: '',
    component: VideoManagerComponent,
    canActivate: [LoadDataGuard],
  },
  {
    path: 'edit/:authorId/:videoId',
    component: VideoPageComponent,
    canActivate: [LoadDataGuard],
  },
  {
    path: 'new',
    component: VideoPageComponent,
    canActivate: [LoadDataGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoManagerRoutingModule {
}
