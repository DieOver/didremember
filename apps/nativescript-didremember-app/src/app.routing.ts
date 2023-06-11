import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'list-images',
    loadChildren: () => import('./pages/list-images/list-images.module').then((m) => m.ListImagesModule),
  },
  {
    path: 'pokemon',
    loadChildren: () => import('./pages/pokemon/pokemon.module').then((m) => m.PokemonModule),
  },
  {
    path: 'pokemon-detail',
    loadChildren: () => import('./pages/pokemon-detail/pokemon-detail.module').then((m) => m.PokemonDetailModule),
  },
  {
    path: 'manarola',
    loadChildren: () => import('./pages/manarola/manarola.module').then((m) => m.ManarolaModule),
  },
  {
    path: 'cockpit',
    loadChildren: () => import('./pages/cockpit/cockpit.module').then((m) => m.CockpitModule),
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'questions',
    loadChildren: () => import('./pages/questions/questions.module').then((m) => m.QuestionsModule),
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRouting {}
