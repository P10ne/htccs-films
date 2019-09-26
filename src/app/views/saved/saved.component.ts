import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {AppConfigService} from '../../services/app.config.service';
import {IFilmDataShort} from '../../Interfaces/IFilmDataShort.interface';
import {AppState, CategoryFields, IFilmCategory} from '../../redux/app.state';
import {select, Store} from '@ngrx/store';
import {selectFilmsForPage} from '../../redux/app.selector';
import {ClearFilmsAction, UpdateCategoryPageAction, UpdateFilmsAction} from '../../redux/app.actions';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit, OnDestroy {
  savedFilms: IFilmDataShort[];
  currentPage: number;
  filmsCount: number;
  filmsCountOnPage = AppConfigService.newsOnPage;

  get hasSavedFilms() {
    return this.savedFilms && this.savedFilms.length > 0;
  }
  get needPagination() {
    return this.filmsCount > this.filmsCountOnPage;
  }
  constructor(private locStorage: LocStorageService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(selectFilmsForPage(), {category: CategoryFields.saved})).subscribe((savedFilms: IFilmCategory) => {
      this.savedFilms = savedFilms.films;
      this.currentPage = savedFilms.currentPage;
      this.filmsCount = savedFilms.totalCount;
    });
    const films = this.locStorage.getAllFilms(CategoryFields.saved);
    this.store.dispatch(UpdateFilmsAction({films: films, category: CategoryFields.saved}));
  }

  pageChangeHandler(selectedPage: number): void {
    this.store.dispatch(UpdateCategoryPageAction({page: selectedPage, category: CategoryFields.saved}));
  }

  deleteFilmHandler(film) {
    this.locStorage.deleteFromCategory(film, CategoryFields.saved);

    const newFilms = this.locStorage.getAllFilms(CategoryFields.saved);
    this.store.dispatch(UpdateFilmsAction({films: newFilms, category: CategoryFields.saved}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(ClearFilmsAction({category: CategoryFields.saved}));
  }
}
