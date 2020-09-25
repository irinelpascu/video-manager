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
import * as moment from 'moment';

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

export const getSortKey: MemoizedSelector<VideosModuleState, string> = createSelector(
  getVideosState,
  fromReducer.getSortKey
);

export const getSortDir: MemoizedSelector<VideosModuleState, string> = createSelector(
  getVideosState,
  fromReducer.getSortDir
);

export const getSortedVideos: MemoizedSelector<VideosModuleState, VideoUI[]> = createSelector(
  getVideos,
  getSortDir,
  getSortKey,
  (videos: VideoUI[], sortDir: string, sortKey: string) => {
    if (!sortKey || !sortDir) {
      return videos;
    }
    return videos.concat().sort((a, b) => {
      switch (sortKey) {
        case 'bestFormat': {
          return (parseInt(a.bestFormat) - parseInt(b.bestFormat)) * (sortDir === 'DESC' ? -1 : 1);
        }
        case 'releaseDate': {
          return (moment(a.releaseDate, 'YYYY-MM-DD').diff(moment(b.releaseDate, 'YYYY-MM-DD'))) * (sortDir === 'DESC' ? -1 : 1);
        }
        default:
          return a[sortKey].localeCompare(b[sortKey]) * (sortDir === 'DESC' ? -1 : 1);
      }
    });
  }
);

export const getVideo: MemoizedSelectorWithProps<VideosModuleState, { authorId: number, videoId: number }, VideoUI> = createSelector(
  getVideos,
  (videos: VideoUI[], {authorId, videoId}) =>
    videos.find(video => video.id === videoId && video.authorId === authorId)
);
