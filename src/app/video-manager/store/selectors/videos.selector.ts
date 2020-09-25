import {
  createSelector,
  MemoizedSelector,
  MemoizedSelectorWithProps
} from '@ngrx/store';
import * as fromReducer from '../reducers/videos.reducer';
import { VideosState } from '../reducers/videos.reducer';
import {
  getVideosModuleState,
  VideosModuleState
} from '../reducers';
import {
  Author,
  Category,
  VideoUI
} from '../models';

const getVideosState: MemoizedSelector<VideosModuleState, VideosState> = createSelector(
  getVideosModuleState,
  (state: VideosModuleState) => state.videos
);

export const getAuthors: MemoizedSelector<VideosModuleState, Author[]> = createSelector(
  getVideosState,
  fromReducer.getAuthors
);

export const getAuthor: MemoizedSelectorWithProps<VideosModuleState, { authorId: number }, Author> = createSelector(
  getAuthors,
  (authors: Author[], {authorId}) => authors.find(author => author.id === authorId)
);

export const getCategories: MemoizedSelector<VideosModuleState, Category[]> = createSelector(
  getVideosState,
  fromReducer.getCategories
);

export const getVideos: MemoizedSelector<VideosModuleState, VideoUI[]> = createSelector(
  getVideosState,
  fromReducer.getVideos
);

export const getVideo: MemoizedSelectorWithProps<VideosModuleState, { authorId: number, videoId: number }, VideoUI> = createSelector(
  getVideos,
  (videos: VideoUI[], {authorId, videoId}) =>
    videos.find(video => video.id === videoId && video.authorId === authorId)
);
