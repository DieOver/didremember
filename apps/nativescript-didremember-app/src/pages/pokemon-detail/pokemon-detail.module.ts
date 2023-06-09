import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonDetailRouting } from './pokemon-detail.routing';

@NgModule({
  imports: [
    PokemonDetailRouting,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ComponentsModule,
  ],
  declarations: [PokemonDetailComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PokemonDetailModule {}
