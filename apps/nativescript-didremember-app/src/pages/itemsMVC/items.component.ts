import { Component, OnInit } from "@angular/core";
import { Item } from "../../shared/interfaces/item.interface";
import { ItemsServiceContract } from "../../shared/services/items/items.service.contract";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls: ["./items.component.scss"],
})
export class ItemsMVCComponent implements OnInit {

    constructor(
        public itemsS: ItemsServiceContract,
    ) {}

    todos: Item[] = [];
    todo: Item = {} as Item;

    ngOnInit(): void {
        this.onQuery();
    }

    onQuery(): void {
        this.itemsS.items().subscribe(
            (result) => {
                this.todos = result;
                console.dir(this.todos);
            },
            (error) => {
                console.error("onQueryError", error);
            }
        );
    }

    onClickItem(item: Item): void {
        this.itemsS.item(item.id).subscribe(
            (result) => {
                this.todo = result;
                console.dir(this.todo);
                this.navigateToDetail(item);
            },
            (error) => {
                console.error("onClickItemError", error);
            }
        );
    }

    navigateToDetail(item: Item): void {
        console.log("FINGE QUE ESTOU MUDANDO PARA " + `/detail/${item.id}`);
    }
}
