import { Component, Input } from '@angular/core';

@Component({
  selector: 'did-button',
  styleUrls: ['./did-button.component.scss'],
  template: `<Button (tap)="fn()" [text]="text"></Button>`,
})
export class DidButtonComponent {

  @Input('text') text = '';
  @Input('fn') fn = () => console.log('VoidFunction');

}
