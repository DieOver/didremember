import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPostit } from '../../shared/interfaces/postit.interface';
import { RouterExtensions } from '@nativescript/angular';
import { Subscription } from 'rxjs';
import { PostitServiceContract } from '../../shared/services/postit/postit.service.contract';
import { OrientationChangedEventData, on } from '@nativescript/core/application';
import { off } from '@nativescript/core/application';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  postits: IPostit[] = [];
  postits$: Subscription = null;

  constructor(
    private postitService: PostitServiceContract,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.postits$ = this.postitService.postits.subscribe({
      next: (res) => {
        console.log('categorys', res);
        this.postits = res;
      },
      error: (error) => {
        console.error('categorys', error);
        this.postits = [];
      },
      complete: () => {
        console.log('categorys FINISHED!!');
      },
    });

    on('orientationChanged', (evt: OrientationChangedEventData) => {
      console.log('orientationChanged', evt.newValue);
    });
  }

  ngOnDestroy(): void {
    if (this.postits$) {
      this.postits$.unsubscribe();
      this.postits$ = null;
    }
    off('orientationChanged', () => {
      console.log('remove watch orientationChanged');
    });
  }

  onClickItem(postit: IPostit): void {
    const findedPostit = this.postitService.find(postit.id);
    if (findedPostit?.id) {
      this.navigateToDetail(findedPostit);
    }
  }

  navigateToRegisterCategory(): void {
    this.routerExtensions.navigate(['/category']);
  }

  navigateToDetail(item: IPostit): void {
    this.routerExtensions.navigate(['/questions/', item.id]);
  }

  postitTrackBy(postit: IPostit): string {
    return postit.id;
  }
}
