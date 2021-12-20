import { Item } from "../../shared/interfaces/item.interface";
import { Contracts } from "../../shared/interfaces/contracts.interface";

export namespace ItemsContract {

    export abstract class View implements Contracts.IView<Item[]> {
        abstract onQuerySuccess(result: Item[]): void;
        abstract onQueryError(error: any): void;

        abstract onClickItemSuccess(result: Item): void;
        abstract onClickItemError(error: any): void;
    }

    export abstract class Presenter implements Contracts.IPresenter {
        abstract onDestroy(): void;
        abstract onQuery(): void;
        abstract onClickItem(item: Item): void;
        abstract navigateToDetail(item: Item): void;
    }

    export abstract class Interactor implements Contracts.IInteractor {
        abstract onDestroy(): void;
        abstract onQuery(): void;
        abstract onClickItem(item: Item): void;
    }

    export abstract class InteractorOutput implements Contracts.IInteractorOutput<Item[]> {
        abstract onQuerySuccess(result: Item[]): void;
        abstract onQueryError(error: any): void;

        abstract onClickItemSuccess(result: Item): void;
        abstract onClickItemError(error: any): void;
    }

    export abstract class Router implements Contracts.IRouter {
        abstract onDestroy(): void;
        abstract navigateToDetail(page: string): void;
    }

}
