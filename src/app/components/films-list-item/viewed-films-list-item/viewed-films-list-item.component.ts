import {Component} from '@angular/core';
import {FilmsListItem} from '../films-list-item';
import {LocStorageService} from '../../../services/loc-storage.service';
import {MediatorService} from '../../../services/mediator.service';
import {EventNamesEnum} from '../../../enums/EventNames.enum';
import {LocStorageEnum} from '../../../enums/LocStorage.enum';

@Component({
  selector: 'app-viewed-films-list-item',
  templateUrl: './viewed-films-list-item.component.html',
  styleUrls: ['./viewed-films-list-item.component.scss']
})
export class ViewedFilmsListItemComponent extends FilmsListItem {
  constructor(private locStorage: LocStorageService, private mediator: MediatorService) {
    super();
  }

  deleteFromViewed() {
    this.locStorage.deleteFromCategory(this.FilmItemData, this.locStorage.categories[LocStorageEnum.Viewed]);
    this.mediator.call(EventNamesEnum.ViewedFilmsChanged, null);
  }
}
