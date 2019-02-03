import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LinksComponent } from "./components/links/links.component";
import { ShrinkComponent } from "./components/shrink/shrink.component";

const routes: Routes = [
    { path: "", component: LinksComponent },
    { path: "shrink", component: ShrinkComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }