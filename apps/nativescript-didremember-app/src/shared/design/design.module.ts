import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DidButtonComponent } from './did-button/did-button.component';
import { DidToolbarComponent } from './did-toolbar/did-toolbar.component';
import { DidCardComponent } from './did-card/did-card.component';
import { DidInputTextComponent } from './did-input-text/did-input-text.component';
import { DidListItemComponent } from './did-list-item/did-list-item.component';

const ED = [
  DidButtonComponent,
  DidToolbarComponent,
  DidCardComponent,
  DidInputTextComponent,
  DidListItemComponent
];

@NgModule({
  imports: [
    NativeScriptCommonModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
  ],
  exports: [...ED],
  declarations: [...ED],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DesignModule {}
