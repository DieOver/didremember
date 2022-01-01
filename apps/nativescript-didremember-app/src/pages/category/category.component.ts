import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  postits: IPostit[] = [];
  postits$: Subscription;

  categoryForm: FormGroup = this.fb.group({
    name: [''],
  });

  constructor(
    private fb: FormBuilder,
    private postitService: PostitServiceContract
  ) {}

  ngOnInit(): void {
    this.postits$ = this.postitService.postits.subscribe({
      next: (res) => {
        this.postits = res;
      },
      error: (error) => {
        console.error('categorys', error);
        this.postits = [];
      }
    });
  }

  save = (): void => {
    if (!this.categoryForm.valid) return;
    const postit: IPostit = {
      name: this.categoryForm.controls.name.value,
      id: Utils.getUniqueId(2),
      count: 0,
    };
    this.postitService.add(postit);
  };
}
