import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  newsOnPage = 10; // Для страниц "сохраненные" и "просмотренные"
  imdbKey = 'a2149e33';
}
