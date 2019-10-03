import {Component} from '@angular/core';
import {LocStorageService} from '../../../services/loc-storage.service';
import {AppState, CategoryFields} from '../../../store/app.state';
import {Store} from '@ngrx/store';
import {CategoryClass} from '../category.class';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent extends CategoryClass {
  constructor(locStorage: LocStorageService,
              store: Store<AppState>) {
    super(locStorage, store);
    this.categoryName = CategoryFields.saved;
  }
}
