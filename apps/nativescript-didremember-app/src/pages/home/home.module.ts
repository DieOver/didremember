import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { HomeComponent } from './home.component';
import { DesignModule } from '../../shared/design/design.module';
import { HomeRouting } from './home.routing';

@NgModule({
  imports: [
    HomeRouting,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ComponentsModule,
    DesignModule,
  ],
  declarations: [HomeComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule {}
