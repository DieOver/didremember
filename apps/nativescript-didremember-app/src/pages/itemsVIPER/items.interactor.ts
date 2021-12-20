import { Item } from "../../shared/interfaces/item.interface";
import { ItemsServiceContract } from "../../shared/services/items/items.service.contract";
import { ItemsContract } from "./items.contract";

export class ItemsInteractor implements ItemsContract.Interactor {

    output: ItemsContract.InteractorOutput;
    itemsS: ItemsServiceContract;

    constructor(output: ItemsContract.InteractorOutput, itemsS: ItemsServiceContract) {
        this.output = output;
        this.itemsS = itemsS;
    }

    onDestroy(): void {
        this.output = null;
        this.itemsS = null;
    }

    onQuery(): void {
        this.itemsS.items().subscribe((res) => {
            this.output.onQuerySuccess(res);
        }, (error) => {
            this.output.onQueryError(error);
        });
    }

    onClickItem(item: Item): void {
        this.itemsS.item(item.id).subscribe((res) => {
            this.output.onClickItemSuccess(res);
        }, (error) => {
            this.output.onClickItemError(error);
        });
    }

}
