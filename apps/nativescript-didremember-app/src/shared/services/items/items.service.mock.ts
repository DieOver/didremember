import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsServiceContract } from './items.service.contract';
import { Item } from '../../interfaces/item.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ItemsServiceMock implements ItemsServiceContract {
  constructor(private http: HttpClient) {}

  items(): Observable<Item[]> {
    return this.http.get<Item[]>('assets/mocks/items.json');
  }

  item(id: number): Observable<Item> {
    return this.http.get<Item>('assets/mocks/item.json');
  }
}
