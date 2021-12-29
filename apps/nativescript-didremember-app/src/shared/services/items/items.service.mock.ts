import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Item } from '../../interfaces/item.interface';
import { ItemsServiceContract } from './items.service.contract';
import { switchMap } from 'rxjs/operators';
import { items } from '../../../assets/mocks/items';

@Injectable({ providedIn: 'root' })
export class ItemsServiceMock implements ItemsServiceContract {
  items(): Observable<Item[]> {
    return of<Item[]>(items);
  }

  item(id: number): Observable<Item> {
    return of<Item>(items.find((item) => item.id == id)).pipe(
      switchMap((switchItem: Item) =>
        switchItem ? of(switchItem) : throwError(404)
      )
    );
  }
}
