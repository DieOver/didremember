import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {

  nameImageAnimated = '';
  imageSrc = '';
  name = '';
  colorBg = 'gray';

  constructor(
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute
  ) {
    this.nameImageAnimated = this.activatedRoute.snapshot.queryParamMap.get('nameImageAnimated');
    this.imageSrc = this.activatedRoute.snapshot.queryParamMap.get('imageSrc');
    this.name = this.activatedRoute.snapshot.queryParamMap.get('name');
    this.colorBg = this.activatedRoute.snapshot.queryParamMap.get('colorBg');
  }

}
