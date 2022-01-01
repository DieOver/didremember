import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { DidToolbarComponent } from './did-toolbar/did-toolbar.component';

const ED = [
  DidToolbarComponent
];

@NgModule({
  exports: [...ED],
  declarations: [...ED],
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ComponentsModule {}
