import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {AppConfigService} from '../../services/app.config.service';
import {Observable} from 'rxjs';
import {IFilmDataShort} from '../../Interfaces/IFilmDataShort.interface';
import {select, Store} from '@ngrx/store';
import {} from '../../redux/app.selector';
import {AppState, CategoryFields, IFilmCategory} from '../../redux/app.state';
import {selectFilmsForPage} from '../../redux/app.selector';
import {ClearFilmsAction, UpdateCategoryPageAction, UpdateFilmsAction} from '../../redux/app.actions';

@Component({
  selector: 'app-viewed',
  templateUrl: './viewed.component.html',
  styleUrls: ['./viewed.component.scss']
})
export class ViewedComponent implements OnInit, OnDestroy {
  viewedFilms: IFilmDataShort[];
  currentPage: number;
  filmsCount: number;
  filmsCountOnPage = AppConfigService.newsOnPage;
  get hasViewedFilms() {
    return this.viewedFilms && this.viewedFilms.length > 0;
  }
  get needPagination() {
    return this.filmsCount > this.filmsCountOnPage;
  }
  constructor(private locStorage: LocStorageService, private config: AppConfigService, private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.store.pipe(select(selectFilmsForPage(), {category: CategoryFields.viewed})).subscribe((viewedFilms: IFilmCategory) => {
      this.viewedFilms = viewedFilms.films;
      this.currentPage = viewedFilms.currentPage;
      this.filmsCount = viewedFilms.totalCount;
    });
    const films = this.locStorage.getAllFilms(CategoryFields.viewed);
    this.store.dispatch(UpdateFilmsAction({films: films, category: CategoryFields.viewed}));
  }

  pageChangeHandler(selectedPage: number): void {
    console.log(`viewed: ${selectedPage}`);
    this.store.dispatch(UpdateCategoryPageAction({page: selectedPage, category: CategoryFields.viewed}));
  }

  deleteFilmHandler(film) {
    this.locStorage.deleteFromCategory(film, CategoryFields.viewed);

    const newFilms = this.locStorage.getAllFilms(CategoryFields.viewed);
    this.store.dispatch(UpdateFilmsAction({films: newFilms, category: CategoryFields.viewed}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(ClearFilmsAction({category: CategoryFields.saved}));
  }

}
