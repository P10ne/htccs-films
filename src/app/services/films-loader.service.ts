import { Injectable } from '@angular/core';
import {AppConfig} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class FilmsLoaderService {
  static plotType = {
    short: 'short',
    full: 'full'
  }
  url = `http://www.omdbapi.com/?apikey=${AppConfig.imdbKey}`;
  constructor() { }

  getFilmsBySearch(title: string, page: number = 1): any {
    const url = `${this.url}&s=${title}&page=${page}`;
    return fetch(url);
  }

  getFilmById(id: string, plot = FilmsLoaderService.plotType.short): any {
    const url = `${this.url}&i=${id}&plot=${plot}`;
    return fetch(url);
  }
}
