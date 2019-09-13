import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FilmsLoaderService} from '../../services/films-loader.service';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {MediatorService} from '../../services/mediator.service';
import {LocStorageService} from '../../services/loc-storage.service';
import {map} from 'rxjs/operators';


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
  @ViewChild(PaginationComponent, {static: false}) pagination: PaginationComponent;
  constructor(private filmsLoader: FilmsLoaderService, private mediatorService: MediatorService) {

}

  searchClickHandler(btn: any = null) {
    this.searchError = '';
    if (this.searchTitle.trim().length > 0) {
      if (!btn || btn && btn.key === 'Enter') { // Клик или enter
        this.setPageData()
        this.mediatorService.call(MediatorService.searchEvent, null);
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
/*
  getParsedSearchResult(dataJSON): IFilmDataShort[] {
    const dataJS = dataJSON;
    const films: IFilmDataShort[] = [];
    dataJS.forEach((item) => {
      films.push({
        imdbId: item.imdbID,
        title: item.Title,
        year: item.Year
      });
    });
    return films;
  }
*/
  hasSearchResult(): boolean {
    return this.searchResult.length > 0;
  }
}
