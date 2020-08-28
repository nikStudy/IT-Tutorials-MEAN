import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntriesComponent } from './entries/entries.component';
import { ActivateGuard } from './activate.guard';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [ActivateGuard]},
  {path: 'entries', component: EntriesComponent, canActivate: [ActivateGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
