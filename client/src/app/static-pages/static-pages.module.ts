import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticPagesRoutingModule } from './static-pages-routing.module';
import { PagesComponent } from './pages/pages.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PagesComponent, ContactUsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StaticPagesRoutingModule
  ]
})
export class StaticPagesModule { }
