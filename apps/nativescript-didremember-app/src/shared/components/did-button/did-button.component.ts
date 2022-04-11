import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'did-button',
  styleUrls: ['./did-button.component.scss'],
  template: `<Button (tap)="emitTap()" [text]="text"></Button>`,
})
export class DidButtonComponent {

  @Input('text') text = '';

  @Output('tap') tap = new EventEmitter();

  emitTap() {
    this.tap.emit();
  }
}
