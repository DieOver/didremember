import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { ListImagesComponent } from './list-images.component';
import { DetailImageComponent } from './detail-image.component';

const routes: Routes = [
  { path: '', component: ListImagesComponent },
  { path: 'detail', component: DetailImageComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class ListImagesRouting {}
