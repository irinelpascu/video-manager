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

export const CREATE_VIDEO = '[Videos] Create Video';
export const CREATE_VIDEO_SUCCESS = '[Videos] Create Video Success';
export const CREATE_VIDEO_FAIL = '[Videos] Create Video Fail';

export class CreateVideo implements Action {
  readonly type = CREATE_VIDEO;

  constructor(public authorId: number, public video: Video) {
  }
}

export class CreateVideoSuccess implements Action {
  readonly type = CREATE_VIDEO_SUCCESS;

  constructor(public payload: Author) {
  }
}

export class CreateVideoFail implements Action {
  readonly type = CREATE_VIDEO_FAIL;

  constructor(public error: any) {
  }
}

export const DELETE_VIDEO = '[Videos] Delete Video';
export const DELETE_VIDEO_SUCCESS = '[Videos] Delete Video Success';
export const DELETE_VIDEO_FAIL = '[Videos] Delete Video Fail';

export class DeleteVideo implements Action {
  readonly type = DELETE_VIDEO;

  constructor(public authorId: number, public videoId: number, public forced = false) {
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

export const CHANGE_SORT = '[Videos] Change Sort';

export class ChangeSort implements Action {
  readonly type = CHANGE_SORT;

  constructor(public key: string) {
  }
}

export const SEARCH = '[Videos] Search';

export class Search implements Action {
  readonly type = SEARCH;

  constructor(public searchTerm: string) {
  }
}

export type VideosAction =
  | GetAuthors
  | GetAuthorsSuccess
  | GetAuthorsFail
  | CreateVideo
  | CreateVideoSuccess
  | CreateVideoFail
  | DeleteVideo
  | DeleteVideoSuccess
  | DeleteVideoFail
  | UpdateVideo
  | UpdateVideoSuccess
  | UpdateVideoFail
  | GetCategories
  | GetCategoriesSuccess
  | GetCategoriesFail
  | ChangeSort
  | Search;
