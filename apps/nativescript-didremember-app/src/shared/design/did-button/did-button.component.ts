import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'did-button',
  styleUrls: ['./did-button.component.scss'],
  template: `<Button (tap)="fn()" [text]="text"></Button>`,
})
export class DidButtonComponent implements OnInit {

  @Input('text') text: string = '';
  @Input('fn') fn: VoidFunction = () => {}

  constructor() {}

  ngOnInit() {}

}
