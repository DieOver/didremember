import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular';
import { confirm, ConfirmOptions, TextField } from '@nativescript/core';
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
  tfName: TextField = null;

  categoryForm: FormGroup = this.fb.group({
    id: ['', []],
    name: ['', [Validators.required, Validators.minLength(4)]],
    count: ['', []],
  });

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
    // this.selectPostit = {} as IPostit;
    // this.postitService.remove(ev.id);
    const opts: ConfirmOptions = {
      message: 'Deseja realmente deletar?',
      title: 'Atenção',
      okButtonText: 'Sim!',
      cancelButtonText: 'Não!',
      cancelable: false
    };
    confirm(opts).then((res) => {
      console.log('res', res);
      if (res) {
        this.selectPostit = {} as IPostit;
        this.postitService.remove(ev.id);
        this.categoryForm.reset();
      }
    });
  }

  abrirModal(): void {
    const options: ModalDialogOptions = {
      context: {},
      fullscreen: true,
      ios: {
        presentationStyle: UIModalPresentationStyle.OverFullScreen,
      }
    };
    this.modal.showModal(ConfirmComponent, options).then((res) => {
      console.log('modal', res);
    });
  }

  get fc() {
    return this.categoryForm.controls;
  }

  nameProps(ev: TextField): void {
    this.tfName = ev;
  }

  cancel = (): void => {
    this.selectPostit = {} as IPostit;
    this.categoryForm.reset();
  };

  save(): void {
    if (!this.categoryForm.valid) return;
    const postit: IPostit = {
      name: this.fc.name.value,
      id: Utils.getUniqueId(2),
      count: 0,
    };
    this.postitService.add(postit);
    this.categoryForm.reset();
  };

  edit(): void {
    if (!this.categoryForm.valid) return;
    const postit: IPostit = {
      name: this.fc.name.value,
      id: this.fc.id.value,
      count: this.fc.count.value,
    };
    this.postitService.edit(postit);
    this.categoryForm.reset();
    this.selectPostit = {} as IPostit;
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
