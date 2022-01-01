import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptHttpClientModule,
  NativeScriptModule,
} from '@nativescript/angular';
import { AppComponent } from './app.component';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from './shared/interceptors/my.interceptor';
import { ItemsServiceContract } from './shared/services/items/items.service.contract';
import { ItemsServiceMock } from './shared/services/items/items.service.mock';
import { ItemsService } from './shared/services/items/items.service';
import { PostitServiceContract } from './shared/services/postit/postit.service.contract';
import { PostitService } from './shared/services/postit/postit.service';
import { AppRouting } from './app.routing';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppRouting,
    NativeScriptModule,
    NativeScriptHttpClientModule,
    NativeScriptUISideDrawerModule,
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    },
    {
      provide: ItemsServiceContract,
      useClass: ItemsServiceMock,
    },
    {
      provide: PostitServiceContract,
      useClass: PostitService,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
