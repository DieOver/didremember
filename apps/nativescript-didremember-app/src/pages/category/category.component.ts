import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IPostit } from '../../shared/interfaces/postit.interface';
import { PostitServiceContract } from '../../shared/services/postit/postit.service.contract';
import { Utils } from '../../shared/utils/util';

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
    name: ['', [Validators.required, Validators.minLength(2)]],
    count: ['', []],
  });

  constructor(
    private fb: FormBuilder,
    private postitService: PostitServiceContract
  ) {}

  get f() {
    return this.categoryForm.controls;
  }

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

  cancel = (): void => {
    this.selectPostit = {} as IPostit;
    this.categoryForm.reset();
  };

  save = (): void => {
    if (!this.categoryForm.valid) return;
    const postit: IPostit = {
      name: this.categoryForm.controls.name.value,
      id: Utils.getUniqueId(2),
      count: 0,
    };
    this.postitService.add(postit);
    this.categoryForm.reset();
  };

  edit = (): void => {
    if (!this.categoryForm.valid) return;
    const postit: IPostit = {
      name: this.categoryForm.controls.name.value,
      id: this.categoryForm.controls.id.value,
      count: this.categoryForm.controls.count.value,
    };
    this.postitService.edit(postit);
    this.categoryForm.reset();
    this.selectPostit = {} as IPostit;
  };

  selectItem(ev: IPostit) {
    this.selectPostit = ev;
    this.categoryForm.setValue({
      id: ev.id,
      name: ev.name,
      count: ev.count,
    });
  }

  deleteItem(ev: IPostit) {
    this.selectPostit = {} as IPostit;
    this.postitService.remove(ev.id);
  }

  submit = () => {
    if (this.selectPostit?.id) {
      this.edit();
    } else {
      this.save();
    }
  };
}
