import {OnDestroy, OnInit} from '@angular/core';
import {IFilmDataShort} from '../../Interfaces/IFilmDataShort.interface';
import {AppConfigService} from '../../services/app.config.service';
import {LocStorageService} from '../../services/loc-storage.service';
import {AppState, CategoryFields, IFilmCategory} from '../../store/app.state';
import {select, Store} from '@ngrx/store';
import {selectFilmsForPage} from '../../store/app.selector';
import {ClearFilmsAction, UpdateCategoryPageAction, UpdateFilmsAction} from '../../store/app.actions';

export class CategoryClass implements OnInit, OnDestroy {
  currentFilms: IFilmDataShort[];
  currentPage: number;
  filmsCount: number;
  filmsCountOnPage = AppConfigService.newsOnPage;
  categoryName: CategoryFields;

  get hasFilms() {
    return this.currentFilms && this.currentFilms.length > 0;
  }
  get needPagination() {
    return this.filmsCount > this.filmsCountOnPage;
  }
  constructor(private locStorage: LocStorageService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(selectFilmsForPage(), {category: this.categoryName})).subscribe((films: IFilmCategory) => {
      this.currentFilms = films.films;
      this.currentPage = films.currentPage;
      this.filmsCount = films.totalCount;
    });
    const films = this.locStorage.getAllFilms(this.categoryName);
    this.store.dispatch(UpdateFilmsAction({films: films, category: this.categoryName}));
  }

  pageChangeHandler(selectedPage: number): void {
    this.store.dispatch(UpdateCategoryPageAction({page: selectedPage, category: this.categoryName}));
  }

  deleteFilmHandler(film) {
    this.locStorage.deleteFromCategory(film, this.categoryName);

    const newFilms = this.locStorage.getAllFilms(this.categoryName);
    this.store.dispatch(UpdateFilmsAction({films: newFilms, category: this.categoryName}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(ClearFilmsAction({category: this.categoryName}));
  }
}
