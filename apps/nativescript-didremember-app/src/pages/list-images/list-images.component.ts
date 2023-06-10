import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { PageTransition, SharedTransition } from '@nativescript/core';

@Component({
  selector: 'ns-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss'],
})
export class ListImagesComponent {

  constructor(
    private routerExtensions: RouterExtensions
  ) {}

  goToDetail(nameImageAnimated: string) {
    this.routerExtensions.navigate(['list-images', 'detail'], {
      queryParams: {
        nameImageAnimated
      },
      transition: SharedTransition.custom(new PageTransition(), {
        pageEnd: {
          spring: {
            tension: 140,
            friction: 16
          }
        },
        pageReturn: {
          spring: {
            tension: 140,
            friction: 16
          }
        }
      })
    });
  }
}
