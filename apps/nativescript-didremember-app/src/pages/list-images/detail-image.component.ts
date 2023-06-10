import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-detail-image',
  templateUrl: './detail-image.component.html',
  styleUrls: ['./detail-image.component.scss'],
})
export class DetailImageComponent {

  nameImageAnimated = '';

  constructor(
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute
  ) {
    this.nameImageAnimated = this.activatedRoute.snapshot.queryParamMap.get('nameImageAnimated');
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

}
