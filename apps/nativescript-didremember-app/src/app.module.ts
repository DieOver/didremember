import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptHttpClientModule,
  NativeScriptModule,
} from '@nativescript/angular';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ItemsServiceContract } from './shared/services/items/items.service.contract';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from './shared/interceptors/my.interceptor';
import { ItemsService } from './shared/services/items/items.service';
import { ItemsServiceMock } from './shared/services/items/items.service.mock';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
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
      useClass: ItemsService,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
