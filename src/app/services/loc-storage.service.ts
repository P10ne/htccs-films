import { Injectable } from '@angular/core';
import {LocStorageEnum} from '../enums/LocStorage.enum';

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
  categories = {
    [LocStorageEnum.Viewed]: new Category(LocStorageEnum.Viewed, JSON.parse(localStorage.getItem(LocStorageEnum.Viewed) || '[]')),
    [LocStorageEnum.Favorites]: new Category(LocStorageEnum.Favorites, JSON.parse(localStorage.getItem(LocStorageEnum.Favorites) || '[]'))
  };

  getCurrentFilms(category: Category): IFilmDataShort[] {
    return this.updateFilms(category);
  }

  getCurrentFilmForPage(page, count, category): IFilmDataShort[] {
    return this.updateFilms(category).slice((page - 1) * count, (page - 1) * count + count);
  }

  updateFilms(category: Category): IFilmDataShort[] {
    category.data = JSON.parse(localStorage.getItem(category.key) || '[]');
    return category.data;
  }

  hasFilms(category: Category) {
    return category.data.length > 0;
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
