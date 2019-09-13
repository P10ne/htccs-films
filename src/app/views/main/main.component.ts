import {Component} from '@angular/core';
import {FilmsLoaderService} from '../../services/films-loader.service';
import {MediatorService} from '../../services/mediator.service';

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
  get hasSearchTitle() {
    return this.searchTitle.trim().length > 0;
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

  constructor(private filmsLoader: FilmsLoaderService, private mediatorService: MediatorService) {

  }

  searchClickHandler(btn: any = null) {
    this.searchError = '';
    if (this.searchTitle.trim().length > 0) {
      if (!btn || btn && btn.key === 'Enter') { // Клик или enter
        this.setPageData()
        this.mediatorService.call(this.mediatorService.SearchEvent, null);
      }
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
