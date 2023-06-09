import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { PokemonComponent } from './pokemon.component';
import { PokemonRouting } from './pokemon.routing';

@NgModule({
  imports: [
    PokemonRouting,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ComponentsModule,
  ],
  declarations: [PokemonComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PokemonModule {}
