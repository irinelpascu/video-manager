import {
  GET_AUTHORS_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  VideosAction
} from '../actions';
import {
  Author,
  Category,
  Video,
  VideoUI
} from '../models';

export interface VideosState {
  authors: Author[];
  categories: Category[];
  videos: VideoUI[];
}

const videosInitialState: VideosState = {
  authors: null,
  categories: null,
  videos: null,
};

export function videosReducer(state = videosInitialState, action: VideosAction): VideosState {
  switch (action.type) {
    case GET_AUTHORS_SUCCESS: {
      return {
        ...state,
        authors: action.payload,
        videos: extractVideosFromAuthors(action.payload)
      };
    }
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.payload
      };
    }
  }
  return state;
}

export const getAuthors = (state: VideosState) => state.authors;
export const getCategories = (state: VideosState) => state.categories;
export const getVideos = (state: VideosState) => state.videos;

const extractVideosFromAuthors = (authors: Author[]): VideoUI[] => {
  return authors.reduce((acc: VideoUI[], crt: Author) => {
    acc.push(
      ...crt.videos.map((video: Video) => ({
        ...video,
        author: crt.name,
        authorId: crt.id,
        bestFormat: extractVideoBestFormat(video)
      }))
    );
    return acc;
  }, []);
};

const extractVideoBestFormat = (video: Video): string => {
  const keys = Object.keys(video.formats);
  let bestFormat = '0p';

  for (let key of keys) {
    if (parseInt(video.formats[key].res) > parseInt(bestFormat)) {
      bestFormat = video.formats[key].res;
    }
  }
  return bestFormat;
};
