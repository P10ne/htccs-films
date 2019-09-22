import {Component, EventEmitter, Output} from '@angular/core';
import {FilmsListItem} from '../films-list-item';
import {LocStorageService} from '../../../services/loc-storage.service';
import {LocStorageEnum} from '../../../enums/LocStorage.enum';

@Component({
  selector: 'app-favorites-films-list-item',
  templateUrl: './favorites-films-list-item.component.html',
  styleUrls: ['./favorites-films-list-item.component.scss']
})
export class FavoritesFilmsListItemComponent extends FilmsListItem {
  @Output() deleteEmitter = new EventEmitter();
  constructor(private locStorage: LocStorageService) {
    super();
  }

  deleteFromFavorites() {
    this.locStorage.deleteFromCategory(this.FilmItemData, this.locStorage.categories[LocStorageEnum.Favorites]);
    this.deleteEmitter.emit();
  }

}
