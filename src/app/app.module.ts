import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { SavedComponent } from './views/saved/saved.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { ViewedComponent } from './views/viewed/viewed.component';
import {FormsModule} from '@angular/forms';
import { FilmsListItemComponent } from './components/films-list-item/films-list-item.component';
import {LocStorageService} from './services/loc-storage.service';
import { FilmPageComponent } from './views/film-page/film-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SavedComponent,
    NotFoundComponent,
    HeaderComponent,
    LayoutComponent,
    ViewedComponent,
    FilmsListItemComponent,
    FilmPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
