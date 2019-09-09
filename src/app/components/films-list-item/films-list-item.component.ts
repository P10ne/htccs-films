import {Component, Input, OnInit} from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';

@Component({
  selector: 'app-films-list-item',
  templateUrl: './films-list-item.component.html',
  styleUrls: ['./films-list-item.component.scss'],
  providers: [LocStorageService]
})
export class FilmsListItemComponent {
  @Input() FilmItemData: IFilmListItemData;

  constructor(private locStorage: LocStorageService) {}

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
