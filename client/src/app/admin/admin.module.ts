import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntriesComponent } from './entries/entries.component';
import { EntryService } from './entry.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivateGuard } from './activate.guard';

@NgModule({
  declarations: [DashboardComponent, EntriesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  providers: [EntryService, ActivateGuard]
})
export class AdminModule { }
