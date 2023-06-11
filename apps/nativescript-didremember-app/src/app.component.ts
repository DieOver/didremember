import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { NavigationOptions, RouterExtensions } from '@nativescript/angular';
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import { Utils } from './shared/utils/util';
import { JailBreaker } from '@dieover/jail-breaker';
import { exit } from 'nativescript-exit';
import { IStatusBar } from './shared/interfaces/statusbar.interface';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public appVersion = '0.0';
  public sideDrawerTransition: DrawerTransitionBase = new SlideInOnTopTransition();

  private _activatedUrl: string;

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('jailBreaker isRooted', JailBreaker.isRooted());
    if (JailBreaker.isRooted()) {
      exit();
    } else {
      this._activatedUrl = '/home';
      this.appVersion = `v${(await Utils.getVersionName())}`;
      this.router.events.pipe(
        filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
      ).subscribe((e: RouterEvent) => {
        if (e instanceof NavigationStart) {
          this._activatedUrl = e.url;
          this.changeStatusBarText(e.url);
        }
      });
    }
  }

  changeStatusBarText(url: string): void {
    console.log('changeStatusBarText', url);
    let param: IStatusBar = { type: 'light', color: '' };
    switch (url) {
      case String(url.match(/\/home$/gi)): param = { type: 'light', color: '' }; break;
      case String(url.match(/\/manarola$/gi)): param = { type: 'light', color: '' }; break;
      case String(url.match(/\/pokemon$/gi)): param = { type: 'light', color: '' }; break;
      case String(url.match(/\/category$/gi)): param = { type: 'light', color: '' }; break;
      case String(url.match(/\/questions\/(\w{4}-\w{4})$/gi)): param = { type: 'light', color: '' }; break;
      case String(url.match(/\/list-images$/gi)): param = { type: 'dark', color: '' }; break;
      default: param = { type: 'dark', color: '' }; break;
    }
    Utils.setStatusBarColor(param);
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
    const navigationOptions: NavigationOptions = {
      // transition: SharedTransition.custom(new PageTransition())
    };

    this.routerExtensions.navigateByUrl(navItemRoute, navigationOptions);

    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.closeDrawer();
  }
}
