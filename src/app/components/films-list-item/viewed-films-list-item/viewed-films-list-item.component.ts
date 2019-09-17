import {Component, EventEmitter, Output} from '@angular/core';
import {FilmsListItem} from '../films-list-item';
import {LocStorageService} from '../../../services/loc-storage.service';
import {LocStorageEnum} from '../../../enums/LocStorage.enum';

@Component({
  selector: 'app-viewed-films-list-item',
  templateUrl: './viewed-films-list-item.component.html',
  styleUrls: ['./viewed-films-list-item.component.scss']
})
export class ViewedFilmsListItemComponent extends FilmsListItem {
  @Output() deleteEmitter = new EventEmitter();
  constructor(private locStorage: LocStorageService) {
    super();
  }

  deleteFromViewed() {
    this.locStorage.deleteFromCategory(this.FilmItemData, this.locStorage.categories[LocStorageEnum.Viewed]);
    this.deleteEmitter.emit();
  }
}
