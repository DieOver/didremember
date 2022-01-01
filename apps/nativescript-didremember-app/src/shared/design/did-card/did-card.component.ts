import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'did-card',
  styleUrls: ['./did-card.component.scss'],
  template: `
    <StackLayout class="card" [style.width]="sizeScreen" [style.height]="sizeScreen">
      <Label [text]="count"></Label>
      <Label [text]="name"></Label>
    </StackLayout>
  `
})
export class DidCardComponent implements OnInit {

  @Input('count') count = "";
  @Input('name') name = "";
  @Input('sizeScreen') sizeScreen = 0;

  ngOnInit(): void {}
}
