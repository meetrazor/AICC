import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TrustCreateComponent } from "./trust-create/trust-create.component";

const routes: Routes = [{ path: "create", component: TrustCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrustRoutingModule {}
