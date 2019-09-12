import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FilmsLoaderService} from '../../services/films-loader.service';
import {PaginationComponent} from '../../components/pagination/pagination.component';


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
  @ViewChild('paginationChild', {read: PaginationComponent, static: false})
  private pag: PaginationComponent;
  constructor(private filmsLoader: FilmsLoaderService) {

  }

  searchClickHandler(btn = null) {
    this.searchError = '';
    if (this.searchTitle.trim().length > 0) {
      if (!btn || btn && btn.code === 'Enter') { // Клик или enter
        console.log(`Поиск фильма: ${this.searchTitle}`);
        this.getFilms();
        // this.pag.update(1);
      }
    }
  }

  getFilms() {
    this.filmsLoader.getFilmsBySearch(this.searchTitle, this.currentPage)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.Error) { throw new Error(result.Error); }
        this.searchResult = this.getParsedSearchResult(result.Search);
        this.filmsCount = Number.parseInt(result.totalResults);
      })
      .catch(error => this.searchError = error.message);
  }

  pageChangeHandler(newPage) {
    this.currentPage = newPage;
    this.getFilms();
  }

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

  hasSearchResult() {
    return this.searchResult.length > 0;
  }
}
