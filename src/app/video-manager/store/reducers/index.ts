import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

import * as fromVideos from './videos.reducer';

export interface VideosModuleState {
  videos: fromVideos.VideosState;
}

export const videosReducers: ActionReducerMap<VideosModuleState> = {
  videos: fromVideos.videosReducer
};


export const getVideosModuleState: MemoizedSelector<any, VideosModuleState> = createFeatureSelector(
  'videos'
);
