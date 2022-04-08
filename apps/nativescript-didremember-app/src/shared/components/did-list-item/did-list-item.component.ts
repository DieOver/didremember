import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    <GridLayout (tap)="selectItem()" [class.selected]="selected.id == item.id" class="list-item" columns="auto,*,auto,auto" rows="auto">
      <Label row="0" col="0" [text]="item.name"></Label>
      <Label row="0" col="2" [text]="item.count"></Label>
      <Label (tap)="deleteItem()" class="icon fas" *ngIf="selected.id == item.id" row="0" col="3" text="&#xf2ed;"></Label>
    </GridLayout>
  `,
})
export class DidListItemComponent {
  @Input('item') item: IPostit;
  @Input('selected') selected: IPostit = {} as IPostit;
  @Output('select') select: EventEmitter<IPostit> = new EventEmitter<IPostit>();
  @Output('delete') delete: EventEmitter<IPostit> = new EventEmitter<IPostit>();

  selectItem = (): void => this.select.emit(this.item);
  deleteItem = (): void => this.delete.emit(this.item);

}
