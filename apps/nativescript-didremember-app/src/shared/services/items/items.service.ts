import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsServiceContract } from './items.service.contract';
import { Item } from '../../../shared/interfaces/item.interface';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../../../../src/environments/endpoints';
import { Utils } from '../../utils/util';

@Injectable({ providedIn: 'root' })
export class ItemsService implements ItemsServiceContract {
  constructor(private http: HttpClient) {}

  items(): Observable<Item[]> {
    return this.http.get<Item[]>(
      Utils.replaceUrl(`${endpoints.items.todos}`)
    );
  }

  item(id: number): Observable<Item> {
    return this.http.get<Item>(
      Utils.replaceUrl(`${endpoints.items.todo}`, { id })
    );
  }
}
