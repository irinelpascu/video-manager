import { Injectable } from '@angular/core';
import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';
import {
  CREATE_VIDEO,
  CREATE_VIDEO_SUCCESS,
  CreateVideoFail,
  CreateVideoSuccess,
  DELETE_VIDEO,
  DeleteVideo,
  DeleteVideoFail,
  DeleteVideoSuccess,
  GET_AUTHORS,
  GET_CATEGORIES,
  GetAuthors,
  GetAuthorsFail,
  GetAuthorsSuccess,
  GetCategories,
  GetCategoriesFail,
  GetCategoriesSuccess,
  UPDATE_VIDEO,
  UPDATE_VIDEO_SUCCESS,
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
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { VideosService } from '../services';
import {
  select,
  Store
} from '@ngrx/store';
import { VideosModuleState } from '../reducers';
import {
  getAuthors,
  getVideos
} from '../selectors';
import {
  Author,
  VideoUI
} from '../models';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../../components/warning-dialog/warning-dialog.component';

@Injectable()
export class VideosEffect {
  constructor(
    private actions: Actions,
    private service: VideosService,
    private store$: Store<VideosModuleState>,
    private router: Router,
    private matDialog: MatDialog,
  ) {
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
  createVideo$: Observable<any> = this.actions.pipe(
    ofType(CREATE_VIDEO),
    withLatestFrom(this.store$.pipe(select(getAuthors)), this.store$.pipe(select(getVideos))),
    map(([action, authors, videos]: [UpdateVideo, Author[], VideoUI[]]) => {
      let author = authors.find(author => author.id === action.authorId);
      const id = Math.max(...videos.map(video => video.id)) + 1;

      if (author) {
        author = {
          ...author,
          videos: [...author.videos, {...action.video, id}]
        };
      }
      return author;
    }),
    switchMap((author: Author) => this.service.updateAuthor(author)
      .pipe(
        map(author => new CreateVideoSuccess(author)),
        catchError(err => of(new CreateVideoFail(err)))
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
        const hisVideo: boolean = author.videos.some(video => video.id === action.video.id);
        author = {
          ...author,
          videos: hisVideo
            ? author.videos.map(video => video.id === action.video.id ? action.video : video)
            : [...author.videos, action.video]
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

  @Effect({dispatch: false})
  goBack$: Observable<any> = this.actions.pipe(
    ofType(UPDATE_VIDEO_SUCCESS, CREATE_VIDEO_SUCCESS),
    tap(() => this.router.navigate(['/manage']))
  );

  @Effect()
  deleteVideo$: Observable<any> = this.actions.pipe(
    ofType(DELETE_VIDEO),
    switchMap((action: DeleteVideo) => {
      if (action.forced) {
        return of([true, action]);
      }
      return this.matDialog.open(WarningDialogComponent).afterClosed()
        .pipe(
          map(result => [result, action])
        );
    }),
    filter(([result]: [boolean, DeleteVideo]) => result),
    map(([, action]: [boolean, DeleteVideo]) => action),
    withLatestFrom(this.store$.pipe(select(getAuthors))),
    map(([action, authors]: [DeleteVideo, Author[]]) => {
      let author = authors.find(author => author.id === action.authorId);
      if (author) {
        author = {
          ...author,
          videos: author.videos.filter(video => video.id !== action.videoId)
        };
      }
      return [author, action.videoId];
    }),
    switchMap(([author, videoId]: [Author, number]) => this.service.updateAuthor(author)
      .pipe(
        map(author => new DeleteVideoSuccess(author, videoId)),
        catchError(err => of(new DeleteVideoFail(err)))
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
}
