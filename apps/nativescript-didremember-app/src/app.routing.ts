import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

const routes: Routes = [
  { path: "", redirectTo: "/itemsMVC", pathMatch: "full" },
  {
    path: "itemsMVC",
    loadChildren: () => import("./pages/itemsMVC/items.module").then((m) => m.ItemsMVCModule),
  },
  {
    path: "itemsVIPER",
    loadChildren: () => import("./pages/itemsVIPER/items.module").then((m) => m.ItemsModule),
  }
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule { }
