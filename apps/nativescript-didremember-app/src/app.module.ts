import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptHttpClientModule,
  NativeScriptModule,
} from '@nativescript/angular';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ItemsServiceContract } from './shared/services/items/items.service.contract';
import { ItemsServiceMock } from './shared/services/items/items.service.mock';
import { ItemsService } from './shared/services/items/items.service';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptHttpClientModule, AppRoutingModule],
  declarations: [AppComponent],
  providers: [
    {
      provide: ItemsServiceContract,
      useClass: ItemsServiceMock,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
