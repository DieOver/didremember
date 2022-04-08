import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { CategoryComponent } from './category.component';
import { CategoryRouting } from './category.routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CategoryRouting,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [CategoryComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CategoryModule {}
