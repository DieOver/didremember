import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

const routes: Routes = [
  { path: '', redirectTo: '/cockpit', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
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
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRouting {}
