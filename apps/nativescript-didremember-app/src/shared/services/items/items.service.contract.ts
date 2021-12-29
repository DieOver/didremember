import { Observable } from 'rxjs';
import { Item } from '../../interfaces/item.interface';

export abstract class ItemsServiceContract {
  abstract items(): Observable<Item[]>;
  abstract item(id: number): Observable<Item>;
}
