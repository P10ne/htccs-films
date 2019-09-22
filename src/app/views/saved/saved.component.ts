import {Component, OnInit, ViewChild} from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {AppConfigService} from '../../services/app.config.service';
import {LocStorageEnum} from '../../enums/LocStorage.enum';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  favoritesFilms: IFilmDataShort[];
  filmsCountOnPage = this.config.newsOnPage;
  filmsCount: number;
  currentPage: number;
  private querySubscription: Subscription;
  get hasFavoritesFilms(): boolean {
    return this.locStorage.hasFilms(this.locStorage.categories[LocStorageEnum.Favorites]);
  }
  constructor(private locStorage: LocStorageService, private config: AppConfigService, private route: ActivatedRoute, private router: Router) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParams: any) => {
        const queryPage = Number.parseInt(queryParams['page']);
        this.currentPage = queryPage ? queryPage : 1;
      }
    );
  }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.favoritesFilms = this.locStorage.getCurrentFilmForPage(this.currentPage, this.filmsCountOnPage, this.locStorage.categories[LocStorageEnum.Favorites]);
    this.filmsCount = this.locStorage.getCurrentFilms(this.locStorage.categories[LocStorageEnum.Favorites]).length;
  }

  pageChangeHandler(selectedPage: number): void {
    console.log(`saved: ${selectedPage}`);
    this.currentPage = selectedPage;
    this.navigateToPage(this.currentPage);
    this.favoritesFilms = this.locStorage.getCurrentFilmForPage(this.currentPage, this.filmsCountOnPage, this.locStorage.categories[LocStorageEnum.Favorites]);
  }

  navigateToPage(page: number) {
    this.router.navigate(
      ['/saved'],
      {
        queryParams: {
          'page': page
        }
      }
    );
  }
}
