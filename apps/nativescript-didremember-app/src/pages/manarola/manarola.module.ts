import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { ManarolaComponent } from './manarola.component';
import { ManarolaRouting } from './manarola.routing';

@NgModule({
  imports: [
    ManarolaRouting,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ComponentsModule,
  ],
  declarations: [ManarolaComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ManarolaModule {}
