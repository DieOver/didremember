import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';
import { TextField } from '@nativescript/core';

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
      <TextField
        #elRef
        [formControlName]="controlName"
        [hint]="hint"
      ></TextField>
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
export class DidInputTextComponent implements AfterViewChecked {
  @ViewChild('elRef') elRef: ElementRef;

  @Output('props') props = new EventEmitter<TextField>();

  @Input('label') label = 'Label';
  @Input('hint') hint = '';
  @Input('controlName') controlName = '';
  @Input('dirty') dirty = false;
  @Input('focus') focus = false;
  @Input('errors') set errors(valueErrors: ValidationErrors) {
    this.error = valueErrors;
  }

  error: ValidationErrors = {
    required: false,
    minlength: null,
  };

  ngAfterViewChecked(): void {
    const elTF = this.elRef.nativeElement as TextField;
    this.props.emit(elTF);
  }
}
