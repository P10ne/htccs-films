import {Component, EventEmitter, Output} from '@angular/core';
import {FilmsListItem} from '../films-list-item';
import {LocStorageService} from '../../../services/loc-storage.service';
import {CategoryFields} from '../../../store/app.state';

@Component({
  selector: 'app-viewed-films-list-item',
  templateUrl: './viewed-films-list-item.component.html',
  styleUrls: ['./viewed-films-list-item.component.scss']
})
export class ViewedFilmsListItemComponent extends FilmsListItem {
  constructor(private locStorage: LocStorageService) {
    super();
  }

  deleteFromViewed() {
    this.locStorage.deleteFromCategory(this.FilmItemData, CategoryFields.viewed);
  }
}
