import { ItemsContract } from "./items.contract";

export class ItemsRouter implements ItemsContract.Router {

    view: ItemsContract.View;

    constructor(view: ItemsContract.View) {
        this.view = view;
    }

    onDestroy(): void {
        this.view = null;
    }

    navigateToDetail(page: string): void {
        console.log("FINGE QUE ESTOU MUDANDO PARA " + page);
    }

}
