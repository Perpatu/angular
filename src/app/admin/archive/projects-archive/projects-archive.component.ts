import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/core/service/shared.service";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-projects-archive',
  templateUrl: './projects-archive.component.html',
  styleUrls: ['./projects-archive.component.scss']
})
export class ProjectsArchiveComponent implements OnInit {

  dataSource: any = [];
  ProjectListArchive: any = [];
  displayedColumns: string[] = ['Project_number', 'Project_order_number', 'Project_name',
  'Project_client', 'Project_date_created', 'Project_end_date', 'Project_priority',
  'Project_progress', 'Project_status', 'User_created'];

  constructor(
    private service: SharedService,
  ) { }

  ngOnInit(): void {
    this.loadArchiveProject();
  }

  loadArchiveProject(){
    this.service.getProjectArchive().subscribe(( data:any ) => {
      this.ProjectListArchive = data;
      this.dataSource = new MatTableDataSource(this.ProjectListArchive);
      //this.dataSourcee.sort = this.sort;
    })
  }

  FilterFn(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  

}
