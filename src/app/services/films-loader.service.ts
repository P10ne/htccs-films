import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilmsLoaderService {
  url = 'http://www.omdbapi.com/?apikey=a2149e33';
  constructor() { }

  getFilmsByTitle(title: string): any {
    const url = `${this.url}&t=${title}`;
    return fetch(url);
  }

  getFilmById(id: string): any {
    const url = `${this.url}&i=${id}`;
    return fetch(url);
  }
}
