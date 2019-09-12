import {Component, OnInit, ViewChild} from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {MediatorService} from '../../services/mediator.service';
import {PaginationComponent} from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  favoritesFilms: IFilmDataShort[];
  filmsCountOnPage = 3;
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
    return this.locStorage.hasFavoritesFilms();
  }

  ngOnInit() {
    this.update();
  }

  update() {
    this.favoritesFilms = this.locStorage.getCurrentFavoritesFilmsForPage(1, this.filmsCountOnPage);
    this.filmsCount = this.locStorage.getCurrentFavoritesFilms().length;
  }

  pageChangeHandler(selectedPage) {
    console.log(`saved: ${selectedPage}`);
    this.favoritesFilms = this.locStorage.getCurrentFavoritesFilmsForPage(selectedPage, this.filmsCountOnPage);
  }
}
