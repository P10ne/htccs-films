import { Component, OnInit } from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {MediatorService} from '../../services/mediator.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  favoritesFilms: IFilmDataShort[];
  filmsCountOnPage = 3;
  filmsCount: number;
  constructor(private locStorage: LocStorageService, private mediator: MediatorService) {

  }

  ngOnInit() {
    this.update();
  }

  update() {
    this.favoritesFilms =  this.locStorage.getCurrentFavoritesFilmsForPage(1, this.filmsCountOnPage);
    this.filmsCount = this.locStorage.getCurrentFavoritesFilms().length;
  }

  subscribe() {
    const self = this; // В отдельный метод
    this.mediator.subscribe(MediatorService.favoritesFilmsChanged, () => {
      self.update();
    });
  }

  hasFavoritesFilms() {
    return this.locStorage.hasFavoritesFilms();
  }

  pageChangeHandler(selectedPage) {
    console.log(`saved: ${selectedPage}`);
    this.favoritesFilms = this.locStorage.getCurrentFavoritesFilmsForPage(selectedPage, this.filmsCountOnPage);
  }
}
