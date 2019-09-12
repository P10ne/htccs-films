import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {FilmsLoaderService} from '../../services/films-loader.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit {
  id: string;
  subscription: Subscription;
  filmData: IFilmDataFull;
  constructor(private activateRoute: ActivatedRoute,
              private filmsLoader: FilmsLoaderService,
              private location: Location) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    this.filmsLoader.getFilmById(this.id, FilmsLoaderService.plotType.full)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.filmData = this.getParsedSearchResult(result);
      });
  }

  getParsedSearchResult(dataJSON): IFilmDataFull {
    const dataJS = dataJSON;
    return {
      imdbId: dataJS.imdbID,
      title: dataJS.Title,
      year: dataJS.Year,
      poster: dataJS.Poster,
      plot: dataJS.Plot,
      actors: dataJS.Actors,
      rating: dataJS.imdbRating,
      genre: dataJS.Genre
    };
  }

  goBack() {
    this.location.back();
  }

}
