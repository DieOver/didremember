import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ItemsServiceContract } from "./items.service.contract";
import { Item } from "../../../shared/interfaces/item.interface";
import { HttpServiceContract } from "../../../shared/services/http/http.service.contract";
import { HttpService } from "../../../shared/services/http/http.service";

@Injectable({ providedIn: "root" })
export class ItemsService implements ItemsServiceContract {

    constructor(
        @Inject(HttpService) private http: HttpServiceContract
    ) {}

    items(): Observable<Item[]> {
      return this.http.get<Item[]>(`https://jsonplaceholder.typicode.com/todos/`);
    }

    item(id: number): Observable<Item> {
        return this.http.get<Item>(`https://jsonplaceholder.typicode.com/todos/${id}`);
    }

}

