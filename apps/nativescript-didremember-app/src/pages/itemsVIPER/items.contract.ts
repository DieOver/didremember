import { Item } from '../../shared/interfaces/item.interface';
import {
  IView,
  IPresenter,
  IInteractor,
  IInteractorOutput,
  IRouter,
} from '../../shared/interfaces/contracts.interface';

export abstract class View implements IView<Item[]> {
  abstract onQuerySuccess(result: Item[]): void;
  abstract onQueryError(error: any): void;

  abstract onClickItemSuccess(result: Item): void;
  abstract onClickItemError(error: any): void;
}

export abstract class Presenter implements IPresenter {
  abstract onDestroy(): void;
  abstract onQuery(): void;
  abstract onClickItem(item: Item): void;
  abstract navigateToDetail(item: Item): void;
}

export abstract class Interactor implements IInteractor {
  abstract onDestroy(): void;
  abstract onQuery(): void;
  abstract onClickItem(item: Item): void;
}

export abstract class InteractorOutput implements IInteractorOutput<Item[]> {
  abstract onQuerySuccess(result: Item[]): void;
  abstract onQueryError(error: any): void;

  abstract onClickItemSuccess(result: Item): void;
  abstract onClickItemError(error: any): void;
}

export abstract class Router implements IRouter {
  abstract onDestroy(): void;
  abstract navigateToDetail(page: string): void;
}
