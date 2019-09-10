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
import { MainFilmsListItemComponent } from './components/films-list-item/main-films-list-item/main-films-list-item.component';
import { FilmPageComponent } from './views/film-page/film-page.component';
import { ViewedFilmsListItemComponent } from './components/films-list-item/viewed-films-list-item/viewed-films-list-item.component';
import { FavoritesFilmsListItemComponent } from './components/films-list-item/favorites-films-list-item/favorites-films-list-item.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SavedComponent,
    NotFoundComponent,
    HeaderComponent,
    LayoutComponent,
    ViewedComponent,
    MainFilmsListItemComponent,
    FilmPageComponent,
    ViewedFilmsListItemComponent,
    FavoritesFilmsListItemComponent,
    PaginationComponent
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
