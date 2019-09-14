import {Component} from '@angular/core';
import {FilmsListItem} from '../films-list-item';
import {LocStorageService} from '../../../services/loc-storage.service';
import {MediatorService} from '../../../services/mediator.service';
import {EventNamesEnum} from '../../../enums/EventNames.enum';
import {LocStorageEnum} from '../../../enums/LocStorage.enum';

@Component({
  selector: 'app-favorites-films-list-item',
  templateUrl: './favorites-films-list-item.component.html',
  styleUrls: ['./favorites-films-list-item.component.scss']
})
export class FavoritesFilmsListItemComponent extends FilmsListItem {

  constructor(private locStorage: LocStorageService, private mediator: MediatorService) {
    super();
  }

  deleteFromFavorites() {
    this.locStorage.deleteFromCategory(this.FilmItemData, this.locStorage.categories[LocStorageEnum.Favorites]);
    this.mediator.call(EventNamesEnum.FavoritesFilmsChanged, null);
  }

}
