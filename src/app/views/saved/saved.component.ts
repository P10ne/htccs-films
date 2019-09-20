import {Component, OnInit, ViewChild} from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {AppConfigService} from '../../services/app.config.service';
import {LocStorageEnum} from '../../enums/LocStorage.enum';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {MyFilms} from '../../redux/app.state';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  favoritesFilms: IFilmDataShort[];
  currentPage: number;
  filmsCount: number;
  filmsCountOnPage = this.config.newsOnPage;
  get hasFavoritesFilms(): boolean {
    return this.favoritesFilms && this.favoritesFilms.length > 0;
  }
  constructor(private locStorage: LocStorageService,
              private config: AppConfigService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<MyFilms>) {}

  ngOnInit(): void {
    this.store.select('appPage').subscribe(({saved}) => {
      this.favoritesFilms = saved.currentFilms;
      this.currentPage = saved.currentPage;
      this.filmsCount = saved.totalCount;
    });
    this.loadFilms();
  }

  loadFilms() {
    this.locStorage.getCurrentFilmForPage(this.currentPage, this.filmsCountOnPage, this.locStorage.categories[LocStorageEnum.Favorites]);
  }

  pageChangeHandler(selectedPage: number): void {
    console.log(`saved: ${selectedPage}`);
  }
}
