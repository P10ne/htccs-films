import { Component, OnInit } from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';
import {AppConfigService} from '../../services/app.config.service';
import {LocStorageEnum} from '../../enums/LocStorage.enum';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-viewed',
  templateUrl: './viewed.component.html',
  styleUrls: ['./viewed.component.scss']
})
export class ViewedComponent implements OnInit {
  viewedFilms: IFilmDataShort[];
  filmsCountOnPage = this.config.newsOnPage
  filmsCount: number;
  currentPage: number;
  private querySubscription;
  get hasViewedFilms(): boolean {
    return this.locStorage.hasFilms(this.locStorage.categories[LocStorageEnum.Viewed]);
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
    this.viewedFilms = this.locStorage.getCurrentFilmForPage(this.currentPage, this.filmsCountOnPage, this.locStorage.categories[LocStorageEnum.Viewed]);
    this.filmsCount = this.locStorage.getCurrentFilms(this.locStorage.categories[LocStorageEnum.Viewed]).length;
  }

  pageChangeHandler(selectedPage: number): void {
    this.currentPage = selectedPage;
    this.navigateToPage(this.currentPage);
    this.viewedFilms = this.locStorage.getCurrentFilmForPage(this.currentPage, this.filmsCountOnPage, this.locStorage.categories[LocStorageEnum.Viewed]);
  }

  navigateToPage(page: number) {
    this.router.navigate(
      ['/viewed'],
      {
        queryParams: {
          'page': page
        }
      }
    );
  }

}
