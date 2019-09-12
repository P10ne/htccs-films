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
    this.locStorage.addToCategory(this.FilmItemData, this.locStorage.categories[LocStorageService.LSKeys.viewed]);
  }

  addToFavorites() {
    this.locStorage.addToCategory(this.FilmItemData, this.locStorage.categories[LocStorageService.LSKeys.favorites]);
  }

  existInViewed() {
    return this.locStorage.exist(this.FilmItemData, this.locStorage.categories[LocStorageService.LSKeys.viewed]);
  }

  existInFavorites() {
    return this.locStorage.exist(this.FilmItemData, this.locStorage.categories[LocStorageService.LSKeys.favorites]);
  }

}
