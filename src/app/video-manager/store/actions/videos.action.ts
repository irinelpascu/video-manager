import { Action } from '@ngrx/store';
import {
  Author,
  Category,
  Video
} from '../models';

export const GET_AUTHORS = '[Videos] Get Authors';
export const GET_AUTHORS_SUCCESS = '[Videos] Get Authors Success';
export const GET_AUTHORS_FAIL = '[Videos] Get Authors Fail';

export class GetAuthors implements Action {
  readonly type = GET_AUTHORS;

  constructor() {
  }
}

export class GetAuthorsSuccess implements Action {
  readonly type = GET_AUTHORS_SUCCESS;

  constructor(public payload: Author[]) {
  }
}

export class GetAuthorsFail implements Action {
  readonly type = GET_AUTHORS_FAIL;

  constructor(public error: any) {
  }
}

export const GET_AUTHOR = '[Videos] Get Author';
export const GET_AUTHOR_SUCCESS = '[Videos] Get Author Success';
export const GET_AUTHOR_FAIL = '[Videos] Get Author Fail';

export class GetAuthor implements Action {
  readonly type = GET_AUTHOR;

  constructor(public authorId: number) {
  }
}

export class GetAuthorSuccess implements Action {
  readonly type = GET_AUTHOR_SUCCESS;

  constructor(public author: Author) {
  }
}

export class GetAuthorFail implements Action {
  readonly type = GET_AUTHOR_FAIL;

  constructor(public error: any) {
  }
}

export const DELETE_VIDEO = '[Videos] Delete Video';
export const DELETE_VIDEO_SUCCESS = '[Videos] Delete Video Success';
export const DELETE_VIDEO_FAIL = '[Videos] Delete Video Fail';

export class DeleteVideo implements Action {
  readonly type = DELETE_VIDEO;

  constructor(public authorId: number, public videoId: number) {
  }
}

export class DeleteVideoSuccess implements Action {
  readonly type = DELETE_VIDEO_SUCCESS;

  constructor(public payload: Author, public videoId: number) {
  }
}

export class DeleteVideoFail implements Action {
  readonly type = DELETE_VIDEO_FAIL;

  constructor(public error: any) {
  }
}

export const UPDATE_VIDEO = '[Videos] Update Video';
export const UPDATE_VIDEO_SUCCESS = '[Videos] Update Video Success';
export const UPDATE_VIDEO_FAIL = '[Videos] Update Video Fail';

export class UpdateVideo implements Action {
  readonly type = UPDATE_VIDEO;

  constructor(public authorId: number, public video: Video) {
  }
}

export class UpdateVideoSuccess implements Action {
  readonly type = UPDATE_VIDEO_SUCCESS;

  constructor(public payload: Author) {
  }
}

export class UpdateVideoFail implements Action {
  readonly type = UPDATE_VIDEO_FAIL;

  constructor(public error: any) {
  }
}

export const GET_CATEGORIES = '[Videos] Get Categories';
export const GET_CATEGORIES_SUCCESS = '[Videos] Get Categories Success';
export const GET_CATEGORIES_FAIL = '[Videos] Get Categories Fail';

export class GetCategories implements Action {
  readonly type = GET_CATEGORIES;

  constructor() {
  }
}

export class GetCategoriesSuccess implements Action {
  readonly type = GET_CATEGORIES_SUCCESS;

  constructor(public payload: Category[]) {
  }
}

export class GetCategoriesFail implements Action {
  readonly type = GET_CATEGORIES_FAIL;

  constructor(public error: any) {
  }
}

export type VideosAction =
  | GetAuthors
  | GetAuthorsSuccess
  | GetAuthorsFail
  | GetAuthor
  | GetAuthorSuccess
  | GetAuthorFail
  | DeleteVideo
  | DeleteVideoSuccess
  | DeleteVideoFail
  | UpdateVideo
  | UpdateVideoSuccess
  | UpdateVideoFail
  | GetCategories
  | GetCategoriesSuccess
  | GetCategoriesFail;
