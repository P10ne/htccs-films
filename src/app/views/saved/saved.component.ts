import { Component, OnInit } from '@angular/core';
import {LocStorageService} from '../../services/loc-storage.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  favoritesFilms: IFilmListItemData[];

  constructor(private locStorage: LocStorageService) { }

  ngOnInit() {
    this.favoritesFilms =  this.locStorage.getCurrentFavoritesFilms();
  }

  hasFavoritesFilms() {
    return this.locStorage.hasFavoritesFilms();
  }

}
