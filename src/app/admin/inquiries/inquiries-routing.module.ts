import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from "../../authentication/page404/page404.component";
import { AddInquiriesComponent } from './add-inquiries/add-inquiries.component';
import { AllInquiriesComponent } from './all-inquiries/all-inquiries.component';
import { DetailInquiryComponent } from './detail-inquiry/detail-inquiry.component';


const routes: Routes = [
  {
    path: "addInquiry",
    component: AddInquiriesComponent,
  },
  {
    path: "allInquiry",
    component: AllInquiriesComponent,
  },
  {
    path: "detailInquiry/:id",
    component: DetailInquiryComponent,
  },

  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiriesRoutingModule { }
