import { Component, OnInit } from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {MediatorService} from '../../services/mediator.service';
import {AppConfigService} from '../../services/app.config.service';
import {EventNamesEnum} from '../../enums/EventNames.enum';
import {LocStorageEnum} from '../../enums/LocStorage.enum';

@Component({
  selector: 'app-viewed',
  templateUrl: './viewed.component.html',
  styleUrls: ['./viewed.component.scss']
})
export class ViewedComponent implements OnInit {
  viewedFilms: IFilmDataShort[];
  filmsCountOnPage = this.config.newsOnPage
  filmsCount: number;
  get hasViewedFilms(): boolean {
    return this.locStorage.hasFilms(this.locStorage.categories[LocStorageEnum.Viewed]);
  }
  constructor(private locStorage: LocStorageService, private mediator: MediatorService, private config: AppConfigService) {
      this.subscribe();
  }

  subscribe(): void {
    this.mediator.subscribe(EventNamesEnum.ViewedFilmsChanged, () => {
        this.update();
    });
  }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.viewedFilms = this.locStorage.getCurrentFilmForPage(1, this.filmsCountOnPage, this.locStorage.categories[LocStorageEnum.Viewed]);
    this.filmsCount = this.locStorage.getCurrentFilms(this.locStorage.categories[LocStorageEnum.Viewed]).length;
  }

  pageChangeHandler(selectedPage: number): void {
    this.viewedFilms = this.locStorage.getCurrentFilmForPage(selectedPage, this.filmsCountOnPage, this.locStorage.categories[LocStorageEnum.Viewed]);
  }

}
