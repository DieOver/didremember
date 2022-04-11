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
    <StackLayout class="toolbar">
      <GridLayout class="actions-bar" columns="auto, *, auto" rows="auto">
        <Button *ngIf="canBack" row="0" col="0" (tap)="back()" class="icon fas" text="&#xf060;"></Button>
        <Button *ngIf="!canBack" row="0" col="0" (tap)="onDrawerButtonTap()" class="icon fas" text="&#xf0c9;"></Button>
        <Label row="0" col="2" class="title" (tap)="clear()" [text]="title"></Label>
      </GridLayout>
    </StackLayout>
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
