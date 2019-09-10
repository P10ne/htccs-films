import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilmsLoaderService {
  static plotType = {
    short: 'short',
    full: 'full'
  }
  url = 'http://www.omdbapi.com/?apikey=a2149e33';
  constructor() { }

  getFilmsByTitle(title: string): any {
    const url = `${this.url}&t=${title}`;
    return fetch(url);
  }

  getFilmById(id: string, plot = FilmsLoaderService.plotType.short): any {
    const url = `${this.url}&i=${id}&plot=${plot}`;
    return fetch(url);
  }
}
