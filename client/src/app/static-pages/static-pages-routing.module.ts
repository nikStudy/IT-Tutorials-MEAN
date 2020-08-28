import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


const routes: Routes = [
  {path: 'pages/:slug', component: PagesComponent},
  {path: 'contact', component: ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticPagesRoutingModule { }
