import {Action, createAction, props} from '@ngrx/store';
import {IFilmDataShort, IFilmDataShortActionProps} from '../Interfaces/IFilmDataShort.interface';
import {CategoryFields} from './app.state';

export enum FilmActionNames {
  UpdateFilmList = '[Films Item Component] UpdateFilmList',
  UpdateCategoryPage = '[Films Page Component] UpdateCategoryPage',
  ClearFilmsPage = '[Films Page Component] ClearFilmsPage',
  UpdateMainPage = '[Main Page Component] UpdateMainPage'
}

export const UpdateFilmsAction = createAction(
  FilmActionNames.UpdateFilmList,
  props<{films: IFilmDataShort[], category: CategoryFields}>()
)

export const ClearFilmsAction = createAction(
  FilmActionNames.ClearFilmsPage,
  props<{category: CategoryFields}>()
)

export const UpdateCategoryPageAction = createAction(
  FilmActionNames.UpdateCategoryPage,
  props<{page: number, category: CategoryFields}>()
)

export const UpdateMainPageAction = createAction(
  FilmActionNames.UpdateMainPage,
  props<{pageResults: IFilmDataShort[], currentPage: number, totalResultsCount: number, query: string}>()
)
