import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { ListImagesComponent } from './list-images.component';
import { ListImagesRouting } from './list-images.routing';
import { DetailImageComponent } from './detail-image.component';

@NgModule({
  imports: [
    ListImagesRouting,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ComponentsModule,
  ],
  declarations: [ListImagesComponent, DetailImageComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ListImagesModule {}
