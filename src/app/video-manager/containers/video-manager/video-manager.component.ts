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
import {
  getSortDir,
  getSortedVideos,
  getSortKey
} from '../../store/selectors';
import {
  ChangeSort,
  DeleteVideo
} from '../../store/actions';

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.scss']
})
export class VideoManagerComponent implements OnInit {

  videos$: Observable<VideoUI[]>;
  sortKey$: Observable<string>;
  sortDir$: Observable<string>;

  constructor(private store$: Store<VideosModuleState>) {
  }

  ngOnInit(): void {
    this.videos$ = this.store$.pipe(select(getSortedVideos));
    this.sortKey$ = this.store$.pipe(select(getSortKey));
    this.sortDir$ = this.store$.pipe(select(getSortDir));
  }

  onDelete(authorId: number, videoId: number) {
    this.store$.dispatch(new DeleteVideo(authorId, videoId));
  }

  changeSort(key: string) {
    this.store$.dispatch(new ChangeSort(key));
  }
}
