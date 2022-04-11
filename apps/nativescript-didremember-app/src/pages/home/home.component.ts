import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LoadEventData, Screen, WebView } from '@nativescript/core';
import { IPostit } from '../../shared/interfaces/postit.interface';
import { RouterExtensions } from '@nativescript/angular';
import { Subscription } from 'rxjs';
import { PostitServiceContract } from '../../shared/services/postit/postit.service.contract';
import { WebViewInterface } from 'nativescript-webview-interface';
import { LoginService } from '../../shared/services/login/login.service';
import { knownFolders } from '@nativescript/core/file-system';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  widthDIPs = Screen.mainScreen.widthDIPs;
  sizeScreen = 0;
  postits: IPostit[] = [];
  postits$: Subscription;

  showWebView = true;
  oWebViewInterface: WebViewInterface = null;
  @ViewChild('myWebView', { static: false }) myWebView: ElementRef<WebView>;

  pages = [
    'ReportSection0eeda7bef3e948b0ed21',
    'ReportSection7a7f6d55333474c08367',
    'ReportSectionde828a655be92370b8a2',
    'ReportSectionf677bdc9e7dd10dbd05b',
    'ReportSectionf883f1a230d5a4d86c30',
    'ReportSectiona4fc8f7ed51a247090d0',
    'ReportSectionebbf7984a5c953a98e6c',
    'ReportSectiond68e342a090280909abd',
  ];
  indexPage = 0;
  webviewSrc = `file:///${knownFolders.currentApp().path}/assets/web/index.html`;

  access_token: string;

  constructor(
    private postitService: PostitServiceContract,
    private router: RouterExtensions,
    private loginService: LoginService
  ) {
    this.sizeScreen = this.widthDIPs / 2 - 24;
  }

  configureWebView() {
    setTimeout(() => {
      const settings = this.myWebView.nativeElement.android.getSettings();
      settings.setAllowFileAccess(true);
      settings.setAllowContentAccess(true);
      settings.setJavaScriptEnabled(true);
      settings.setDomStorageEnabled(true);
      settings.setDatabaseEnabled(true);
      settings.setLoadWithOverviewMode(true);
      settings.setSupportZoom(true);
      settings.setBuiltInZoomControls(false);
      settings.setDisplayZoomControls(true);
      settings.setJavaScriptCanOpenWindowsAutomatically(true);
      settings.setPluginsEnabled(true);
      settings.setAllowFileAccessFromFileURLs(true);
      settings.setAllowUniversalAccessFromFileURLs(true);
      if (android.os.Build.VERSION.SDK_INT >= 21) {
          settings.setMixedContentMode(android.webkit.WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
      }
      this.oWebViewInterface = new WebViewInterface(
        this.myWebView.nativeElement,
        this.webviewSrc
      );
      this.myWebView.nativeElement.src = this.webviewSrc;
      console.log('configureWebView!');
    }, 1000);
  }

  toogleWebView = () => (this.showWebView = !this.showWebView);

  onLoadStarted(args: LoadEventData) {
    const webView = args.object as WebView;
    if (!args.error) {
      console.log('Load Start');
      console.log(`EventName: ${args.eventName}`);
      console.log(`NavigationType: ${args.navigationType}`);
      console.log(`Url: ${args.url}`);
      this.configureWebView();
    } else {
      console.log(`EventName: ${args.eventName}`);
      console.log(`Error: ${args.error}`);
    }
  }

  onLoadFinished(args: LoadEventData) {
    const webView = args.object as WebView;
    if (!args.error) {
      console.log('Load Finished');
      console.log(`EventName: ${args.eventName}`);
      console.log(`NavigationType: ${args.navigationType}`);
      console.log(`Url: ${args.url}`);
    } else {
      console.log(`EventName: ${args.eventName}`);
      console.log(`Error: ${args.error}`);
    }
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

  async makeLogin() {
    try {
      const result: any = await this.loginService.login().toPromise();
      console.log('loginService', result);
      this.access_token = result.access_token;
    } catch (error) {
      console.error('loginService error', error)
    }
  }

  async callJsFunction() {
    if (!this.access_token) {
      await this.makeLogin();
    }
    this.oWebViewInterface.callJSFunction('loadPowerBI', [
      this.access_token,
      this.pages[this.indexPage],
      '',
      '',
      '',
      'Atual',
    ]);
  }

  ngOnDestroy(): void {
    this.postits$.unsubscribe();
  }

  onClickItem(postit: IPostit): void {
    const findedPostit = this.postitService.find(postit.id);
    if (findedPostit.id) {
      this.navigateToDetail(findedPostit);
    }
  }

  navigateToRegisterCategory(): void {
    this.router.navigateByUrl('/category');
  }

  navigateToDetail(item: IPostit): void {
    this.router.navigateByUrl(`/questions/${item.id}`);
  }

  postitTrackBy = (postit: IPostit): string => postit.id;
}
