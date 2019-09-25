import {IFilmDataShort} from '../Interfaces/IFilmDataShort.interface';

export interface AppState {
    saved: IFilmCategory;
    viewed: IFilmCategory;
    search: ISearch;
}

export interface ISearch {
  query: string;
  totalResultsCount: number;
  currentPage: number;
  pageResults: IFilmDataShort[];
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
