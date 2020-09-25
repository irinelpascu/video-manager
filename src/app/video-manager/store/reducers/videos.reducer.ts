import {
  CHANGE_SORT,
  CREATE_VIDEO_SUCCESS,
  DELETE_VIDEO_SUCCESS,
  GET_AUTHORS_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  SEARCH,
  UPDATE_VIDEO_SUCCESS,
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
  sortKey: string;
  sortDir: string;
  searchTerm: string;
}

const videosInitialState: VideosState = {
  authors: null,
  categories: null,
  videos: null,
  sortKey: null,
  sortDir: null,
  searchTerm: null,
};

export function videosReducer(state = videosInitialState, action: VideosAction): VideosState {
  switch (action.type) {
    case GET_AUTHORS_SUCCESS: {
      return {
        ...state,
        authors: action.payload,
        videos: extractVideosFromAuthors(action.payload, state.categories)
      };
    }
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.payload
      };
    }
    case DELETE_VIDEO_SUCCESS: {
      return {
        ...state,
        authors: state.authors.map(author => author.id === action.payload.id ? action.payload : author),
        videos: state.videos.filter(video => video.id !== action.videoId || video.authorId !== action.payload.id)
      };
    }
    case CREATE_VIDEO_SUCCESS:
    case UPDATE_VIDEO_SUCCESS: {
      const authors: Author[] = state.authors.map(author => author.id === action.payload.id ? action.payload : author);
      const videos: VideoUI[] = extractVideosFromAuthors(authors, state.categories);
      return {
        ...state,
        authors,
        videos
      };
    }
    case CHANGE_SORT: {
      return {
        ...state,
        sortDir: state.sortKey !== action.key ? 'DESC' : state.sortDir === 'ASC' ? 'DESC' : 'ASC',
        sortKey: action.key
      };
    }
    case SEARCH: {
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    }
  }
  return state;
}

export const getAuthors = (state: VideosState) => state.authors;
export const getCategories = (state: VideosState) => state.categories;
export const getVideos = (state: VideosState) => state.videos;
export const getSortKey = (state: VideosState) => state.sortKey;
export const getSortDir = (state: VideosState) => state.sortDir;
export const getSearchTerm = (state: VideosState) => state.searchTerm;

const extractVideosFromAuthors = (authors: Author[], categories: Category[]): VideoUI[] => {
  const categoriesObj = categories.reduce((acc: any, crt: Category) => {
    acc[crt.id] = crt.name;
    return acc;
  }, {});
  return authors.reduce((acc: VideoUI[], crt: Author) => {
    acc.push(
      ...crt.videos.map((video: Video) => ({
        ...video,
        categories: video.catIds.map(id => categoriesObj[id]).join(', '),
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
