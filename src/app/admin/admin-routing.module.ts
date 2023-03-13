import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddComponent } from "./add/add.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditComponent } from "./edit/edit.component";
import { LoginComponent } from "./login/login.component";
import { OrdersComponent } from "./orders/orders.component";
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { AuthGuard } from "../auth/services/auth.guard";

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'add',
        component: AddComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'product/:id/edit',
        component: EditComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutingModule { }