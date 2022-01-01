import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { IPostit } from '../../shared/interfaces/postit.interface';
import { PostitService } from '../../shared/services/postit/postit.service';
import { Utils } from '../../shared/utils/util';

@Component({
  selector: 'ns-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  hoje: Date = new Date();
  categorias: IPostit[] = [];

  categoryForm: FormGroup = this.fb.group({
    name: [''],
  });

  constructor(
    private fb: FormBuilder,
    private routerExtensions: RouterExtensions,
    private postitService: PostitService
  ) {}

  ngOnInit(): void {
    this.categorias = this.postitService.list();
  }

  save = (): void => {
    console.log(this.categoryForm.value);
    if (!this.categoryForm.valid) return;
    const postit: IPostit = {
      name: this.categoryForm.controls.name.value,
      id: Utils.getUniqueId(2),
      count: 0,
    };
    this.postitService.add(postit);
    this.routerExtensions.back();
  };
}
