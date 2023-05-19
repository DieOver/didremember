import { Component, Input } from '@angular/core';
import {
  ControlContainer,
  FormControlName,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'did-input-text',
  styleUrls: ['./did-input-text.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  template: `
    <StackLayout class="input-text">
      <Label class="label" [text]="label"></Label>
      <TextField [formControlName]="controlName" [hint]="hint"></TextField>
      <StackLayout class="errors" *ngIf="dirty">
        <Label *ngIf="error?.required" text="Obrigatório"></Label>
        <Label
          *ngIf="error?.minlength"
          text="Necessário ter {{
            error?.minlength?.requiredLength
          }} ou mais caracteres"
        ></Label>
      </StackLayout>
    </StackLayout>
  `,
})
export class DidInputTextComponent {
  @Input('label') label = 'Label';
  @Input('hint') hint = '';
  @Input('controlName') controlName: FormControlName;
  @Input('dirty') dirty = false;
  @Input('focus') focus = false;
  @Input('errors') set errors(valueErrors: ValidationErrors) {
    this.error = valueErrors;
  }

  error: ValidationErrors = {
    required: false,
    minlength: null,
  };
}
