import {Action} from '@ngrx/store';
import {AddFilmSaved, AppActions, FILM_ACTIONS} from './app.actions';
import {LocStorageService} from '../services/loc-storage.service';

const initialState = {
  saved: {
    currentFilms: [],
    totalCount: 0,
    currentPage: 0
  }
}
export function appReducer(state = initialState, action: AppActions) {
  switch (action.type) {
    case FILM_ACTIONS.ADD_FILM_SAVED:
      return {
        ...state,
        saved: {
          ...state.saved,
          currentFilms: state.saved.currentFilms.slice().push(action.payload),
          totalCount: state.saved.totalCount + 1
        }
      }
      break;
    case FILM_ACTIONS.LOAD_SAVED_FILMS:
      return {
        ...state,
        saved: {
          currentFilms: action.payload,
          totalCount: action.payload.length,
          currentPage: 1
        }
      }
    default:
      return state;
  }
}
