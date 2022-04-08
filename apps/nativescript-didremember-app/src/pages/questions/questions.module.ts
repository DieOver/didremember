import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { QuestionsComponent } from './questions.component';
import { QuestionsRouting } from './questions.routing';

@NgModule({
  imports: [
    QuestionsRouting,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ComponentsModule,
  ],
  declarations: [QuestionsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class QuestionsModule {}
