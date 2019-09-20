import {Action} from '@ngrx/store';

export namespace FILM_ACTIONS {
  export const ADD_FILM_SAVED = 'ADD_FILM_SAVED';
  export const LOAD_SAVED_FILMS = 'LOAD_SAVED_FILMS';
}

export class AddFilmSaved implements Action {
  readonly type = FILM_ACTIONS.ADD_FILM_SAVED;
  constructor(public payload: IFilmDataShort) {}
}

export class LoadSavedFilms implements Action {
  readonly type = FILM_ACTIONS.LOAD_SAVED_FILMS;
  constructor(public payload: IFilmDataShort[]) {}
}

export type AppActions = AddFilmSaved | LoadSavedFilms;
