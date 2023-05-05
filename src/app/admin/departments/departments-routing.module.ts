import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AllDepartmentsComponent } from './all-departments/all-departments.component';
import { DetailDepartmentComponent } from './detail-department/detail-department.component';
import { Page404Component } from "../../authentication/page404/page404.component";

const routes: Routes = [
  {
    path: "allDepartments",
    component: AllDepartmentsComponent,
  },
  {
    path: ":department",
    component: DetailDepartmentComponent,
  },

  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentsRoutingModule { }
