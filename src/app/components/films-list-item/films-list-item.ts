import {Input} from '@angular/core';
import {IFilmDataShort} from '../../Interfaces/IFilmDataShort.interface';

export class FilmsListItem {
  @Input() FilmItemData: IFilmDataShort;
}
