import {Component, OnInit, ViewChild} from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {MediatorService} from '../../services/mediator.service';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {AppConfigService} from '../../services/app.config.service';
import {EventNamesEnum} from '../../enums/EventNames.enum';
import {LocStorageEnum} from '../../enums/LocStorage.enum';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  favoritesFilms: IFilmDataShort[];
  filmsCountOnPage = this.config.newsOnPage;
  filmsCount: number;
  get hasFavoritesFilms(): boolean {
    return this.locStorage.hasFilms(this.locStorage.categories[LocStorageEnum.Favorites]);
  }
  private pagination: PaginationComponent;
  constructor(private locStorage: LocStorageService, private mediator: MediatorService, private config: AppConfigService) {
    this.subscribe();
  }

  subscribe(): void {
    this.mediator.subscribe(EventNamesEnum.FavoritesFilmsChanged, () => {
      this.update();
    });
  }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.favoritesFilms = this.locStorage.getCurrentFilmForPage(1, this.filmsCountOnPage, this.locStorage.categories[LocStorageEnum.Favorites]);
    this.filmsCount = this.locStorage.getCurrentFilms(this.locStorage.categories[LocStorageEnum.Favorites]).length;
  }

  pageChangeHandler(selectedPage: number): void {
    console.log(`saved: ${selectedPage}`);
    this.favoritesFilms = this.locStorage.getCurrentFilmForPage(selectedPage, this.filmsCountOnPage, this.locStorage.categories[LocStorageEnum.Favorites]);
  }
}
