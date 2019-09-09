import {Component, Input, OnInit} from '@angular/core';
import {FilmsLoaderService} from '../../services/films-loader.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  searchTitle = '';
  searchResult: IFilmListItemData[] = [];
  constructor() {
    this.searchTitle = '';
    this.searchResult = [];
  }

  ngOnInit() {
  }

  searchClickHandler() {
    console.log(`Поиск фильма: ${this.searchTitle}`);
    const filmsLoader = new FilmsLoaderService();
    filmsLoader.getFilmsByTitle(this.searchTitle)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.Error) { throw new Error(); }
        this.searchResult = this.getParsedSearchResult(result);
      })
      .catch(error => console.error(error));
  }

  getParsedSearchResult(dataJSON): IFilmListItemData[] {
    const dataJS = dataJSON;
    return [{
      imdbId: dataJS.imdbID,
      title: dataJS.Title,
      released: dataJS.Released
    }];
  }

  hasSearchResult() {
    return this.searchResult.length > 0;
  }
}
