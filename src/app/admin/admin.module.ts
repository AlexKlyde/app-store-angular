import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthGuard } from '../auth/services/auth.guard';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    AddComponent,
    EditComponent,
    OrdersComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  providers: [AuthGuard]
})
export class AdminModule {

}
