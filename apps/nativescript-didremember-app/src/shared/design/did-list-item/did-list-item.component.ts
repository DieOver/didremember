import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { IPostit } from '../../interfaces/postit.interface';

@Component({
  moduleId: module.id,
  selector: 'did-list-item',
  styleUrls: ['./did-list-item.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  template: `
    <GridLayout columns="auto,*,auto" rows="auto">
      <Label row="0" col="0" [text]="item.name"></Label>
      <Label row="0" col="2" [text]="item.count"></Label>
    </GridLayout>
  `,
})
export class DidListItemComponent implements OnInit {
  @Input('item') item: IPostit;

  constructor() {}

  ngOnInit(): void {}
}
