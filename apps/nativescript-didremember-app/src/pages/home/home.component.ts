import { Component, OnDestroy, OnInit } from '@angular/core';
import { Screen } from '@nativescript/core';
import { IPostit } from '../../shared/interfaces/postit.interface';
import { RouterExtensions } from '@nativescript/angular';
import { Subscription } from 'rxjs';
import { PostitServiceContract } from '../../shared/services/postit/postit.service.contract';
import { on } from '@nativescript/core/application';
import { OrientationChangedEventData } from '@nativescript/core';
import { off } from '@nativescript/core/application';

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
