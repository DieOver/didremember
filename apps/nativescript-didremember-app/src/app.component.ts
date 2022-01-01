import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer';
import { filter } from 'rxjs/operators';
import { Application } from '@nativescript/core';
import { Utils } from './shared/utils/util';
import { PostitServiceContract } from './shared/services/postit/postit.service.contract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private _activatedUrl: string;
  private _sideDrawerTransition: DrawerTransitionBase;

  appVersion = '0.0';

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private postitService: PostitServiceContract
  ) {
    // Use the component constructor to inject services.
  }

  ngOnInit(): void {
    Utils.getVersionName()
      .then((version) => {
        this.appVersion = `v${version}`;
      })
      .catch((error) => {
        console.error('appVersion', error);
      });

    this.postitService.init();

    this._activatedUrl = '/home';
    this._sideDrawerTransition = new SlideInOnTopTransition();

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(
        (event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects)
      );
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute]);

    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.closeDrawer();
  }
}
