import {Component} from '@angular/core';
import {LocStorageService} from '../../../services/loc-storage.service';
import {FilmsListItem} from '../films-list-item';
import {LocStorageEnum} from '../../../enums/LocStorage.enum';

@Component({
  selector: 'app-films-list-item',
  templateUrl: './main-films-list-item.component.html',
  styleUrls: ['./main-films-list-item.component.scss'],
  providers: [LocStorageService]
})
export class MainFilmsListItemComponent extends FilmsListItem {

  get existInViewed() {
    return this.locStorage.exist(this.FilmItemData, this.locStorage.categories[LocStorageEnum.Viewed]);
  }

  get existInFavorites() {
    return this.locStorage.exist(this.FilmItemData, this.locStorage.categories[LocStorageEnum.Favorites]);
  }

  constructor(private locStorage: LocStorageService) {
    super();
  }

  addToViewed() {
    this.locStorage.addToCategory(this.FilmItemData, this.locStorage.categories[LocStorageEnum.Viewed]);
  }

  addToFavorites() {
    this.locStorage.addToCategory(this.FilmItemData, this.locStorage.categories[LocStorageEnum.Favorites]);
  }
}
