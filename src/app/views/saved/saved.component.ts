import {Component, OnInit, ViewChild} from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {MediatorService} from '../../services/mediator.service';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  favoritesFilms: IFilmDataShort[];
  filmsCountOnPage = AppConfig.newsOnPage;
  filmsCount: number;
  @ViewChild(PaginationComponent, {static: false})
  private pagination: PaginationComponent;
  constructor(private locStorage: LocStorageService, private mediator: MediatorService) {
    this.subscribe();
  }

  subscribe() {
    this.mediator.subscribe(MediatorService.favoritesFilmsChanged, () => {
      this.favoritesFilmsChangedHandler();
    });
  }

  favoritesFilmsChangedHandler() {
    this.update();
  }

  hasFavoritesFilms() {
    return this.locStorage.hasFilms(this.locStorage.categories[LocStorageService.LSKeys.favorites]);
  }

  ngOnInit() {
    this.update();
  }

  update() {
    this.favoritesFilms = this.locStorage.getCurrentFilmForPage(1, this.filmsCountOnPage, this.locStorage.categories[LocStorageService.LSKeys.favorites]);
    this.filmsCount = this.locStorage.getCurrentFilms(this.locStorage.categories[LocStorageService.LSKeys.favorites]).length;
  }

  pageChangeHandler(selectedPage) {
    console.log(`saved: ${selectedPage}`);
    this.favoritesFilms = this.locStorage.getCurrentFilmForPage(selectedPage, this.filmsCountOnPage, this.locStorage.categories[LocStorageService.LSKeys.favorites]);
  }
}
