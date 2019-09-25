import { createReducer, on } from '@ngrx/store';
import {UpdateCategoryPageAction, UpdateFilmsAction} from './app.actions';
import {IFilmDataShort} from '../Interfaces/IFilmDataShort.interface';
import {AppState} from './app.state';

export const initialState: AppState = {
    saved: {
      films: [],
      totalCount: 0,
      currentPage: 1
    },
    viewed: {
      films: [],
      totalCount: 0,
      currentPage: 1
    },
    search: {
      query: '',
      totalResults: 0,
      currentPage: 1,
      pageResults: []
    }
}

const _appReducer = createReducer(initialState,
  on(UpdateFilmsAction, (state, {category, films}) => {
    return {
        ...state,
        [category]: {
          ...state[category],
          films,
          totalCount: films.length
        }
    };
  }),
  on(UpdateCategoryPageAction, (state, {page, category}) => {
    return {
      ...state,
      [category]: {
        ...state[category],
        currentPage: page
      }
    };
  })
);

export function appReducer(state, action) {
  return _appReducer(state, action);
}
