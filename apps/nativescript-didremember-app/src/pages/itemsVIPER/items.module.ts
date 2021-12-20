import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ComponentsModule } from "../../shared/components/components.module";
import { ItemsComponent } from "../itemsVIPER/items.component";

const routes: Routes = [
    { path: "", component: ItemsComponent },
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes),
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ComponentsModule
    ],
    declarations: [
        ItemsComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ItemsModule { }
