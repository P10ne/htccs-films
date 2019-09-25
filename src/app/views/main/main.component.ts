import {Component, OnInit} from '@angular/core';
import {FilmsLoaderService} from '../../services/films-loader.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {IFilmDataShort} from '../../Interfaces/IFilmDataShort.interface';

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
    return this.searchResult.length > 0;
  }
  get needPagination() {
    return this.filmsCount > this.filmsCountOnPage;
  }

  constructor(private filmsLoader: FilmsLoaderService, private route: ActivatedRoute, private router: Router) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.searchTitle = queryParam['searchtitle'];
        const queryPage = Number.parseInt(queryParam['page']);
        this.currentPage = queryPage ? queryPage : 1;
      }
    );
    if (this.searchTitle) {
      this.createResults();
    }
  }

  searchClickHandler() {
    this.currentPage = 1;
    this.navigateToPage(this.currentPage);
    this.createResults();
  }

  navigateToPage(page: number) {
    this.router.navigate(
      [''],
      {
        queryParams: {
          'searchtitle': this.searchTitle,
          'page': page
        }
      }
    );
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
          this.searchResult = data.data;
          this.filmsCount = data.totalResults;
        },
          error => {
            this.searchError = error.message;
            console.error(error);
          });

  }

  pageChangeHandler(newPage: number) {
    this.currentPage = newPage;
    this.navigateToPage(this.currentPage);
    this.setPageData();
  }
}
