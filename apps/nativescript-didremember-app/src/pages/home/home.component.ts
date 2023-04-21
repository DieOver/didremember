import { Component, OnDestroy, OnInit } from '@angular/core';
import { Screen, knownFolders } from '@nativescript/core';
import { IPostit } from '../../shared/interfaces/postit.interface';
import { RouterExtensions } from '@nativescript/angular';
import { Subscription } from 'rxjs';
import { PostitServiceContract } from '../../shared/services/postit/postit.service.contract';
import { on } from '@nativescript/core/application';
import { OrientationChangedEventData } from '@nativescript/core';
import { off } from '@nativescript/core/application';
import * as Https from '@nativescript-community/https';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  sizeScreen = 0;
  postits: IPostit[] = [];
  postits$: Subscription;

  constructor(
    private postitService: PostitServiceContract,
    private router: RouterExtensions
  ) {
    this.sizeScreen = Screen.mainScreen.widthDIPs / 2 - 24;
  }

  ngOnInit(): void {
    const dir = knownFolders.currentApp().getFolder('assets');
    console.log('dir', dir);
    const certificate = dir.getFile('httpbin.org.cer').path;
    console.log('certificate', certificate);
    Https.enableSSLPinning({ host: 'httpbin.org', commonName: 'httpbin.org', certificate });

    Https.request({
      url: 'https://httpbin.org/get',
      method: 'GET',
      timeout: 30,
    }).then(function (response) {
      console.log('Https.request response', response);
    }).catch(function (error) {
      console.error('Https.request error', error);
    });

    // Https.request({
    //   url: 'https://openapi-int.hdi.com.br/corporate/security/v1/authorize?key=AIzaSyDENSB_k_EPJQTlGJWaLHJIFbP5FAJOiwc',
    //   method: 'POST',
    //   timeout: 30,
    //   body: {
    //     "clientId": "23446236000151",
    //     "clientSecret": "aae25f1df6f7662782c1625db3d30176",
    //     "grantType": "resource_owner-customer"
    //   },
    //   headers: {
    //     "X-Company-Id": "0036",
    //     "X-Application-Id": "003600001",
    //     "X-User-Id": "01",
    //     "X-Trace-Id": "api-ins-app-segurado",
    //     "companyId": "01"
    //   }
    // }).then((response) => {
    //   console.log('Https.request response', JSON.parse(response.content.toString()));
    // }).catch((error) => {
    //   console.error('Https.request error', error);
    // });

    this.postits$ = this.postitService.postits.subscribe({
      next: (res) => {
        this.postits = res;
      },
      error: (error) => {
        console.error('categorys', error);
        this.postits = [];
      },
    });
    on("orientationChanged", (evt: OrientationChangedEventData) => {
      console.log('orientationChanged', evt.newValue);
    });
  }

  ngOnDestroy(): void {
    this.postits$.unsubscribe();
    off("orientationChanged", () => {
      console.log('remove watch orientationChanged');
    });
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
