import {Component, EventEmitter, Output} from '@angular/core';
import {LocStorageService} from '../../../services/loc-storage.service';
import {FilmsListItem} from '../films-list-item';
import {AppState, CategoryFields} from '../../../store/app.state';
import {select, Store} from '@ngrx/store';
import {selectExistInCategory} from '../../../store/app.selector';

@Component({
  selector: 'app-films-list-item',
  templateUrl: './main-films-list-item.component.html',
  styleUrls: ['./main-films-list-item.component.scss'],
  providers: [LocStorageService]
})
export class MainFilmsListItemComponent extends FilmsListItem {
  constructor(private locStorage: LocStorageService, private store: Store<AppState>) {
    super();
  }

  get existInViewed() {
    return this.store.pipe(select(selectExistInCategory(), {category: CategoryFields.viewed, searchImdbId: this.FilmItemData.imdbId}));
  }

  get existInSaved() {
    return this.store.pipe(select(selectExistInCategory(), {category: CategoryFields.saved, searchImdbId: this.FilmItemData.imdbId}));
  }



  addToViewed() {
    this.locStorage.addToCategory(this.FilmItemData, CategoryFields.viewed);
  }

  addToSaved() {
    this.locStorage.addToCategory(this.FilmItemData, CategoryFields.saved);
  }
}
