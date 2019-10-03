import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocStorageService} from '../../../services/loc-storage.service';
import {AppConfigService} from '../../../services/app.config.service';
import {Observable} from 'rxjs';
import {IFilmDataShort} from '../../../Interfaces/IFilmDataShort.interface';
import {select, Store} from '@ngrx/store';
import {} from '../../../store/app.selector';
import {AppState, CategoryFields, IFilmCategory} from '../../../store/app.state';
import {selectFilmsForPage} from '../../../store/app.selector';
import {ClearFilmsAction, UpdateCategoryPageAction, UpdateFilmsAction} from '../../../store/app.actions';
import {CategoryClass} from '../category.class';

@Component({
  selector: 'app-viewed',
  templateUrl: './viewed.component.html',
  styleUrls: ['./viewed.component.scss']
})
export class ViewedComponent extends CategoryClass {
  constructor(locStorage: LocStorageService,
              store: Store<AppState>) {
    super(locStorage, store);
    this.categoryName = CategoryFields.viewed;
  }
}
