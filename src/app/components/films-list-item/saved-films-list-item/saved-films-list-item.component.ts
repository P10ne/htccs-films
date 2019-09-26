import {Component, EventEmitter, Output} from '@angular/core';
import {FilmsListItem} from '../films-list-item';
import {LocStorageService} from '../../../services/loc-storage.service';
import {CategoryFields} from '../../../store/app.state';
import {IFilmDataShort} from '../../../Interfaces/IFilmDataShort.interface';

@Component({
  selector: 'app-favorites-films-list-item',
  templateUrl: './saved-films-list-item.component.html',
  styleUrls: ['./favorites-films-list-item.component.scss']
})
export class SavedFilmsListItemComponent extends FilmsListItem {
  @Output() deleteEmitter = new EventEmitter<IFilmDataShort>();
  constructor(private locStorage: LocStorageService) {
    super();
  }

  deleteFromSaved(film) {
    console.log(film);
    this.deleteEmitter.emit(film);
  }

}
