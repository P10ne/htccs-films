import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocStorageService {
  static LSKeys = {
    viewed: 'viewed',
    favorites: 'favorites'
  }

  private currentViewedFilms: IFilmDataShort[] = JSON.parse(localStorage.getItem(LocStorageService.LSKeys.viewed) || '[]');
  private currentFavoritesFilms: IFilmDataShort[] = JSON.parse(localStorage.getItem(LocStorageService.LSKeys.favorites) || '[]');

  getCurrentViewedFilms() {
    return this.updateCurrentViewedFilms();
  }

  updateCurrentViewedFilms() {
    this.currentViewedFilms = JSON.parse(localStorage.getItem(LocStorageService.LSKeys.viewed) || '[]');
    return this.currentViewedFilms;
  }

  updateCurrentFavoritesFilms() {
    this.currentFavoritesFilms = JSON.parse(localStorage.getItem(LocStorageService.LSKeys.favorites) || '[]');
    return this.currentFavoritesFilms;
  }

  getCurrentFavoritesFilms() {
    return this.updateCurrentFavoritesFilms();
  }

  hasViewedFilms() {
    return this.currentViewedFilms.length > 0;
  }

  hasFavoritesFilms() {
    return this.currentFavoritesFilms.length > 0;
  }

  existInViewed(film: IFilmDataShort): boolean {
    return this.currentViewedFilms.find((item) => item.imdbId === film.imdbId) ?
      true : false;
  }

  existInFavorites(film: IFilmDataShort): boolean {
    return this.currentFavoritesFilms.find((item) => item.imdbId === film.imdbId) ?
      true : false;
  }

  addToViewed(film: IFilmDataShort): void {
    if (!this.existInViewed(film)) {
      const newViewedFilms: object[] = this.currentViewedFilms;
      newViewedFilms.push(film);
      localStorage.setItem(LocStorageService.LSKeys.viewed, JSON.stringify(newViewedFilms));
      this.currentViewedFilms.push(film);
      console.log(`${JSON.stringify(JSON.stringify(film))} добавлен в просмотренные`);
    } else {
      console.error('Фильм уже есть в просмотренных');
    }
  }

  addToFavorites(film: IFilmDataShort): void {
    if (!this.existInFavorites(film)) {
      const newFavoritesFilms: IFilmDataShort[] = this.currentFavoritesFilms;
      newFavoritesFilms.push(film);
      localStorage.setItem(LocStorageService.LSKeys.favorites, JSON.stringify(newFavoritesFilms));
      this.currentFavoritesFilms.push(film);
      console.log(`${JSON.stringify(JSON.stringify(film))} добавлен в избранное`);
    } else {
      console.error('Фильм уже есть в просмотренных');
    }
  }

  deleteFromViewed(film: IFilmDataShort): void {
    const toDeleteIndex = this.currentViewedFilms.findIndex((item) => item.imdbId === film.imdbId);
    this.currentViewedFilms.splice(toDeleteIndex, 1);
    localStorage.setItem(LocStorageService.LSKeys.viewed, JSON.stringify(this.currentViewedFilms));
  }

  deleteFromFavorites(film: IFilmDataShort): void {
    const toDeleteIndex = this.currentFavoritesFilms.findIndex((item) => item.imdbId === film.imdbId);
    this.currentFavoritesFilms.splice(toDeleteIndex, 1);
    localStorage.setItem(LocStorageService.LSKeys.favorites, JSON.stringify(this.currentFavoritesFilms));
  }
}
