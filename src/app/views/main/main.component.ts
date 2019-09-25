import {Component, OnInit} from '@angular/core';
import {FilmsLoaderService} from '../../services/films-loader.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {IFilmDataShort} from '../../Interfaces/IFilmDataShort.interface';
import {select, Store} from '@ngrx/store';
import {AppState, ISearch} from '../../redux/app.state';
import {selectFilmsSearchPage} from '../../redux/app.selector';
import {UpdateMainPageAction} from '../../redux/app.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  searchTitle = '';
  searchResult: IFilmDataShort[] = [];
  currentPage = 1;
  filmsCountOnPage = 10;
  filmsCount = 0;
  searchError = '';
  private querySubscription: Subscription;
  get hasSearchTitle() {
    return this.searchTitle && this.searchTitle.trim().length > 0;
  }
  get hasSearchError() {
    return this.searchError !== '';
  }
  get hasSearchResult() {
    return this.searchResult && this.searchResult.length > 0;
  }
  get needPagination() {
    return this.filmsCount > this.filmsCountOnPage;
  }

  constructor(private filmsLoader: FilmsLoaderService, private store: Store<AppState>) {
    this.store.pipe(select(selectFilmsSearchPage())).subscribe((search: ISearch) => {
      this.searchTitle = search.query;
      this.searchResult = search.pageResults;
      this.currentPage = search.currentPage;
      this.filmsCount = search.totalResultsCount;
    });
  }

  searchClickHandler() {
    this.createResults();
  }

  createResults() {
    this.searchError = '';
    if (this.searchTitle.trim().length > 0) {
      this.setPageData();
    }
  }

  setPageData(): void {
    this.filmsLoader.getFilmsBySearch(this.searchTitle, this.currentPage)
      .subscribe(
        data => {
          this.store.dispatch(UpdateMainPageAction({pageResults: data.data, currentPage: this.currentPage, totalResultsCount: data.totalResults, query: this.searchTitle}));
        },
          error => {
            this.searchError = error.message;
            this.store.dispatch(UpdateMainPageAction({pageResults: null, currentPage: 1, totalResultsCount: 0, query: ''}));
            console.error(error);
          });

  }

  pageChangeHandler(newPage: number) {
    this.currentPage = newPage; // !!!#################################
    this.setPageData();
  }
}
