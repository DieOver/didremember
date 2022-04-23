import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { CockpitComponent } from './cockpit.component';
import { CockpitRouting } from './cockpit.routing';

@NgModule({
  imports: [
    CockpitRouting,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ComponentsModule,
  ],
  declarations: [CockpitComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CockpitModule {}
