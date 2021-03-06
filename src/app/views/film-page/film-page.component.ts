import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {FilmsLoaderService} from '../../services/films-loader.service';
import { Location } from '@angular/common';
import {PlotTypeEnum} from '../../enums/PlotType.enum';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit {
  id: string;
  subscription: Subscription;
  filmData: IFilmDataFull;
  error = '';
  get hasFilmData() {
    return this.filmData !== undefined;
  }
  constructor(private activateRoute: ActivatedRoute,
              private filmsLoader: FilmsLoaderService,
              private location: Location) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params.id);
  }

  ngOnInit(): void {
    this.filmsLoader.getFilmById(this.id, PlotTypeEnum.Full)
      .subscribe(
        data => this.filmData = data,
        error => this.error = error.message
      );
  }

  goBack(): void {
    this.location.back();
  }

}
