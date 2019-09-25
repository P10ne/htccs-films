import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  static newsOnPage = 4; // Для страниц "сохраненные" и "просмотренные"
  static imdbKey = 'a2149e33';
}
