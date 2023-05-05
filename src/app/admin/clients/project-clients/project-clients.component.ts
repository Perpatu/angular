import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/service/shared.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-project-clients',
  templateUrl: './project-clients.component.html',
  styleUrls: ['./project-clients.component.scss']
})
export class ProjectClientsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  selectedStatus: string = "ACTIVE_PROJECT";
  clientName: string = this.router.url.split('/')[4];
  projectData: any =[];
  ProjectListArchive: any = [];
  dataSource: any = [];
  titleModal: string;
  projectAddEditModal: string = 'edit';
  displayedColumns = ['Project_number', 'Project_order_number', 'Project_name',
      'Project_client', 'Project_date_created', 'Project_end_date', 'Project_priority',
      'Project_progress', 'Project_status', 'User_created', 'Option'];

  constructor(
    private service: SharedService,
    private router: Router,
    private modalService: NgbModal,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }


  loadData(){
    this.service.getProjectsActiveClient(this.clientName).subscribe((data) => {
      this.projectData = data;
      this.dataSource = new MatTableDataSource(this.projectData);
      this.dataSource.sort = this.sort;
    })
  }

  showProject() {
    if (this.selectedStatus === 'ACTIVE_PROJECT') {
      this.service.getProjectsActiveClient(this.clientName).subscribe(data => {
        this.projectData = data;
        this.dataSource = new MatTableDataSource(this.projectData);
        this.dataSource.sort = this.sort;
      })
    }
    else if (this.selectedStatus === 'END_PROJECT') {
      this.service.getProjectsCompletedClient(this.clientName).subscribe(data => {
        this.ProjectListArchive = data;
        this.dataSource = new MatTableDataSource(this.ProjectListArchive);
        this.dataSource.sort = this.sort;
      })
    }
  };

  FilterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editData(data: any) {
    this.projectData = data;    
     //this.ActivateAddEditProjectComp = true;
  }


  openEditProject(content) {
    this.titleModal = "Edytuj projekt";
    this.projectAddEditModal = "edit";   
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  deleteProject(item: any) {
    if (confirm('Czy napewno chcesz usunąć projekt' + ' (' + item.Project_number + ')')) {
      this.service.deleteProject(item.Project_id).subscribe(() => {        
        this.loadData();
      })
    }
  }

}
