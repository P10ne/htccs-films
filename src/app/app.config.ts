import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  static newsOnPage = 10; // Для страниц "сохраненные" и "просмотренные"
  static imdbKey = 'a2149e33';
}
