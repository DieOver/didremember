import { Component, Input, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';

@Component({
  moduleId: module.id,
  selector: 'did-toolbar',
  styleUrls: ['./did-toolbar.component.scss'],
  template: `
    <StackLayout class="toolbar">
      <GridLayout class="actions-bar" columns="auto, *, auto" rows="38">
        <Button *ngIf="canBack" row="0" col="0" (tap)="back()" class="icon fas" text="&#xf060;"></Button>
        <Button *ngIf="!canBack" row="0" col="0" (tap)="onDrawerButtonTap()" class="icon fas" text="&#xf0c9;"></Button>
        <Label row="0" col="2" class="title" [text]="title"></Label>
      </GridLayout>
    </StackLayout>
  `
})
export class DidToolbarComponent implements OnInit {

  @Input('canBack') canBack: boolean = false;
  @Input('title') title: string = "";
  @Input('fn') fn: () => {}

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit(): void {
    console.log('INIT DID-TOOLBAR');
  }

  back() {
    this.routerExtensions.back();
  }

  onDrawerButtonTap = (): void =>
    (<RadSideDrawer>Application.getRootView()).showDrawer();
}
