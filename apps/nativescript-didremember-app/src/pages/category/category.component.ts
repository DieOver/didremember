import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular';
import { alert, ConfirmOptions } from '@nativescript/core';
import { Subscription } from 'rxjs';
import { IPostit } from '../../shared/interfaces/postit.interface';
import { PostitServiceContract } from '../../shared/services/postit/postit.service.contract';
import { Utils } from '../../shared/utils/util';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';

@Component({
  selector: 'ns-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  hoje: Date = new Date();
  selectPostit: IPostit = {} as IPostit;
  postits: IPostit[] = [];
  postits$: Subscription;

  categoryForm: FormGroup = this.fb.group({
    id: ['', []],
    name: ['', [Validators.required, Validators.minLength(4)]],
    count: ['', []],
  });

  get fc() {
    return this.categoryForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private postitService: PostitServiceContract,
    private modal: ModalDialogService
  ) {}

  ngOnInit(): void {
    this.postits$ = this.postitService.postits.subscribe({
      next: (res) => {
        this.postits = res;
      },
      error: (error) => {
        console.error('categorys', error);
        this.postits = [];
      },
    });
  }

  deleteItem(ev: IPostit): void {
    this.abrirModal(ev.id);
    // const opts: ConfirmOptions = {
    //   message: 'Deseja realmente deletar?',
    //   title: 'Atenção',
    //   okButtonText: 'Sim!',
    //   cancelButtonText: 'Não!',
    //   cancelable: false
    // };
    // confirm(opts).then((res) => {
    //   console.log('res', res);
    //   if (res) {
    //     this.postitService.remove(ev.id);
    //     this.resetForm();
    //   }
    // });
  }

  abrirModal(id: string): void {
    const options: ModalDialogOptions = {
      context: {},
      fullscreen: false,
      cancelable: false
    };
    this.modal.showModal(ConfirmComponent, options).then((res) => {
      console.log('modal', res);
      if (res) {
        this.postitService.remove(id);
        this.resetForm();
      }
    });
  }

  cancel = (): void => {
    this.resetForm();
  };

  resetForm() {
    this.selectPostit = {} as IPostit;
    this.categoryForm.reset();
    setTimeout(() => {
      this.categoryForm.markAsPristine();
      this.categoryForm.markAsUntouched();
    }, 20);
  }

  save(): void {
    if (!this.categoryForm.valid) {
      const opts: ConfirmOptions = {
        message: 'Verifique os campos',
        title: 'Atenção',
        okButtonText: 'Entendi',
        cancelable: false
      };
      alert(opts);
    } else {
      const postit: IPostit = {
        name: this.fc.name.value,
        id: Utils.getUniqueId(2),
        count: 0,
      };
      this.postitService.add(postit);
      this.resetForm();
    }
  };

  edit(): void {
    if (!this.categoryForm.valid) {
      const opts: ConfirmOptions = {
        message: 'Verifique os campos',
        title: 'Atenção',
        okButtonText: 'Entendi',
        cancelable: false
      };
      alert(opts);
    } else {
      const postit: IPostit = {
        name: this.fc.name.value,
        id: this.fc.id.value,
        count: this.fc.count.value,
      };
      this.postitService.edit(postit);
      this.resetForm();
    }
  };

  selectItem(ev: IPostit): void {
    this.selectPostit = ev;
    this.categoryForm.setValue({
      id: ev.id,
      name: ev.name,
      count: ev.count,
    });
  }

  submit = (): void => {
    if (this.selectPostit?.id) {
      this.edit();
    } else {
      this.save();
    }
  };
}
