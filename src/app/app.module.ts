import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

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
import { SavedFilmsListItemComponent } from './components/films-list-item/saved-films-list-item/saved-films-list-item.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './store/app.reducer';

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
    SavedFilmsListItemComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({Films: appReducer}),
    StoreDevtoolsModule.instrument()
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
