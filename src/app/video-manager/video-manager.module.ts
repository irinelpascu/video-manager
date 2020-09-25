import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoManagerComponent } from './containers/video-manager/video-manager.component';
import { VideoManagerRoutingModule } from './video-manager-routing.module';
import { MatCardModule } from '@angular/material/card';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VideoPageComponent } from './containers/video-page/video-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { videosEffects } from './store/effects';
import { videosReducers } from './store/reducers';
import { MomentModule } from 'ngx-moment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [VideoManagerComponent, VideoItemComponent, VideoPageComponent],
  imports: [
    CommonModule,
    VideoManagerRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature('videos', videosReducers),
    EffectsModule.forFeature(videosEffects),
    MomentModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ]
})
export class VideoManagerModule { }
