import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'did-button',
  styleUrls: ['./did-button.component.scss'],
  template: `<Button (tap)="emitTapFn()" [text]="text"></Button>`,
})
export class DidButtonComponent {

  @Input('text') text = '';

  @Output('emitTap') emitTap = new EventEmitter();

  emitTapFn() {
    this.emitTap.emit();
  }
}
