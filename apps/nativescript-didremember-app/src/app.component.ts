import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { NavigationOptions, RouterExtensions } from '@nativescript/angular';
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideAlongTransition,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer';
import { filter } from 'rxjs/operators';
import { Application, Utils as U } from '@nativescript/core';
import { Utils } from './shared/utils/util';
import { PostitServiceContract } from './shared/services/postit/postit.service.contract';
import { IStatusBar } from './shared/interfaces/statusbar.interface';
import { JailBreaker } from '@dieover/jail-breaker';
import { exit } from 'nativescript-exit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  public appVersion = '0.0';
  public sideDrawerTransition: DrawerTransitionBase = new SlideInOnTopTransition();

  private _activatedUrl: string;

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private postitService: PostitServiceContract
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('jailBreaker isRooted', JailBreaker.isRooted());
    if (JailBreaker.isRooted()) {
      exit();
    } else {
      this._activatedUrl = '/home';
      this.appVersion = `v${(await Utils.getVersionName())}`;
      this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this._activatedUrl = event.urlAfterRedirects;
        this.changeStatusBarText(event.urlAfterRedirects);
      });
    }
  }

  changeStatusBarText(url: string): void {
    console.log('changeStatusBarText', url);
    const param: IStatusBar = { type: 'light', color: '' };
    switch (url) {
      case String(url.match(/\/home$/gi)):
        param.type = 'light'; break;

      case String(url.match(/\/category$/gi)):
      case String(url.match(/\/questions\/(\w{4}-\w{4})$/gi)):
        param.type = 'dark'; break;

      default:
        param.type = 'light'; break;
    }
    Utils.setStatusBarColor(param);
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
    const navigationOptions: NavigationOptions = {};
    this.routerExtensions.navigate([navItemRoute], navigationOptions);

    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.closeDrawer();
  }
}
