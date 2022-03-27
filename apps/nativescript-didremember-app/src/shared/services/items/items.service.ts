import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsServiceContract } from './items.service.contract';
import { Item } from '../../interfaces/item.interface';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../../utils/util';
import { endpoints } from '../../../../src/environments/endpoints';

@Injectable({ providedIn: 'root' })
export class ItemsService implements ItemsServiceContract {
  constructor(private http: HttpClient) {}

  items(): Observable<Item[]> {
    return this.http.get<Item[]>(Utils.replaceUrl(`${endpoints.items.todos}`));
  }

  item(id: number): Observable<Item> {
    return this.http.get<Item>(
      Utils.replaceUrl(`${endpoints.items.todo}`, { id })
    );
  }
}
