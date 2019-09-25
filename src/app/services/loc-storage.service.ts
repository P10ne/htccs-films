import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IFilmDataShort} from '../Interfaces/IFilmDataShort.interface';
import {AppState, CategoryFields} from '../redux/app.state';
import {UpdateFilmsAction} from '../redux/app.actions';
import {AppConfigService} from './app.config.service';

@Injectable({
  providedIn: 'root'
})
export class LocStorageService {

  constructor(private store: Store<AppState>, private config: AppConfigService) {
    this.updateStateCategory(CategoryFields.saved);
    this.updateStateCategory(CategoryFields.viewed);
  }

  updateStateCategory(category: CategoryFields): void {
    const films: IFilmDataShort[] = this.getAllFilms(category);
    this.store.dispatch(UpdateFilmsAction({films: films, category: category}));
  }

  getAllFilms(category: CategoryFields): IFilmDataShort[] {
    return JSON.parse(localStorage.getItem(category));
  }

  addToCategory(film: IFilmDataShort, category: CategoryFields): void {
    const allFilms = this.getAllFilms(category);
    allFilms.push(film);
    localStorage.setItem(category, JSON.stringify(allFilms));
    this.updateStateCategory(category);
  }

  deleteFromCategory(film: IFilmDataShort, category: CategoryFields): void {
    const allFilms = this.getAllFilms(category);
    const toDeleteIndex = allFilms.findIndex((item) => item.imdbId === film.imdbId);
    allFilms.splice(toDeleteIndex, 1);
    localStorage.setItem(category, JSON.stringify(allFilms));
    this.updateStateCategory(category);
  }
}
