import { Component, OnInit, ViewChild } from "@angular/core";
import { SharedService } from "src/app/core/service/shared.service";
import { AuthService } from "src/app/core/service/auth.service";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Component({
  selector: "app-allpayment",
  templateUrl: "./allpayment.component.html",
  styleUrls: ["./allpayment.component.scss"],
})
export class AllpaymentComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  selectedStatus: string = "ACTIVE_PROJECT";
  projectsSecretariat: any = []
  projectsSecretariatCompleted: any = [];
  ProjectListClientSorted: any = [];
  dataSource: any=[]; 
  dataSourceClient:any=[];
  projectUpdateForm: UntypedFormGroup;
  projectId: any;
  titleModal: string;
  show: boolean = false;
  tableStorageShow: string = localStorage.getItem('tableShow')
  projectsClient: string;
  currentUser: any = [];

  displayedColumns: string[] = ['Project_number', 'Project_order_number', 'Project_name',
  'Project_client', 'Project_date_created', 'Project_end_date', 'Manager', 'Invoice', 'Option'];

  displayedColumnsClient: string[] = ['Client']

  constructor(
    private service: SharedService,
    private auth: AuthService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
  ) {
    this.projectUpdateForm = this.fb.group({
      Project_id: [''],
      Project_invoice: ['']
    })
   }
  
  ngOnInit() {
    this.loadData();
    this.loadUserData();
    this.loadClientSortedList();
  }

  loadUserData() {
    this.currentUser = this.auth.currentUserValue;
  }
 
  loadData(){
    this.service.getProjectActiveSecretariat().subscribe((data:any) => {
      this.projectsSecretariat = data;
      this.dataSource = new MatTableDataSource(this.projectsSecretariat)
    })
  }

  loadClientSortedList(){
    this.service.getProjectsActiveSecretariatClientSorted().subscribe((data:any) => {
      this.ProjectListClientSorted = data
      this.dataSourceClient = new MatTableDataSource(this.ProjectListClientSorted)      
    })
  }

  changeTable(){
    if (this.tableStorageShow === 'false'){
      localStorage.setItem('tableShowSecretariat', 'true')
      this.tableStorageShow = localStorage.getItem('tableShowSecretariat')
      this.loadData()
      if (this.currentUser.role === 'Admin' && this.tableStorageShow === 'true') {
        this.displayedColumns = ['Project_number', 'Project_order_number', 'Project_name',
        'Project_client', 'Project_date_created', 'Project_end_date', 'Manager', 'Invoice', 'Option'];
      }
    }
    else {      
      localStorage.setItem('tableShowSecretariat', 'false')
      this.tableStorageShow = localStorage.getItem('tableShowSecretariat')
      this.loadClientSortedList();
    }
  }

  showDataClientTable(client: string) {
    this.show = true;
    this.projectsClient = client;
    if (this.currentUser.role === 'Admin'){
      this.displayedColumnsClient = ['Client', 'start_date', 'date_end', 'priority', 'project_manager',
      'progress', 'option'];
    }
    else {
      this.displayedColumnsClient = ['Client', 'start_date', 'date_end', 'priority', 'project_manager',
      'progress'];
    }
  }

  getClientKeys(obj: any) {
    return Object.keys(obj);
  }

  showProject() {
    if (this.selectedStatus === 'ACTIVE_PROJECT') {
      this.service.getProjectActiveSecretariat().subscribe((data:any) => {
        this.projectsSecretariat = data;
        this.dataSource = new MatTableDataSource(this.projectsSecretariat)
      })
    }

    else if (this.selectedStatus === 'END_PROJECT') {
      this.service.getProjectCompletedSecretariat().subscribe((data:any) => {
        this.projectsSecretariatCompleted = data;
        this.dataSource = new MatTableDataSource(this.projectsSecretariatCompleted)
      })
    }
  }

  FilterFn(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openEditProject(content, Project_id: any) {
    this.service.getProjectDetail(Project_id).subscribe((projectData:any) => {
      this.projectId = projectData.Project_id
    })
    this.titleModal = "Czy Projekt ma być zafakturowany?";
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  onSubmit(){
    this.projectUpdateForm.value.Project_id = this.projectId
    this.service.updateProject(this.projectUpdateForm.value, ).subscribe(() => {
      window.location.reload();
    })
  }


}
