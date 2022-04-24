import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { on } from '@nativescript/core/application';
import { OrientationChangedEventData } from '@nativescript/core';
import { off } from '@nativescript/core/application';
import { StackLayout } from '@nativescript/core';

@Component({
  selector: 'ns-manarola',
  templateUrl: './manarola.component.html',
  styleUrls: ['./manarola.component.scss'],
})
export class ManarolaComponent implements OnInit, OnDestroy {
  spaceCardMidle = 0;
  @ViewChild('cardMiddle', { static: true }) cardMiddle: ElementRef<StackLayout>;

  cardMiddleLoaded() {
    setTimeout(() => {
      this.spaceCardMidle = this.cardMiddle.nativeElement.getActualSize().height / 2 + 20;
      console.log('cardMiddleLoaded', this.spaceCardMidle);
    }, 1);
  }

  ngOnInit(): void {
    on("orientationChanged", (evt: OrientationChangedEventData) => {
      console.log('orientationChanged', evt.newValue);
    });
  }

  ngOnDestroy(): void {
    off("orientationChanged", () => {
      console.log('remove watch orientationChanged');
    });
  }

}
