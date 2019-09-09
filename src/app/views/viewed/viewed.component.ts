import { Component, OnInit } from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';

@Component({
  selector: 'app-viewed',
  templateUrl: './viewed.component.html',
  styleUrls: ['./viewed.component.scss'],
  providers: [LocStorageService]
})
export class ViewedComponent implements OnInit {
  viewedFilms: IFilmListItemData[];

  constructor(private locStorage: LocStorageService) {

  }

  hasViewedFilms() {
    return this.locStorage.hasViewedFilms();
  }

  ngOnInit() {
    this.viewedFilms = this.locStorage.getCurrentViewedFilms();
  }

}
