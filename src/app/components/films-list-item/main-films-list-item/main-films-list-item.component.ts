import {Component, Input, OnInit} from '@angular/core';
import {LocStorageService} from '../../../services/loc-storage.service';
import {FilmsListItem} from '../films-list-item';

@Component({
  selector: 'app-films-list-item',
  templateUrl: './main-films-list-item.component.html',
  styleUrls: ['./main-films-list-item.component.scss'],
  providers: [LocStorageService]
})
export class MainFilmsListItemComponent extends FilmsListItem {

  constructor(private locStorage: LocStorageService) {
    super();
  }

  addToViewed() {
    this.locStorage.addToViewed(this.FilmItemData);
  }

  addToFavorites() {
    this.locStorage.addToFavorites(this.FilmItemData);
  }

  existInViewed() {
    return this.locStorage.existInViewed(this.FilmItemData);
  }

  existInFavorites() {
    return this.locStorage.existInFavorites(this.FilmItemData);
  }

}
