import { Router, View } from './items.contract';

export class ItemsRouter implements Router {
  view: View;

  constructor(view: View) {
    this.view = view;
  }

  onDestroy(): void {
    this.view = null;
  }

  navigateToDetail(page: string): void {
    console.log('FINGE QUE ESTOU MUDANDO PARA ' + page);
  }
}
