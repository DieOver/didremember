import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/interfaces/item.interface';
import { ItemsServiceContract } from '../../shared/services/items/items.service.contract';
import { Screen } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsMVCComponent implements OnInit {
  constructor(public itemsS: ItemsServiceContract) {}

  widthDIPs = Screen.mainScreen.widthDIPs;
  sizeScreen = 0;
  todos: Item[] = [];
  todo: Item = {} as Item;

  onDrawerButtonTap = () => {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  };

  ngOnInit(): void {
    this.onQuery();
    this.sizeScreen = this.widthDIPs / 2 - 24;
  }

  onQuery(): void {
    this.itemsS.items().subscribe({
      next: (result) => {
        this.todos = result;
        console.dir(this.todos);
      },
      error: (error) => {
        console.error('onQueryError', error);
      },
    });
  }

  onClickItem(item: Item): void {
    this.itemsS.item(item.id).subscribe({
      next: (result) => {
        console.dir(result);
        this.todo = result;
        this.navigateToDetail(item);
      },
      error: (error) => {
        console.error('onClickItemError', error);
      },
    });
  }

  navigateToDetail(item: Item): void {
    console.log('FINGE QUE ESTOU MUDANDO PARA ' + `/detail/${item.id}`);
  }
}
