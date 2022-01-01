import { Component, OnDestroy, OnInit } from '@angular/core';
import { Screen } from '@nativescript/core';
import { PostitService } from '../../shared/services/postit/postit.service';
import { IPostit } from '../../shared/interfaces/postit.interface';
import { RouterExtensions } from '@nativescript/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  widthDIPs = Screen.mainScreen.widthDIPs;
  sizeScreen = 0;
  postits: IPostit[] = [];
  postit: IPostit = {} as IPostit;
  postits$: Subscription;

  constructor(
    private postitService: PostitService,
    private router: RouterExtensions
  ) {
    this.sizeScreen = this.widthDIPs / 2 - 24;
  }

  ngOnInit(): void {
    this.postits$ = this.postitService.postits.subscribe({
      next: (res) => {
        this.postits = res;
        console.log('categorys', this.postits);
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
    this.router.navigateByUrl('/category');
  }

  navigateToDetail(item: IPostit): void {
    this.router.navigateByUrl(`/category/${item.id}`);
  }

  postitTrackBy = (postit: IPostit): string => postit.id;
}
