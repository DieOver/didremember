import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { QuestionsComponent } from './questions.component';
import { DesignModule } from '../../shared/design/design.module';
import { QuestionsRouting } from './questions.routing';

@NgModule({
  imports: [
    QuestionsRouting,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ComponentsModule,
    DesignModule,
  ],
  declarations: [QuestionsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class QuestionsModule {}
