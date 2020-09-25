export interface Category {
  id: number;
  name: string;
}

export interface Format {
  res: string;
  size: number;
}

export interface Video {
  id?: number;
  catIds: number[];
  name: string;
  formats: { [key: string]: Format };
  releaseDate: string;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface VideoUI {
  id?: number;
  catIds: number[];
  name: string;
  formats: { [key: string]: Format };
  releaseDate: string;
  author: string;
  authorId: number;
  bestFormat: string;
}
