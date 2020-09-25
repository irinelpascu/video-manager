import {
  Component,
  OnInit
} from '@angular/core';
import {
  select,
  Store
} from '@ngrx/store';
import { VideosModuleState } from '../../store/reducers';
import { Observable } from 'rxjs';
import { VideoUI } from '../../store/models';
import { getVideos } from '../../store/selectors';
import { DeleteVideo } from '../../store/actions';

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.scss']
})
export class VideoManagerComponent implements OnInit {

  videos$: Observable<VideoUI[]>;

  constructor(private store$: Store<VideosModuleState>) {
  }

  ngOnInit(): void {
    this.videos$ = this.store$.pipe(select(getVideos));
  }

  onDelete(authorId: number, videoId: number) {
    this.store$.dispatch(new DeleteVideo(authorId, videoId));
  }
}
