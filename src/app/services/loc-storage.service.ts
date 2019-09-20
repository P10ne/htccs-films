import { Injectable } from '@angular/core';
import {LocStorageEnum} from '../enums/LocStorage.enum';
import {Store} from '@ngrx/store';
import {AppState} from '../redux/app.state';
import {LoadSavedFilms} from '../redux/app.actions';

class Category {
  key: string;
  data: IFilmDataShort[];
  constructor(key, data) {
    this.key = key;
    this.data = data;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocStorageService {

  constructor(private store: Store<AppState>) {}

  categories = {
    [LocStorageEnum.Viewed]: new Category(LocStorageEnum.Viewed, JSON.parse(localStorage.getItem(LocStorageEnum.Viewed) || '[]')),
    [LocStorageEnum.Favorites]: new Category(LocStorageEnum.Favorites, JSON.parse(localStorage.getItem(LocStorageEnum.Favorites) || '[]'))
  };

  getCurrentFilms(category: Category): IFilmDataShort[] {
    return this.updateFilms(category);
  }

  getCurrentFilmForPage(page, count, category): void {
    const films = this.updateFilms(category).slice((page - 1) * count, (page - 1) * count + count);
    this.store.dispatch(new LoadSavedFilms(films));
  }

  updateFilms(category: Category): IFilmDataShort[] {
    category.data = JSON.parse(localStorage.getItem(category.key) || '[]');
    return category.data;
  }

  exist(film: IFilmDataShort, category: Category): boolean {
    return category.data.find((item) => item.imdbId === film.imdbId) ?
      true : false;
  }

  addToCategory(film: IFilmDataShort, category: Category): void {
    if (!this.exist(film, category)) {
      this.getCurrentFilms(category).push(film);
      localStorage.setItem(category.key, JSON.stringify(category.data));
    } else {
      console.error('Фильм уже есть в просмотренных');
    }
  }

  deleteFromCategory(film: IFilmDataShort, category: Category): void {
    const toDeleteIndex = category.data.findIndex((item) => item.imdbId === film.imdbId);
    category.data.splice(toDeleteIndex, 1);
    localStorage.setItem(category.key, JSON.stringify(category.data));
  }
}
