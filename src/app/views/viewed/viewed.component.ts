import { Component, OnInit } from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {MediatorService} from '../../services/mediator.service';

@Component({
  selector: 'app-viewed',
  templateUrl: './viewed.component.html',
  styleUrls: ['./viewed.component.scss']
})
export class ViewedComponent implements OnInit {
  viewedFilms: IFilmDataShort[];
  filmsCountOnPage = 3;
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
    return this.locStorage.hasViewedFilms();
  }

  ngOnInit() {
    this.update();
  }

  update() {
    this.viewedFilms = this.locStorage.getCurrentViewedFilmsForPage(1, this.filmsCountOnPage);
    this.filmsCount = this.locStorage.getCurrentViewedFilms().length;
  }

  pageChangeHandler(selectedPage) {
    console.log(`saved: ${selectedPage}`);
    this.viewedFilms = this.locStorage.getCurrentViewedFilmsForPage(selectedPage, this.filmsCountOnPage);
  }

}
