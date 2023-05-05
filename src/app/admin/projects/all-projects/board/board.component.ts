import { Component, OnInit, ViewChild} from "@angular/core";
import { SharedService } from "src/app/core/service/shared.service";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/core/service/auth.service";


@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})

export class BoardComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  selectedStatus: string = "ACTIVE_PROJECT";
  GroupList: any = [];
  ProjectList: any = [];
  ProjectListPaused: any = [];
  ProjectListArchive: any = [];
  ProjectListUser: any = [];
  ProjectEndListUser: any = [];
  ProjectListClientSorted: any = [];
  modalTitle: string;
  //ActivateAddEditProjectComp: boolean = false;
  projectData: any;
  project_id:any=[];
  dataSource:any=[];
  dataSourceClient:any=[];
  titleModal:string;
  projectAddEditModal:string;
  currentUser: any = [];  
  show: boolean = false;
  tableStorageShow: string = localStorage.getItem('tableShowSecretariat')
  projectsClient: string;

  displayedColumns: string[] = ['Project_number', 'Project_order_number', 'Project_name',
    'Project_client', 'Project_date_created', 'Project_end_date', 'Project_priority',
    'Project_progress', 'Project_status', 'Manager', 'Option'];

  displayedColumnsEmployee: string[] = ['Project_number', 'Project_order_number', 'Project_name',
    'Project_client', 'Project_date_created', 'Project_end_date', 'Project_priority',
    'Project_progress', 'Project_status', 'Manager'];

  displayedColumnsClient: string[] = ['Client']

  constructor(
    private service: SharedService,
    private modalService: NgbModal,
    private auth: AuthService
    ) { }

  
  public ngOnInit(): void {
    this.loadProjectList();
    this.loadUserData();
    this.loadClientSortedList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }  

  loadProjectList() {
    this.service.getProjectsActive().subscribe(data => {      
      this.ProjectList = data;
      this.dataSource = new MatTableDataSource(this.ProjectList);      
      this.dataSource.sort = this.sort;      
    });
  }

  loadClientSortedList(){
    this.service.getProjectsActiveClientSorted().subscribe((data:any) => {
      this.ProjectListClientSorted = data
      this.dataSourceClient = new MatTableDataSource(this.ProjectListClientSorted)      
    })
  }

  loadUserData() {
    this.currentUser = this.auth.currentUserValue;
  }

  getClientKeys(obj: any) {
    return Object.keys(obj);
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

  changeTable(){
    if (this.tableStorageShow === 'false'){
      localStorage.setItem('tableShow', 'true')      
      this.tableStorageShow = localStorage.getItem('tableShow')      
      if (this.currentUser.role === 'Admin' && this.tableStorageShow === 'true') {
        this.displayedColumns = ['Project_number', 'Project_order_number', 'Project_name',
        'Project_client', 'Project_date_created', 'Project_end_date', 'Project_priority',
        'Project_progress', 'Project_status', 'Manager', 'Option'];
        this.loadProjectList();
      }
      else if (this.currentUser.role === 'Employee' && this.tableStorageShow === 'true') {
        this.displayedColumnsEmployee = ['Project_number', 'Project_order_number', 'Project_name',
        'Project_client', 'Project_date_created', 'Project_end_date', 'Project_priority',
        'Project_progress', 'Project_status', 'Manager'];
        this.loadProjectList();
      }
    }
    else {
      localStorage.setItem('tableShow', 'false')
      this.tableStorageShow = localStorage.getItem('tableShow')
      this.loadClientSortedList();
    }
  }

  showProject() {
    if (this.selectedStatus === 'ACTIVE_PROJECT') {
      this.service.getProjectsActive().subscribe(data => {        
        this.ProjectList = data;
        this.dataSource = new MatTableDataSource(this.ProjectList);
        this.dataSource.sort = this.sort;
      });
    }
    else if (this.selectedStatus === 'END_PROJECT') {
      this.service.getProjectsCompleted().subscribe(data => {       
        this.ProjectListArchive = data;
        this.dataSource = new MatTableDataSource(this.ProjectListArchive);
        this.dataSource.sort = this.sort;
      });
    }
    else if (this.selectedStatus === 'PAUSED_PROJECT') {
      this.service.getProjectsPaused().subscribe(data => {       
        this.ProjectListPaused = data;
        this.dataSource = new MatTableDataSource(this.ProjectListPaused);
        this.dataSource.sort = this.sort;
      });
    }
    else if (this.selectedStatus === 'MY_PROJECT') {
      this.service.getProjectsActiveUser(this.auth.currentUserValue.id).subscribe(data => {        
        this.ProjectListUser = data;
        this.dataSource = new MatTableDataSource(this.ProjectListUser);
        this.dataSource.sort = this.sort;
      });
    }
    else if (this.selectedStatus === 'MY_PROJECT_END') {
      this.service.getProjectsCompletedUser(this.auth.currentUserValue.id).subscribe(data => {       
        this.ProjectEndListUser = data;
        this.dataSource = new MatTableDataSource(this.ProjectEndListUser);
        this.dataSource.sort = this.sort; 
      });
    }
  };



  FilterFn(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  FilterFnUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  FilterFnUserEnd(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  FilterFnPaused(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  FilterFnArchive(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteProject(item: any) {
    if (confirm('Are you sure you want to delete this project???' + ' (' + item.Project_number + ')')) {
      this.service.deleteProject(item.Project_id).subscribe(() => {        
        this.loadProjectList();
      })
    }
  }

  editData(data: any) {
    this.projectData = data;    
    this.modalTitle = "Edit Project";
    //this.ActivateAddEditProjectComp = true;
  }

  openAddProject(content) {
    this.titleModal = "Add Project";
    this.projectAddEditModal = "add";
    this.modalService.open(content, { centered: true, size: 'lg'});  
  }

  openEditProject(content) {
    this.titleModal = "Edit Project";
    this.projectAddEditModal = "edit";   
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
}





