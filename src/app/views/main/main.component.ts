import {Component} from '@angular/core';
import {FilmsLoaderService} from '../../services/films-loader.service';
import {MediatorService} from '../../services/mediator.service';
import {EventNamesEnum} from '../../enums/EventNames.enum';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private filmsLoader: FilmsLoaderService, private mediatorService: MediatorService, private route: ActivatedRoute) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.searchTitle = queryParam['searchtitle'];
        this.currentPage = Number.parseInt(queryParam['page']);
      }
    );
    if (this.searchTitle) {
      this.createResults();
    }

  }

  createResults() {
    this.searchError = '';
    if (this.searchTitle.trim().length > 0) {
      this.setPageData();
      this.mediatorService.call(EventNamesEnum.SearchEvent, null);
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
          });

  }

  pageChangeHandler(newPage: number) {
    this.currentPage = newPage;
    this.setPageData();
  }
}
