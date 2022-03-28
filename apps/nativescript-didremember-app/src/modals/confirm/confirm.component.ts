import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'ns-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {

  constructor(
    private params: ModalDialogParams
  ) { }

  closeModal = (): void => {
    this.params.closeCallback('asdasdsadasd');
  }
}
