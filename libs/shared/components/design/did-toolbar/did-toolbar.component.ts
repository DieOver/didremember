import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'did-toolbar',
  styleUrls: ['./did-toolbar.component.scss'],
  template: `
    <StackLayout class="toolbar">
      <GridLayout class="actions-bar" columns="auto, *, auto" rows="38">
        <Button row="0" col="0" (tap)="fn()" class="icon fas" text="&#xf0c9;"></Button>
        <Label row="0" col="2" class="title" [text]="title"></Label>
      </GridLayout>
    </StackLayout>
  `
})
export class DidToolbarComponent implements OnInit {

  @Input('title') title = "";
  @Input('fn') fn: () => {}

  ngOnInit(): void {
    console.log('INIT DID-TOOLBAR');
  }
}
