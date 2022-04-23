import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WebView, isAndroid, LoadEventData } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { WebViewInterface } from 'nativescript-webview-interface';
import { LoginService } from '../../shared/services/login/login.service';
import { knownFolders } from '@nativescript/core/file-system';

@Component({
  selector: 'ns-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss'],
})
export class CockpitComponent implements OnInit {

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

  oauth_token: string;
  powerbi_token: string;
  perfil = {
    "usuario": "",
    "nome": "",
    "email": ""
  }

  constructor(
    private router: RouterExtensions,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    await this.oauth();
    await this.login();
    await this.powerbi();
    setTimeout(() => {
      this.callJsFunction();
    }, 2000);
  }

  configureWebView() {
    setTimeout(() => {
      if (isAndroid) {
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

  async oauth() {
    try {
      const result: any = await this.loginService.oauth().toPromise();
      console.log('oauth', result);
      this.oauth_token = result.access_token;
    } catch (error) {
      console.error('oauth error', error)
    }
  }

  async login() {
    try {
      const result: any = await this.loginService.login(this.oauth_token).toPromise();
      console.log('login', result);
      this.perfil = result.login;
    } catch (error) {
      console.error('login error', error)
    }
  }

  async powerbi() {
    try {
      const result: any = await this.loginService.powerbi(this.oauth_token).toPromise();
      console.log('powerbi', result);
      this.powerbi_token = result.accessToken;
    } catch (error) {
      console.error('powerbi error', error)
    }
  }

  changePage(pageNumber: number) {
    this.indexPage = pageNumber;
    this.oWebViewInterface.callJSFunction('changeSection', [
      this.pages[this.indexPage]
    ]);
  }

  async callJsFunction() {
    this.oWebViewInterface.callJSFunction('loadPowerBI', [
      this.powerbi_token,
      this.pages[this.indexPage],
      this.perfil.usuario,
      '',
      '',
      'Atual',
    ]);
  }

  async changeJs() {
    this.oWebViewInterface.callJSFunction('changeSection', [
      this.pages[this.indexPage]
    ]);
  }

}
