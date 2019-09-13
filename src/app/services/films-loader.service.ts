import { Injectable } from '@angular/core';
import {AppConfigService} from './app.config.service';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsLoaderService {
  url = `http://www.omdbapi.com/?apikey=${this.config.imdbKey}`;
  constructor(private http: HttpClient, private config: AppConfigService) { }

  getFilmsBySearch(title: string, page: number = 1): Observable<any> {
    const url = `${this.url}&s=${title}&page=${page}`;
    return this.http.get(url)
      .pipe(map((data: any) => {
        if (data.Error) { throw new Error(data.Error); }
        return {
          data: data.Search.map((item: any) => {
            return {
              imdbId: item.imdbID,
              title: item.Title,
              year: item.Year
            };
          }),
          totalResults: data.totalResults
        };
      }),
        catchError(error => {
          return throwError(error);
        }));
  }

  getFilmById(id: string, plot = PlotTypeEnum.Short): Observable<IFilmDataFull> {
    const url = `${this.url}&i=${id}&plot=${plot}`;
    return this.http.get(url)
      .pipe(map((data: any) => {
        if (data.Error) { throw new Error(data.Error); }
        return {
          imdbId: data.imdbID,
          title: data.Title,
          year: data.Year,
          poster: data.Poster,
          plot: data.Plot,
          actors: data.Actors,
          rating: data.imdbRating,
          genre: data.Genre
        };
      }));
  }
}
