import { Component, OnDestroy, OnInit } from '@angular/core';
import { Screen } from '@nativescript/core';
import { IPostit } from '../../shared/interfaces/postit.interface';
import { RouterExtensions } from '@nativescript/angular';
import { Subscription } from 'rxjs';
import { PostitServiceContract } from '../../shared/services/postit/postit.service.contract';

@Component({
  selector: 'ns-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  widthDIPs = Screen.mainScreen.widthDIPs;
  sizeScreen = 0;
  postits: IPostit[] = [];
  postit: IPostit = {} as IPostit;
  postits$: Subscription;

  constructor(
    private postitService: PostitServiceContract,
    private routerExtensions: RouterExtensions
  ) {
    this.sizeScreen = this.widthDIPs / 2 - 24;
  }

  ngOnInit(): void {
    this.postits$ = this.postitService.postits.subscribe({
      next: (res) => {
        this.postits = res;
      },
      error: (error) => {
        console.error('categorys', error);
        this.postits = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.postits$.unsubscribe();
  }

  onClickItem(postit: IPostit): void {
    this.postit = this.postitService.find(postit.id);
    if (this.postit.id) {
      this.navigateToDetail(postit);
    }
  }

  navigateToRegisterCategory(): void {
    this.routerExtensions.navigate(['/category']);
  }

  navigateToDetail(item: IPostit): void {
    this.routerExtensions.navigate(['/category', item.id]);
  }

  postitTrackBy = (postit: IPostit): string => postit.id;
}
