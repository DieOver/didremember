import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { PokemonDetailComponent } from './pokemon-detail.component';

const routes: Routes = [{ path: ':id', component: PokemonDetailComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class PokemonDetailRouting {}
