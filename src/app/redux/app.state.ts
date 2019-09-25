import {IFilmDataShort} from '../Interfaces/IFilmDataShort.interface';

export interface AppState {
    saved: IFilmCategory;
    viewed: IFilmCategory;
    search: {
      query: string;
      totalResults: number;
      currentPage: number;
      pageResults: IFilmDataShort[];
    };
}

export interface IFilmCategory {
  films: IFilmDataShort[];
  totalCount: number;
  currentPage: number;
}

export enum CategoryFields {
  saved = 'saved',
  viewed = 'viewed'
}
