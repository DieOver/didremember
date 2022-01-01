import { Component, Input, OnInit } from '@angular/core';
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
      <GridLayout class="actions-bar" columns="auto, *, auto" rows="38">
        <Button *ngIf="canBack" row="0" col="0" (tap)="back()" class="icon fas" text="&#xf060;"></Button>
        <Button *ngIf="!canBack" row="0" col="0" (tap)="onDrawerButtonTap()" class="icon fas" text="&#xf0c9;"></Button>
        <Label row="0" col="2" class="title" (tap)="clear()" [text]="title"></Label>
      </GridLayout>
    </StackLayout>
  `
})
export class DidToolbarComponent implements OnInit {

  @Input('canBack') canBack: boolean = false;
  @Input('title') title: string = "";
  @Input('fn') fn: () => {}

  constructor(
    private postitService: PostitServiceContract,
    private routerExtensions: RouterExtensions
  ) {}

  back = () => this.routerExtensions.back();
  clear = () => this.postitService.clear();

  ngOnInit(): void {
    console.log('INIT DID-TOOLBAR');
  }

  onDrawerButtonTap = (): void =>
    (<RadSideDrawer>Application.getRootView()).showDrawer();
}
