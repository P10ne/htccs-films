import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './views/main/main.component';
import {SavedComponent} from './views/saved/saved.component';
import {NotFoundComponent} from './views/not-found/not-found.component';
import {ViewedComponent} from './views/viewed/viewed.component';
import {FilmPageComponent} from './views/film-page/film-page.component';


const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'saved', component: SavedComponent},
  { path: 'viewed', component: ViewedComponent},
  { path: 'film-page/:id', component: FilmPageComponent},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
