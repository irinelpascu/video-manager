import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  select,
  Store
} from '@ngrx/store';
import { VideosModuleState } from '../../store/reducers';
import {
  Observable,
  Subject
} from 'rxjs';
import {
  filter,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import { UpdateVideo } from '../../store/actions';
import {
  Author,
  Category,
  VideoUI
} from '../../store/models';
import {
  getAuthors,
  getCategories,
  getVideo
} from '../../store/selectors';
import * as moment from 'moment';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit, OnDestroy {

  video$: Observable<VideoUI>;
  authors$: Observable<Author[]>;
  categories$: Observable<Category[]>;

  destroy$: Subject<void> = new Subject<void>();

  videoFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private store$: Store<VideosModuleState>, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.videoFormGroup = this.fb.group({
      id: this.fb.control(undefined),
      name: this.fb.control('', Validators.required),
      author: this.fb.control('', Validators.required),
      categories: this.fb.control([], Validators.required),
    });
    this.authors$ = this.store$.pipe(select(getAuthors));
    this.categories$ = this.store$.pipe(select(getCategories));
    this.video$ = this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          const authorId: number = parseInt(paramMap.get('authorId'));
          const videoId: number = parseInt(paramMap.get('videoId'));

          return this.store$.pipe(
            select(getVideo, {authorId, videoId})
          );
        })
      );
    this.video$
      .pipe(
        takeUntil(this.destroy$),
        filter(video => !!video)
      )
      .subscribe(video => this.videoFormGroup.patchValue({
        id: video.id,
        name: video.name,
        author: video.authorId,
        categories: video.catIds,
      }));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onSubmit() {
    const values = this.videoFormGroup.value;
    this.store$.dispatch(new UpdateVideo(
      values.author,
      {
        id: values.id,
        name: values.name,
        catIds: values.categories,
        releaseDate: moment(moment.now()).format('YYYY-MM-DD'),
        formats: {one: {res: '1080p', size: 1000}}
      }
    ));
  }
}
