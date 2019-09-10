import {Component, Input, OnInit} from '@angular/core';
import {FilmsListItem} from '../films-list-item';
import {LocStorageService} from '../../../services/loc-storage.service';
import {MediatorService} from '../../../services/mediator.service';

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
    this.locStorage.deleteFromFavorites(this.FilmItemData);
    this.mediator.call(MediatorService.favoritesFilmsChanged, null);
  }

}
