import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../interfaces/item.interface';
import { ItemsServiceContract } from './items.service.contract';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../../utils/util';

@Injectable({ providedIn: 'root' })
export class ItemsServiceMock implements ItemsServiceContract {
  constructor(private http: HttpClient) {}

  items(): Observable<Item[]> {
    return this.http.get<Item[]>('assets/mocks/items.json');
  }

  item(id: number): Observable<Item> {
    return this.http.get<Item>(
      Utils.replaceUrl('assets/mocks/items.json', { id })
    );
  }
}
