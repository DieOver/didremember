import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'did-card',
  templateUrl: './did-card.component.html',
  styleUrls: ['./did-card.component.scss']
})
export class DidCardComponent {

  @Input('count') count = "";
  @Input('name') name = "";

  @Output('emitTap') emitTap = new EventEmitter();

  emitTapFn() {
    this.emitTap.emit();
  }
}
