import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'did-input-text',
  styleUrls: ['./did-input-text.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  template: `
    <StackLayout class="input-text">
      <Label [text]="label"></Label>
      <TextField [formControlName]="controlName" [hint]="hint"></TextField>
    </StackLayout>
  `,
})
export class DidInputTextComponent implements OnInit {
  @Input('label') label: string = 'Label';
  @Input('hint') hint: string = '';
  @Input('controlName') controlName: string = '';

  constructor() {}

  ngOnInit(): void {}
}
