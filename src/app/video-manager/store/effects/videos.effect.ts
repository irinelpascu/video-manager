import { Injectable } from '@angular/core';
import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';
import {
  GET_AUTHOR,
  GET_AUTHORS,
  GET_CATEGORIES,
  GetAuthor,
  GetAuthorFail,
  GetAuthors,
  GetAuthorsFail,
  GetAuthorsSuccess,
  GetAuthorSuccess,
  GetCategories,
  GetCategoriesFail,
  GetCategoriesSuccess,
  UPDATE_VIDEO,
  UpdateVideo,
  UpdateVideoFail,
  UpdateVideoSuccess,
} from '../actions';
import {
  Observable,
  of
} from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { VideosService } from '../services';
import {
  select,
  Store
} from '@ngrx/store';
import { VideosModuleState } from '../reducers';
import { getAuthors } from '../selectors';
import {
  Author,
  Video
} from '../models';

@Injectable()
export class VideosEffect {
  constructor(private actions: Actions, private service: VideosService, private store$: Store<VideosModuleState>) {
  }

  @Effect()
  getAuthors$: Observable<any> = this.actions.pipe(
    ofType(GET_AUTHORS),
    switchMap((action: GetAuthors) => this.service.getAuthors()
      .pipe(
        map(videos => new GetAuthorsSuccess(videos)),
        catchError(err => of(new GetAuthorsFail(err)))
      )
    )
  );

  @Effect()
  getAuthor$: Observable<any> = this.actions.pipe(
    ofType(GET_AUTHOR),
    switchMap((action: GetAuthor) => this.service.getAuthor(action.authorId)
      .pipe(
        map(author => new GetAuthorSuccess(author)),
        catchError(err => of(new GetAuthorFail(err)))
      )
    )
  );

  @Effect()
  updateVideo$: Observable<any> = this.actions.pipe(
    ofType(UPDATE_VIDEO),
    withLatestFrom(this.store$.pipe(select(getAuthors))),
    map(([action, authors]: [UpdateVideo, Author[]]) => {
      let author = authors.find(author => author.id === action.authorId);
      if (author) {
        author = {
          ...author,
          videos: action.video.id
            ? author.videos.map(video => video.id === action.video.id ? action.video : video)
            : [...author.videos, {...action.video, id: this.generateVideoId(author)}]
        };
      }
      return author;
    }),
    switchMap((author: Author) => this.service.updateAuthor(author)
      .pipe(
        map(author => new UpdateVideoSuccess(author)),
        catchError(err => of(new UpdateVideoFail(err)))
      )
    )
  );

  @Effect()
  getCategories$: Observable<any> = this.actions.pipe(
    ofType(GET_CATEGORIES),
    switchMap((action: GetCategories) => this.service.getCategories()
      .pipe(
        map(categories => new GetCategoriesSuccess(categories)),
        catchError(err => of(new GetCategoriesFail(err)))
      )
    )
  );

  private generateVideoId(author: Author): number {
    return author.videos.reduce((acc: number, crt: Video) => {
      return Math.max(acc, crt.id) + 1;
    }, 0);
  }
}
