import { Item } from '../../shared/interfaces/item.interface';
import { ItemsServiceContract } from '../../shared/services/items/items.service.contract';
import {
  View,
  Presenter,
  InteractorOutput,
  Interactor,
  Router,
} from './items.contract';
import { ItemsInteractor } from './items.interactor';
import { ItemsRouter } from './items.router';

export class ItemsPresenter implements Presenter, InteractorOutput {
  view: View;
  itemsS: ItemsServiceContract;

  interactor: Interactor;
  router: Router;

  constructor(view: View, itemsS: ItemsServiceContract) {
    this.interactor = new ItemsInteractor(this, itemsS);
    this.router = new ItemsRouter(view);

    this.view = view;
    this.itemsS = itemsS;
  }

  onDestroy(): void {
    this.view = null;
    this.itemsS = null;
    this.interactor = null;
    this.router = null;
  }

  onQuery(): void {
    this.interactor.onQuery();
  }

  onClickItem(item: Item): void {
    this.interactor.onClickItem(item);
  }

  onQuerySuccess(result: Item[]): void {
    this.view.onQuerySuccess(result);
  }

  onQueryError(error: any): void {
    this.view.onQueryError(error);
  }

  onClickItemSuccess(result: Item): void {
    this.view.onClickItemSuccess(result);
  }

  onClickItemError(error: any): void {
    this.view.onClickItemError(error);
  }

  navigateToDetail(item: Item): void {
    this.router.navigateToDetail(`/detail/${item.id}`);
  }
}
