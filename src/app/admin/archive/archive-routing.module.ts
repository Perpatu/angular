import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsArchiveComponent } from './projects-archive/projects-archive.component';
import { ProjectsDetailArchiveComponent } from './projects-detail-archive/projects-detail-archive.component';
import { Page404Component } from "../../authentication/page404/page404.component";

const routes: Routes = [
  {
    path: "archiveProjects",
    component: ProjectsArchiveComponent,
  },

  {
    path: "archiveProjectsDetail/:id",
    component: ProjectsDetailArchiveComponent,
  },

  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveRoutingModule { }
