import { Page404Component } from "../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AttendancesComponent } from "./attendance/attendance.component";
import { MyTeamsComponent } from "./myteam/myteam.component";
import { SettingsComponent } from "./settings/settings.component";
import { MyLeavesComponent } from "./my-leaves/my-leaves.component";
import { MyProjectsComponent } from "./my-projects/my-projects.component";
import { MyTasksComponent } from "./my-tasks/my-tasks.component";
import { AllprojectsComponent } from "../admin/projects/all-projects/all-projects.component";
import { ProjectDetailsComponent } from "../admin/projects/project-details/project-details.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "attendance",
    component: AttendancesComponent,
  },
  {
    path: "myteam",
    component: MyTeamsComponent,
  },
  {
    path: "myprojects",
    component: MyProjectsComponent,
  },
  {
    path: "mytasks",
    component: MyTasksComponent,
  },
  {
    path: "myleaves",
    component: MyLeavesComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },

  {
    path: "departments",
    loadChildren: () =>     
      import("../admin/departments/departments.module").then((m) => m.DepartmentsModule),
  },

  {
    path: "projects",
    loadChildren: () =>
      import("../admin/projects/projects.module").then((m) => m.ProjectsModule),
  },

  {
    path: "allProjects",
    component: AllprojectsComponent,
  },
  {
    path: "projectDetails/:id",
    component: ProjectDetailsComponent,
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
