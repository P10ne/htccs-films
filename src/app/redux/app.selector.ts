import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app.state';
import {AppConfigService} from '../services/app.config.service';

export const selectFilmsForPage = () =>
  createSelector(
    // @ts-ignore
    (state: AppState, props) => state.Films[props.category],
    (films, props) => {
      return {
        films: films.films.slice(
                              (films.currentPage - 1) * AppConfigService.newsOnPage,
                              (films.currentPage) * AppConfigService.newsOnPage),
        totalCount: films.films.length,
        currentPage: films.currentPage
      };
    }
)

export const selectExistInCategory = () =>
  createSelector(
    // @ts-ignore
    (state: AppState, props) => state.Films[props.category],
    (categoryField, props) => categoryField.films.find((item) => item.imdbId === props.searchImdbId)
)

export const selectFilmsSearchPage = () =>
  createSelector(
    // @ts-ignore
    (state: AppState) => state.Films,
    (films) => films.search
)
