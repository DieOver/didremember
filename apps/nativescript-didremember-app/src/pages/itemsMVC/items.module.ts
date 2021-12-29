import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { ItemsMVCComponent } from './items.component';
import { DesignModule } from '../../../../../libs/shared/components/design/design.module';

const routes: Routes = [{ path: '', component: ItemsMVCComponent }];

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild(routes),
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ComponentsModule,
    DesignModule,
  ],
  declarations: [ItemsMVCComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ItemsMVCModule {}
