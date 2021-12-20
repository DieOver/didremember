import { Component, OnDestroy, OnInit } from "@angular/core";
import { ItemsContract } from "./items.contract";
import { ItemsPresenter } from "./items.presenter";
import { Item } from "../../shared/interfaces/item.interface";
import { ItemsServiceContract } from "../../shared/services/items/items.service.contract";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit, OnDestroy, ItemsContract.View {

    presenter: ItemsContract.Presenter;

    todos: Item[] = [];
    todo: Item = {} as Item;

    constructor(
        public itemsS: ItemsServiceContract
    ) {
        this.presenter = new ItemsPresenter(this, itemsS);
    }

    ngOnInit(): void {
        this.presenter.onQuery();
    }

    ngOnDestroy(): void {
        this.presenter.onDestroy();
        this.presenter = null;
    }

    onClickItem(item: Item): void {
        this.presenter.onClickItem(item);
    }

    onQuerySuccess(result: Item[]): void {
        this.todos = result;
        console.dir(this.todos);
    }

    onQueryError(error: any): void {
        console.error("onQueryError", error);
    }

    onClickItemSuccess(item: Item): void {
        this.todo = item;
        console.dir(this.todo);
        this.presenter.navigateToDetail(item);
    }

    onClickItemError(error: any): void {
        console.error("onClickItemError", error);
    }

}
