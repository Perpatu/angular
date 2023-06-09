import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "projects",
    loadChildren: () =>
      import("./projects/projects.module").then((m) => m.ProjectsModule),
  },
  {
    path: "inquiries",
    loadChildren: () =>
      import("./inquiries/inquiries.module").then((m) => m.InquiriesModule),
  },
  {
    path: "departments",
    loadChildren: () =>
      import("./departments/departments.module").then((m) => m.DepartmentsModule),
  },
  {
    path: "employees",
    loadChildren: () =>
      import("./employees/employees.module").then((m) => m.EmployeesModule),
  },
  {
    path: "clients",
    loadChildren: () =>
      import("./clients/clients.module").then((m) => m.ClientModule),
  },
  {
    path: "leaves",
    loadChildren: () =>
      import("./leaves/leaves.module").then((m) => m.LeavesModule),
  },
  {
    path: "accounts",
    loadChildren: () =>
      import("./accounts/accounts.module").then((m) => m.AccountsModule),
  },
  {
    path: "holidays",
    loadChildren: () =>
      import("./holidays/holidays.module").then((m) => m.HolidayModule),
  },
  {
    path: "attendance",
    loadChildren: () =>
      import("./attendance/attendance.module").then((m) => m.AttendanceModule),
  },
  {
    path: "archive",
    loadChildren: () =>
      import("./archive/archive.module").then((m) => m.ArchiveModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
