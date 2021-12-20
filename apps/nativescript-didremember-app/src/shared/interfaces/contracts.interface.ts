export namespace Contracts {

    export interface IView<T> {
        onQuerySuccess(result: T): void;
        onQueryError(error: any): void;
    }

    export interface IPresenter {
        onDestroy(): void;
        onQuery(): void;
    }

    export interface IInteractor {
        onDestroy(): void;
        onQuery(): void;
    }

    export interface IInteractorOutput<T> {
        onQuerySuccess(result: T): void;
        onQueryError(error: any): void;
    }

    export interface IRouter {
        onDestroy(): void;
    }

}
