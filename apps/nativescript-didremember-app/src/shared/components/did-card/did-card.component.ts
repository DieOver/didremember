import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'did-card',
  styleUrls: ['./did-card.component.scss'],
  template: `
    <StackLayout (tap)="emitTap()" class="card" [style.width]="sizeScreen" [style.height]="sizeScreen">
      <Image src=""></Image>
      <Label [text]="count"></Label>
      <Label [text]="name"></Label>
    </StackLayout>
  `
})
export class DidCardComponent {

  @Input('count') count = "";
  @Input('name') name = "";
  @Input('sizeScreen') sizeScreen = 0;

  @Output('tap') tap = new EventEmitter();

  emitTap() {
    this.tap.emit();
  }
}
