import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-detail-image',
  templateUrl: './detail-image.component.html',
  styleUrls: ['./detail-image.component.scss'],
})
export class DetailImageComponent implements OnInit {

  nameImageAnimated = '';

  constructor(
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute
  ) {
    this.nameImageAnimated = this.activatedRoute.snapshot.queryParamMap.get('nameImageAnimated');
  }

  ngOnInit(): void {
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

}
