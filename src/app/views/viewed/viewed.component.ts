import { Component, OnInit } from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {MediatorService} from '../../services/mediator.service';
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-viewed',
  templateUrl: './viewed.component.html',
  styleUrls: ['./viewed.component.scss']
})
export class ViewedComponent implements OnInit {
  viewedFilms: IFilmDataShort[];
  filmsCountOnPage = AppConfig.newsOnPage;
  filmsCount: number;
  constructor(private locStorage: LocStorageService, private mediator: MediatorService) {
      this.subscribe();
  }

  subscribe() {
    const self = this; // В отдельный метод
    this.mediator.subscribe(MediatorService.viewedFilmsChanged, () => {
        self.update();
    });
  }

  hasViewedFilms() {
    return this.locStorage.hasFilms(this.locStorage.categories[LocStorageService.LSKeys.viewed]);
  }

  ngOnInit() {
    this.update();
  }

  update() {
    this.viewedFilms = this.locStorage.getCurrentFilmForPage(1, this.filmsCountOnPage, this.locStorage.categories[LocStorageService.LSKeys.viewed]);
    this.filmsCount = this.locStorage.getCurrentFilms(this.locStorage.categories[LocStorageService.LSKeys.viewed]).length;
  }

  pageChangeHandler(selectedPage) {
    console.log(`saved: ${selectedPage}`);
    this.viewedFilms = this.locStorage.getCurrentFilmForPage(selectedPage, this.filmsCountOnPage, this.locStorage.categories[LocStorageService.LSKeys.viewed]);
  }

}
