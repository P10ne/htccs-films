import {Component, Input, OnInit} from '@angular/core';
import {FilmsLoaderService} from '../../services/films-loader.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  searchTitle = '';
  searchResult: IFilmDataShort[] = [];
  constructor() {
  }

  searchClickHandler(btn = null) {
    if (!btn || btn && btn.code === 'Enter') { // Клик или enter
      console.log(`Поиск фильма: ${this.searchTitle}`);
      const filmsLoader = new FilmsLoaderService();
      filmsLoader.getFilmsBySearch(this.searchTitle)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.Error) { throw new Error(); }
          this.searchResult = this.getParsedSearchResult(result.Search);
        })
        .catch(error => console.error(error));
    }

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
