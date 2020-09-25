import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  select,
  Store
} from '@ngrx/store';
import { VideosModuleState } from '../../store/reducers';
import {
  Observable,
  Subject
} from 'rxjs';
import { VideoUI } from '../../store/models';
import {
  getSortDir,
  getSortedVideos,
  getSortKey
} from '../../store/selectors';
import {
  ChangeSort,
  DeleteVideo,
  Search
} from '../../store/actions';
import {
  FormBuilder,
  FormControl
} from '@angular/forms';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.scss']
})
export class VideoManagerComponent implements OnInit, OnDestroy {

  videos$: Observable<VideoUI[]>;
  sortKey$: Observable<string>;
  sortDir$: Observable<string>;

  destroy$: Subject<void> = new Subject<void>();

  searchFormControl: FormControl;

  constructor(private store$: Store<VideosModuleState>, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.videos$ = this.store$.pipe(select(getSortedVideos));
    this.sortKey$ = this.store$.pipe(select(getSortKey));
    this.sortDir$ = this.store$.pipe(select(getSortDir));

    this.searchFormControl = this.fb.control('');
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe((searchTerm: string) => {
        this.store$.dispatch(new Search(searchTerm));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onDelete(authorId: number, videoId: number) {
    this.store$.dispatch(new DeleteVideo(authorId, videoId));
  }

  changeSort(key: string) {
    this.store$.dispatch(new ChangeSort(key));
  }
}
