import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptModule } from '@nativescript/angular';
import { AppButtonComponent } from './app-button/app-button.component';

const ED = [
  AppButtonComponent
];

@NgModule({
  exports: [...ED],
  declarations: [...ED],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ComponentsModule { }
