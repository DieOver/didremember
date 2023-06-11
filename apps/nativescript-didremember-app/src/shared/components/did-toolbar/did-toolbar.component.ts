import { Component, Input } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import { PostitServiceContract } from '../../services/postit/postit.service.contract';

@Component({
  moduleId: module.id,
  selector: 'did-toolbar',
  styleUrls: ['./did-toolbar.component.scss'],
  template: `
    <GridLayout class="toolbar" columns="auto, *, auto" rows="auto">
      <Label *ngIf="canBack" row="0" col="0" (tap)="back()" class="icon fas" text="&#xf060;"></Label>
      <Label *ngIf="!canBack" row="0" col="0" (tap)="onDrawerButtonTap()" class="icon fas" text="&#xf0c9;"></Label>
      <Label row="0" col="2" class="title" (tap)="clear()" [text]="title"></Label>
    </GridLayout>
  `
})
export class DidToolbarComponent {

  @Input('canBack') canBack = false;
  @Input('title') title = "";

  constructor(
    private postitService: PostitServiceContract,
    private routerExtensions: RouterExtensions
  ) {}

  back = () => this.routerExtensions.back();
  clear = () => this.postitService.clear();

  onDrawerButtonTap = (): void =>
    (<RadSideDrawer>Application.getRootView()).showDrawer();
}
